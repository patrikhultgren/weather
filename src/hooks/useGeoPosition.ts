import { useCallback, useState, useEffect } from 'react'

interface IPosition {
  error: any
  latitude?: number
  longitude?: number
  loading: boolean
}

const useGeoPosition = (): IPosition => {
  const [position, setPosition] = useState<IPosition>({
    error: '',
    loading: true,
  })

  const onChange = ({ coords }: any) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      error: '',
      loading: false,
    })
  }

  const onError = useCallback(
    (error: any) => {
      setPosition((prev) => ({ ...prev, error }))
    },
    [setPosition]
  )

  useEffect(() => {
    const geo = navigator.geolocation

    if (!geo) {
      setPosition((prev) => ({
        ...prev,
        error: new Error(
          'Hämtning av latitud och longitud stödjs inte i denna webbläsare.'
        ),
      }))
      return
    }

    const watcher = geo.watchPosition(onChange, onError)

    return () => geo.clearWatch(watcher)
  }, [onError])

  return position
}

export default useGeoPosition
