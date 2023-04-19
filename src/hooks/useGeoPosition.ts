import { useCallback, useState, useEffect } from 'react'
import { addPosition, getPositions } from 'utils/position'

const initialState = {
  latitude: null,
  longitude: null,
  error: null,
  loading: false,
}

interface IGeoPosition {
  latitude: number | null
  longitude: number | null
  error: any
  loading: boolean
}

const useGeoPosition = (setPositions: any): IGeoPosition => {
  const positions = getPositions()
  const run = positions.length === 0

  const [geoPosition, setGeoPosition] = useState<IGeoPosition>({
    ...initialState,
    loading: run,
  })

  const onChange = useCallback(({ coords }: any) => {
    setGeoPosition({
      ...initialState,
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }, [])

  const onError = useCallback(
    (error: any) => {
      setGeoPosition((prev) => ({ ...prev, loading: false, error }))
    },
    [setGeoPosition]
  )

  useEffect(() => {
    if (!run || !navigator.geolocation) {
      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [run, onError, onChange])

  useEffect(() => {
    if (geoPosition.latitude && geoPosition.longitude) {
      setPositions((prev: Array<any>) =>
        addPosition(
          prev,
          geoPosition.latitude || 0,
          geoPosition.longitude || 0,
          ''
        )
      )
    }
  }, [geoPosition.latitude, geoPosition.longitude, setPositions])

  return geoPosition
}

export default useGeoPosition
