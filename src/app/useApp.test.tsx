import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POSITIONS_STORAGE_KEY } from 'config'
import type { IPosition } from 'types'
import { ProviderWrapper } from 'test/render'
import { installFakeGeolocation, type IFakeGeolocation } from 'test/geolocation'
import { buildHour } from 'features/forecast/testHelpers'
import useApp from './useApp'

const STOCKHOLM = { latitude: 59.33, longitude: 18.07 }

const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })

const forecastBody = {
  properties: {
    meta: { updated_at: '2023-04-05T06:00:00Z' },
    timeseries: [
      buildHour({ time: '2023-04-05T10:00:00Z' }),
      buildHour({ time: '2023-04-06T10:00:00Z' }),
    ],
  },
}

/** Answers the address and forecast endpoints by url. */
const stubApi = () =>
  vi.stubGlobal(
    'fetch',
    vi.fn((url: string) =>
      Promise.resolve(
        url.includes('address')
          ? json({ city: 'Stockholm' })
          : json(forecastBody)
      )
    )
  )

const stored = (positions: Array<IPosition>) =>
  localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions))

describe('useApp', () => {
  let geolocation: IFakeGeolocation

  beforeEach(() => {
    geolocation = installFakeGeolocation()
    stubApi()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts from the positions in storage without waiting a render', () => {
    stored([{ ...STOCKHOLM, city: 'Stockholm', status: 'foundBySearch' }])

    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    expect(result.current.city).toBe('Stockholm')
  })

  it('loads the forecast for the shared location and names the place', async () => {
    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    act(() => geolocation.emit(STOCKHOLM))

    await waitFor(() => expect(result.current.city).toBe('Stockholm'))
    await waitFor(() => expect(result.current.days).toHaveLength(2))

    expect(result.current.updated_at).toBe('2023-04-05T06:00:00Z')
    expect(result.current.status.finished).toBe(true)
  })

  it('persists the position it settled on', async () => {
    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    act(() => geolocation.emit(STOCKHOLM))

    await waitFor(() => expect(result.current.city).toBe('Stockholm'))

    await waitFor(() =>
      expect(
        JSON.parse(localStorage.getItem(POSITIONS_STORAGE_KEY) ?? '[]')
      ).toMatchObject([{ city: 'Stockholm' }])
    )
  })

  it('offers "use my location" only once a search has taken over', async () => {
    stored([{ ...STOCKHOLM, city: 'Stockholm', status: 'foundBySearch' }])

    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    expect(result.current.showUseMyLocation).toBe(false)

    act(() => geolocation.emit({ latitude: 59.86, longitude: 17.64 }))

    await waitFor(() => expect(result.current.showUseMyLocation).toBe(true))
  })

  it('clears the searched positions when the user asks for their location', async () => {
    stored([{ ...STOCKHOLM, city: 'Stockholm', status: 'foundBySearch' }])

    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    act(() => result.current.activateMyLocation())

    await waitFor(() => expect(result.current.positions).toEqual([]))
  })

  // Clicking "use my location" mid request used to abort the forecast and
  // leave the app showing placeholders for ever.
  it('does not get stuck loading when the location is activated mid request', async () => {
    let resolveForecast: ((value: Response) => void) | undefined

    vi.stubGlobal(
      'fetch',
      vi.fn((url: string, options?: RequestInit) => {
        if (url.includes('address')) {
          return Promise.resolve(json({ city: 'Stockholm' }))
        }

        return new Promise<Response>((resolve, reject) => {
          options?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError'))
          )
          resolveForecast = resolve
        })
      })
    )

    // The button only appears once a search has taken over from the device
    // location, so both have to be in play.
    stored([{ ...STOCKHOLM, city: 'Stockholm', status: 'foundBySearch' }])

    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    act(() => geolocation.emit({ latitude: 59.86, longitude: 17.64 }))

    await waitFor(() => expect(result.current.showUseMyLocation).toBe(true))
    await waitFor(() => expect(result.current.status.loading).toBe(true))
    expect(resolveForecast).toBeDefined()

    act(() => result.current.activateMyLocation())

    await waitFor(() => expect(result.current.status.loading).toBe(false))
  })

  it('surfaces a failed forecast request', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          new Response('{}', {
            status: 503,
            headers: { 'content-type': 'application/json' },
          })
        )
      )
    )

    const { result } = renderHook(() => useApp(), { wrapper: ProviderWrapper })

    act(() => geolocation.emit(STOCKHOLM))

    await waitFor(() => expect(result.current.error?.status).toBe(503))
  })
})
