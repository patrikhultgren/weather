import { vi } from 'vitest'

type SuccessCallback = PositionCallback
type ErrorCallback = PositionErrorCallback

export interface IFakeGeolocation {
  /** Delivers a fix to every active watcher. */
  emit: (coords: Partial<GeolocationCoordinates>) => void
  emitError: (error: Partial<GeolocationPositionError>) => void
  watchCount: () => number
  clearWatch: ReturnType<typeof vi.fn>
}

/** Installs a controllable navigator.geolocation for the duration of a test. */
export const installFakeGeolocation = (): IFakeGeolocation => {
  const watchers = new Map<
    number,
    { onSuccess: SuccessCallback; onError?: ErrorCallback }
  >()
  let nextId = 1

  const clearWatch = vi.fn((id: number) => {
    watchers.delete(id)
  })

  const geolocation = {
    watchPosition: vi.fn(
      (onSuccess: SuccessCallback, onError?: ErrorCallback) => {
        const id = nextId++
        watchers.set(id, { onSuccess, onError })
        return id
      }
    ),
    clearWatch,
    getCurrentPosition: vi.fn(),
  }

  Object.defineProperty(navigator, 'geolocation', {
    value: geolocation,
    configurable: true,
    writable: true,
  })

  return {
    emit: (coords) => {
      const position = {
        coords: {
          latitude: 0,
          longitude: 0,
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
          ...coords,
        },
        timestamp: Date.now(),
      } as GeolocationPosition

      for (const { onSuccess } of [...watchers.values()]) {
        onSuccess(position)
      }
    },
    emitError: (error) => {
      const positionError = {
        code: 1,
        message: 'User denied Geolocation',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
        ...error,
      } as GeolocationPositionError

      for (const { onError } of [...watchers.values()]) {
        onError?.(positionError)
      }
    },
    watchCount: () => watchers.size,
    clearWatch,
  }
}
