import { useCallback, useState, useEffect } from 'react'
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

const useGeoPosition = (
  setPositions: Function,
  positionsAreLoaded: boolean,
  positions: Array<IPosition>
): IGeoPosition => {
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

  return geoPosition
}

export default useGeoPosition
