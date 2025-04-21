import { useCallback, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { addPosition } from 'utils/position'
import { IPosition, IGeoPosition } from 'utils/types'

const allPositionsAreFoundByAllowingPosition = (positions: Array<IPosition>) =>
  positions.every(
    (position: IPosition) => position.status === 'foundByAllowingPosition'
  )

const initialState: IGeoPosition = {
  error: null,
  loading: false,
  finished: false,
}

interface Props {
  positionsAreLoaded: boolean
  positions: Array<IPosition>
  setPositions: React.Dispatch<React.SetStateAction<IPosition[]>>
  setUserHasApprovedToShareLocation: React.Dispatch<
    React.SetStateAction<boolean>
  >
}

const useGeoPosition = ({
  positionsAreLoaded,
  positions,
  setPositions,
  setUserHasApprovedToShareLocation,
}: Props): IGeoPosition => {
  const location = useLocation()

  const [geoPosition, setGeoPosition] = useState<IGeoPosition>({
    ...initialState,
    loading: true,
  })

  const onChange = useCallback(
    ({ coords }: GeolocationPosition) => {
      setGeoPosition({
        ...initialState,
        finished: true,
      })

      setUserHasApprovedToShareLocation(true)

      if (allPositionsAreFoundByAllowingPosition(positions)) {
        setPositions((prev: Array<IPosition>) =>
          addPosition(prev, {
            latitude: coords.latitude,
            longitude: coords.longitude,
            city: '',
            status: 'foundByAllowingPosition',
          })
        )
      }
    },
    [setPositions, setUserHasApprovedToShareLocation, positions]
  )

  const onError = useCallback(
    (error: any) => {
      setGeoPosition((prev) => ({
        ...prev,
        loading: false,
        finished: true,
        error,
      }))
    },
    [setGeoPosition]
  )

  useEffect(() => {
    if (
      !navigator.geolocation ||
      !positionsAreLoaded ||
      (positions.length && !allPositionsAreFoundByAllowingPosition(positions))
    ) {
      setGeoPosition({
        ...initialState,
        finished: true,
      })

      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [positions, positionsAreLoaded, onError, onChange])

  useEffect(() => {
    setGeoPosition((prev) => (prev.error ? { ...prev, error: null } : prev))
  }, [location.pathname])

  return geoPosition
}

export default useGeoPosition
