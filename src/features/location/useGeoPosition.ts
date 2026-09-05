import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useLatestRef from 'hooks/useLatestRef'
import useOnValueChange from 'hooks/useOnValueChange'
import { shouldUpdatePosition, speedInMetersPerSecond } from 'lib/geo'
import { toError } from 'lib/http'
import type { IFix, IGeoPosition, IPosition } from 'types'
import { addPosition } from './positions'

const allPositionsAreFoundByAllowingPosition = (positions: Array<IPosition>) =>
  positions.every((position) => position.status === 'foundByAllowingPosition')

const initialState: IGeoPosition = {
  error: null,
  loading: false,
  finished: false,
  userHasApprovedToShareLocation: false,
}

const approvedState: IGeoPosition = {
  ...initialState,
  finished: true,
  userHasApprovedToShareLocation: true,
}

const isApproved = (geoPosition: IGeoPosition) =>
  geoPosition.finished &&
  geoPosition.userHasApprovedToShareLocation &&
  !geoPosition.loading &&
  !geoPosition.error

const unsupportedState: IGeoPosition = { ...initialState, finished: true }

interface IProps {
  positions: Array<IPosition>
  setPositions: React.Dispatch<React.SetStateAction<Array<IPosition>>>
}

/**
 * Watches the device location and adopts it as the current position once the
 * user has settled somewhere new. See lib/geo for the thresholds; without them
 * the forecast reloads for every place passed in a fast vehicle.
 */
const useGeoPosition = ({ positions, setPositions }: IProps): IGeoPosition => {
  const location = useLocation()
  const [geoPosition, setGeoPosition] = useState<IGeoPosition>(() =>
    navigator.geolocation
      ? { ...initialState, loading: true }
      : unsupportedState
  )

  const lastUpdateRef = useRef<number>(0)
  const lastFixRef = useRef<IFix | null>(null)

  // Read through a ref so a new position doesn't recreate the callback, which
  // would tear down and restart the watcher on every update.
  const positionsRef = useLatestRef(positions)

  const hasPositions = positions.length > 0

  const onChange = useCallback(
    ({ coords }: GeolocationPosition) => {
      const fix: IFix = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        time: Date.now(),
      }

      const speed = speedInMetersPerSecond(
        lastFixRef.current,
        fix,
        coords.speed
      )

      lastFixRef.current = fix

      setGeoPosition((prev) => (isApproved(prev) ? prev : approvedState))

      const currentPositions = positionsRef.current

      if (!allPositionsAreFoundByAllowingPosition(currentPositions)) {
        return
      }

      if (
        currentPositions.length &&
        !shouldUpdatePosition({
          fix,
          currentPosition: currentPositions[0],
          lastUpdate: lastUpdateRef.current,
          speed,
        })
      ) {
        return
      }

      lastUpdateRef.current = fix.time

      setPositions((prev) =>
        addPosition(prev, {
          latitude: fix.latitude,
          longitude: fix.longitude,
          city: '',
          status: 'foundByAllowingPosition',
        })
      )
    },
    [positionsRef, setPositions]
  )

  const onError = useCallback((error: GeolocationPositionError) => {
    setGeoPosition((prev) => ({
      ...prev,
      loading: false,
      finished: true,
      userHasApprovedToShareLocation: false,
      error: toError(error),
    }))
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
    // hasPositions restarts the watcher when the positions are cleared with
    // "use my location", since a new watcher reports a position right away.
  }, [hasPositions, onChange, onError])

  // A denied prompt on one page shouldn't keep showing up on the next.
  useOnValueChange(location.pathname, () => {
    setGeoPosition((prev) => (prev.error ? { ...prev, error: null } : prev))
  })

  return geoPosition
}

export default useGeoPosition
