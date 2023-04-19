import { useCallback, useState, useEffect } from 'react'
import { addPosition, getPositions } from 'utils/position'

const initialState = {
  error: null,
  loading: false,
}

interface IGeoPosition {
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
    if (!run || !navigator.geolocation) {
      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [run, onError, onChange])

  return geoPosition
}

export default useGeoPosition
