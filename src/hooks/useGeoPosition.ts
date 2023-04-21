import { useCallback, useState, useEffect, useRef } from 'react'
import { addPosition } from 'utils/position'
import { IPosition, IGeoPosition } from 'utils/types'

const allPositionsAreFoundByAllowingPosition = (positionsRef: any) =>
  positionsRef &&
  positionsRef.current &&
  positionsRef.current.every(
    (position: IPosition) => position.status === 'foundByAllowingPosition'
  )

const initialState: IGeoPosition = {
  error: null,
  loading: false,
}

const useGeoPosition = (
  setPositions: Function,
  positionsAreLoaded: boolean,
  positions: Array<IPosition>
): IGeoPosition => {
  const positionsRef = useRef(positions)

  const [geoPosition, setGeoPosition] = useState<IGeoPosition>({
    ...initialState,
    loading: true,
  })

  const onChange = useCallback(
    ({ coords }: GeolocationPosition) => {
      setGeoPosition({
        ...initialState,
      })

      if (allPositionsAreFoundByAllowingPosition(positionsRef)) {
        setPositions((prev: Array<IPosition>) =>
          addPosition(prev, {
            latitude: parseFloat(coords.latitude.toFixed(4)),
            longitude: parseFloat(coords.longitude.toFixed(4)),
            city: '',
            status: 'foundByAllowingPosition',
          })
        )
      }
    },
    [setPositions, positionsRef]
  )

  const onError = useCallback(
    (error: any) => {
      setGeoPosition((prev) => ({ ...prev, loading: false, error }))
    },
    [setGeoPosition]
  )

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoPosition({
        ...initialState,
      })

      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [positionsAreLoaded, positionsRef, onError, onChange])

  return geoPosition
}

export default useGeoPosition
