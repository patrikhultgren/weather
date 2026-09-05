import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MIN_POSITION_UPDATE_INTERVAL } from 'config'
import type { IPosition } from 'types'
import { ProviderWrapper } from 'test/render'
import { installFakeGeolocation, type IFakeGeolocation } from 'test/geolocation'
import useGeoPosition from './useGeoPosition'

const STOCKHOLM = { latitude: 59.33, longitude: 18.07 }
const UPPSALA = { latitude: 59.86, longitude: 17.64 }

/** Drives the hook with real position state, the way useApp does. */
const renderGeoPosition = (initialPositions: Array<IPosition> = []) => {
  const state: { positions: Array<IPosition> } = { positions: initialPositions }

  const setPositions = vi.fn(
    (update: React.SetStateAction<Array<IPosition>>) => {
      state.positions =
        typeof update === 'function' ? update(state.positions) : update
      rerender()
    }
  )

  const { result, rerender: rerenderHook } = renderHook(
    ({ positions }: { positions: Array<IPosition> }) =>
      useGeoPosition({
        positions,
        setPositions: setPositions as React.Dispatch<
          React.SetStateAction<Array<IPosition>>
        >,
      }),
    {
      wrapper: ProviderWrapper,
      initialProps: { positions: state.positions },
    }
  )

  const rerender = () => rerenderHook({ positions: state.positions })

  return { result, state, setPositions, rerender }
}

describe('useGeoPosition', () => {
  let geolocation: IFakeGeolocation

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    vi.setSystemTime(new Date('2024-01-01T12:00:00Z'))
    geolocation = installFakeGeolocation()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('adopts the very first fix', () => {
    const { state } = renderGeoPosition()

    act(() => geolocation.emit(STOCKHOLM))

    expect(state.positions).toHaveLength(1)
    expect(state.positions[0]).toMatchObject({
      ...STOCKHOLM,
      status: 'foundByAllowingPosition',
    })
  })

  it('reports that the user shared their location', async () => {
    const { result } = renderGeoPosition()

    act(() => geolocation.emit(STOCKHOLM))

    await waitFor(() =>
      expect(result.current).toMatchObject({
        userHasApprovedToShareLocation: true,
        loading: false,
        finished: true,
      })
    )
  })

  it('reports an error when the user denies access', async () => {
    const { result } = renderGeoPosition()

    act(() => geolocation.emitError({ message: 'User denied Geolocation' }))

    await waitFor(() => {
      expect(result.current.userHasApprovedToShareLocation).toBe(false)
      expect(result.current.error?.message).toBe('User denied Geolocation')
      expect(result.current.finished).toBe(true)
    })
  })

  // The bug this guarding exists for: a fast vehicle used to produce a new
  // position, and therefore a forecast reload, every single minute.
  it('does not move the position while travelling fast', () => {
    const { state, setPositions } = renderGeoPosition()

    act(() => geolocation.emit({ ...STOCKHOLM, speed: 30 }))
    setPositions.mockClear()

    // Twenty minutes of motorway, a fix every minute.
    for (let minute = 1; minute <= 20; minute++) {
      act(() => {
        vi.setSystemTime(
          new Date(Date.now() + MIN_POSITION_UPDATE_INTERVAL + 1)
        )
        geolocation.emit({
          latitude: STOCKHOLM.latitude + minute * 0.03,
          longitude: STOCKHOLM.longitude,
          speed: 30,
        })
      })
    }

    expect(setPositions).not.toHaveBeenCalled()
    expect(state.positions).toHaveLength(1)
    expect(state.positions[0]).toMatchObject(STOCKHOLM)
  })

  it('adopts the new position once the journey ends', () => {
    const { state } = renderGeoPosition()

    act(() => geolocation.emit({ ...STOCKHOLM, speed: 30 }))

    act(() => {
      vi.setSystemTime(new Date(Date.now() + 60 * 60_000))
      geolocation.emit({ ...UPPSALA, speed: 0 })
    })

    expect(state.positions[0]).toMatchObject(UPPSALA)
  })

  it('ignores small moves within the same area', () => {
    const { state, setPositions } = renderGeoPosition()

    act(() => geolocation.emit({ ...STOCKHOLM, speed: 0 }))
    setPositions.mockClear()

    act(() => {
      vi.setSystemTime(new Date(Date.now() + 10 * 60_000))
      geolocation.emit({ latitude: 59.35, longitude: 18.09, speed: 1 })
    })

    expect(setPositions).not.toHaveBeenCalled()
    expect(state.positions[0]).toMatchObject(STOCKHOLM)
  })

  it('leaves a position the user searched for alone', () => {
    const searched: IPosition = {
      ...STOCKHOLM,
      city: 'Stockholm',
      status: 'foundBySearch',
    }
    const { state } = renderGeoPosition([searched])

    act(() => geolocation.emit({ ...UPPSALA, speed: 0 }))

    expect(state.positions).toEqual([searched])
  })

  it('stops watching when it unmounts', () => {
    const { unmount } = renderHook(
      () =>
        useGeoPosition({
          positions: [],
          setPositions: vi.fn(),
        }),
      { wrapper: ProviderWrapper }
    )

    expect(geolocation.watchCount()).toBe(1)

    unmount()

    expect(geolocation.watchCount()).toBe(0)
  })

  it('does nothing when the browser has no geolocation', () => {
    Object.defineProperty(navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    })

    const { result } = renderHook(
      () => useGeoPosition({ positions: [], setPositions: vi.fn() }),
      { wrapper: ProviderWrapper }
    )

    expect(result.current).toMatchObject({
      finished: true,
      loading: false,
      userHasApprovedToShareLocation: false,
    })
  })
})
