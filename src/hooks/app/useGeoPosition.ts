import { useCallback, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import {
  addPosition,
  shouldUpdatePosition,
  speedInMetersPerSecond,
} from 'utils/position'
import { IFix, IPosition, IGeoPosition } from 'utils/types'

const allPositionsAreFoundByAllowingPosition = (positions: Array<IPosition>) =>
  positions.every(
    (position: IPosition) => position.status === 'foundByAllowingPosition'
  )

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

interface Props {
  positionsAreLoaded: boolean
  positions: Array<IPosition>
  setPositions: React.Dispatch<React.SetStateAction<IPosition[]>>
}

const useGeoPosition = ({
  positionsAreLoaded,
  positions,
  setPositions,
}: Props): IGeoPosition => {
  const location = useLocation()
  const [geoPosition, setGeoPosition] = useState<IGeoPosition>({
    ...initialState,
    loading: true,
  })

  const lastUpdateRef = useRef<number>(0)
  const lastFixRef = useRef<IFix | null>(null)

  // Read through a ref so that a new position doesn't recreate the callback,
  // which would tear down and restart the watcher on every update.
  const positionsRef = useRef<Array<IPosition>>(positions)
  positionsRef.current = positions

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

      setPositions((prev: Array<IPosition>) =>
        addPosition(prev, {
          latitude: fix.latitude,
          longitude: fix.longitude,
          city: '',
          status: 'foundByAllowingPosition',
        })
      )
    },
    [setPositions]
  )

  const onError = useCallback((error: any) => {
    setGeoPosition((prev) => ({
      ...prev,
      loading: false,
      finished: true,
      userHasApprovedToShareLocation: false,
      error,
    }))
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoPosition({
        ...initialState,
        finished: true,
      })
      return
    }

    if (!positionsAreLoaded) return

    const watcher = navigator.geolocation.watchPosition(onChange, onError)
    return () => navigator.geolocation.clearWatch(watcher)
    // hasPositions restarts the watcher when the positions are cleared with
    // "use my location", since a new watcher reports a position right away.
  }, [positionsAreLoaded, hasPositions, onChange, onError])

  useEffect(() => {
    setGeoPosition((prev) => (prev.error ? { ...prev, error: null } : prev))
  }, [location.pathname])

  return geoPosition
}

export default useGeoPosition
