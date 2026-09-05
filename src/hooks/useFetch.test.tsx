import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ProviderWrapper } from 'test/render'
import useFetch from './useFetch'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

/** A fetch that only resolves when the returned `resolve` is called. */
const deferredFetch = () => {
  const pending: Array<{
    url: string
    signal: AbortSignal | undefined
    resolve: (body: unknown) => void
  }> = []

  const fetchMock = vi.fn(
    (url: string, options?: RequestInit) =>
      new Promise<Response>((resolve, reject) => {
        options?.signal?.addEventListener('abort', () =>
          reject(new DOMException('Aborted', 'AbortError'))
        )

        pending.push({
          url,
          signal: options?.signal ?? undefined,
          resolve: (body) => resolve(json(body)),
        })
      })
  )

  vi.stubGlobal('fetch', fetchMock)

  return { pending, fetchMock }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useFetch', () => {
  it('does nothing until run is true', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(
      () => useFetch<{ city: string }>({ url: '/address', run: false }),
      { wrapper: ProviderWrapper }
    )

    expect(fetchMock).not.toHaveBeenCalled()
    expect(result.current).toMatchObject({ loading: false, finished: false })
  })

  it('loads and exposes the response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(json({ city: 'Stockholm' }))
    )

    const { result } = renderHook(
      () => useFetch<{ city: string }>({ url: '/address', run: true }),
      { wrapper: ProviderWrapper }
    )

    await waitFor(() =>
      expect(result.current).toMatchObject({
        response: { city: 'Stockholm' },
        loading: false,
        finished: true,
        error: null,
      })
    )
  })

  it('exposes a failed request as an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({}, 404)))

    const { result } = renderHook(
      () => useFetch<unknown>({ url: '/search', run: true }),
      { wrapper: ProviderWrapper }
    )

    await waitFor(() =>
      expect(result.current).toMatchObject({
        response: null,
        finished: true,
        error: { status: 404 },
      })
    )
  })

  it('applies transformResponse', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json([1, 2, 3])))

    const { result } = renderHook(
      () =>
        useFetch<number, Array<number>>({
          url: '/search',
          run: true,
          transformResponse: (response) => response.length,
        }),
      { wrapper: ProviderWrapper }
    )

    await waitFor(() => expect(result.current.response).toBe(3))
  })

  // Without cancellation a slow first request could land last and win.
  it('ignores a superseded request', async () => {
    const { pending } = deferredFetch()

    const { result, rerender } = renderHook(
      ({ url }: { url: string }) =>
        useFetch<{ city: string }>({ url, run: true }),
      { wrapper: ProviderWrapper, initialProps: { url: '/address?lat=1' } }
    )

    await waitFor(() => expect(pending).toHaveLength(1))

    rerender({ url: '/address?lat=2' })

    await waitFor(() => expect(pending).toHaveLength(2))

    // The newer request answers first, then the stale one finally arrives.
    await act(async () => {
      pending[1].resolve({ city: 'Uppsala' })
    })
    await act(async () => {
      pending[0].resolve({ city: 'Stale' })
    })

    expect(result.current.response).toEqual({ city: 'Uppsala' })
  })

  // Aborting rejects with an AbortError that is deliberately swallowed, so
  // dropping a request has to clear the loading flag itself.
  it('does not stay loading when a request is dropped before it finishes', async () => {
    deferredFetch()

    const { result, rerender } = renderHook(
      ({ run }: { run: boolean }) => useFetch<unknown>({ url: '/forecast', run }),
      { wrapper: ProviderWrapper, initialProps: { run: true } }
    )

    await waitFor(() => expect(result.current.loading).toBe(true))

    rerender({ run: false })

    await waitFor(() => expect(result.current.loading).toBe(false))
  })

  it('aborts the request it leaves behind', async () => {
    const { pending } = deferredFetch()

    const { rerender } = renderHook(
      ({ url }: { url: string }) => useFetch<unknown>({ url, run: true }),
      { wrapper: ProviderWrapper, initialProps: { url: '/a' } }
    )

    await waitFor(() => expect(pending).toHaveLength(1))

    rerender({ url: '/b' })

    expect(pending[0].signal?.aborted).toBe(true)
  })

  it('reloads when the tab becomes visible again', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ city: 'Stockholm' }))
    vi.stubGlobal('fetch', fetchMock)

    renderHook(() => useFetch<unknown>({ url: '/address', run: true }), {
      wrapper: ProviderWrapper,
    })

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    await act(async () => {
      document.dispatchEvent(new Event('visibilitychange'))
    })

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
  })

  it('clears the result when reset is set', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(json({ city: 'Stockholm' }))
    )

    const { result, rerender } = renderHook(
      ({ reset }: { reset: boolean }) =>
        useFetch<unknown>({ url: '/address', run: true, reset }),
      { wrapper: ProviderWrapper, initialProps: { reset: false } }
    )

    await waitFor(() =>
      expect(result.current.response).toEqual({ city: 'Stockholm' })
    )

    rerender({ reset: true })

    await waitFor(() =>
      expect(result.current).toMatchObject({ response: null, finished: false })
    )
  })
})
