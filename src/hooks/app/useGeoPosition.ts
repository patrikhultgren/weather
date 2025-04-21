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
  userHasApprovedToShareLocation: false,
}

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

  const onChange = useCallback(
    ({ coords }: GeolocationPosition) => {
      setGeoPosition({
        ...initialState,
        finished: true,
        userHasApprovedToShareLocation: true,
      })

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
    [setPositions, positions]
  )

  const onError = useCallback(
    (error: any) => {
      setGeoPosition((prev) => ({
        ...prev,
        loading: false,
        finished: true,
        userHasApprovedToShareLocation: false,
        error,
      }))
    },
    [setGeoPosition]
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoPosition({
        ...initialState,
        finished: true,
      })

      return
    }

    if (!positionsAreLoaded) {
      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [positionsAreLoaded, onError, onChange])

  useEffect(() => {
    setGeoPosition((prev) => (prev.error ? { ...prev, error: null } : prev))
  }, [location.pathname])

  return geoPosition
}

export default useGeoPosition
