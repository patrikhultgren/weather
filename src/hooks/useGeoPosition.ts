import { useCallback, useState, useEffect } from 'react'
import { addPosition } from 'utils/position'

const initialState = {
  error: null,
  loading: false,
}

interface IGeoPosition {
  error: any
  loading: boolean
}

const useGeoPosition = (
  setPositions: any,
  runGeoPosition: boolean
): IGeoPosition => {
  const [geoPosition, setGeoPosition] = useState<IGeoPosition>({
    ...initialState,
    loading: true,
  })

  const onChange = useCallback(
    ({ coords }: any) => {
      setGeoPosition({
        ...initialState,
      })

      setPositions((prev: Array<any>) =>
        addPosition(prev, coords.latitude, coords.longitude, '')
      )
    },
    [setPositions]
  )

  const onError = useCallback(
    (error: any) => {
      setGeoPosition((prev) => ({ ...prev, loading: false, error }))
    },
    [setGeoPosition]
  )

  useEffect(() => {
    if (!runGeoPosition || !navigator.geolocation) {
      setGeoPosition({
        ...initialState,
      })

      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [runGeoPosition, onError, onChange])

  return geoPosition
}

export default useGeoPosition
