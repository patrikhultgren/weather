import { useCallback, useState, useEffect, useRef } from 'react'
import { addPosition } from 'utils/position'
import { IPosition } from 'utils/types'

const positionExists = (positionsRef: any) =>
  positionsRef && positionsRef.current && positionsRef.current.length

const initialState = {
  error: null,
  loading: false,
}

interface IGeoPosition {
  error: any
  loading: boolean
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

      if (!positionExists(positionsRef)) {
        setPositions((prev: Array<IPosition>) =>
          addPosition(
            prev,
            parseFloat(coords.latitude.toFixed(5)),
            parseFloat(coords.longitude.toFixed(5)),
            ''
          )
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
    if (
      (positionsAreLoaded && positionExists(positionsRef)) ||
      !navigator.geolocation
    ) {
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
