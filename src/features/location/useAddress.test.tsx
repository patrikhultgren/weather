import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { IPosition } from 'types'
import { ProviderWrapper } from 'test/render'
import useAddress from './useAddress'

const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })

const position = (overrides: Partial<IPosition> = {}): IPosition => ({
  latitude: 59.33,
  longitude: 18.07,
  city: '',
  status: 'foundByAllowingPosition',
  ...overrides,
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useAddress', () => {
  it('looks up the city for a position that has none', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json({ city: 'Stockholm' }))
    vi.stubGlobal('fetch', fetchMock)

    const setPositions = vi.fn()

    renderHook(() => useAddress({ position: position(), setPositions }), {
      wrapper: ProviderWrapper,
    })

    await waitFor(() => expect(setPositions).toHaveBeenCalled())

    const update = setPositions.mock.calls[0][0] as (
      positions: Array<IPosition>
    ) => Array<IPosition>

    expect(update([])[0]).toMatchObject({ city: 'Stockholm' })
  })

  it('does not look up a position that already has a city', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    renderHook(
      () =>
        useAddress({
          position: position({ city: 'Stockholm' }),
          setPositions: vi.fn(),
        }),
      { wrapper: ProviderWrapper }
    )

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('does not look up an empty position', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    renderHook(
      () =>
        useAddress({
          position: position({ latitude: 0, longitude: 0, status: 'empty' }),
          setPositions: vi.fn(),
        }),
      { wrapper: ProviderWrapper }
    )

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('exposes a failed lookup as an error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('{}', {
          status: 500,
          headers: { 'content-type': 'application/json' },
        })
      )
    )

    const { result } = renderHook(
      () => useAddress({ position: position(), setPositions: vi.fn() }),
      { wrapper: ProviderWrapper }
    )

    await waitFor(() => expect(result.current.error?.status).toBe(500))
  })
})
