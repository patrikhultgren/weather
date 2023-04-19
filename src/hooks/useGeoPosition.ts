import { useCallback, useState, useEffect } from 'react'
import { GEO_POSITION_STORAGE_KEY } from 'config'

interface IPosition {
  error: any
  latitude?: number
  longitude?: number
  loading: boolean
}

const useGeoPosition = (setPosition: any): IPosition => {
  const [geoPosition, setGeoPosition] = useState<IPosition>({
    error: '',
    loading: true,
  })

  const onChange = ({ coords }: any) => {
    setGeoPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      error: '',
      loading: false,
    })

    localStorage.setItem(
      GEO_POSITION_STORAGE_KEY,
      JSON.stringify({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    )
  }

  const onError = useCallback(
    (error: any) => {
      setGeoPosition((prev) => ({ ...prev, error }))
    },
    [setGeoPosition]
  )

  useEffect(() => {
    if (!navigator.onLine) {
      const data = localStorage.getItem(GEO_POSITION_STORAGE_KEY)

      if (data) {
        try {
          const geoPosition = JSON.parse(data)

          setGeoPosition({
            latitude: geoPosition.latitude,
            longitude: geoPosition.longitude,
            error: '',
            loading: false,
          })
        } catch {
          setGeoPosition({
            error: 'Kunde ej läsa sparad position i offline läge.',
            loading: false,
          })
        }
      } else {
        setGeoPosition({
          error: 'Kunde ej finna sparad position i offline läge.',
          loading: false,
        })
      }

      return
    }

    if (!navigator.geolocation) {
      setGeoPosition((prev) => ({
        ...prev,
        error: new Error(
          'Hämtning av latitud och longitud stödjs inte i denna webbläsare.'
        ),
      }))

      return
    }

    const watcher = navigator.geolocation.watchPosition(onChange, onError)

    return () => navigator.geolocation.clearWatch(watcher)
  }, [onError])

  useEffect(() => {
    if (geoPosition?.latitude && geoPosition?.longitude) {
      setPosition({
        latitude: geoPosition.latitude,
        longitude: geoPosition.longitude,
        city: null,
      })
    }
  }, [geoPosition?.latitude, geoPosition?.longitude])

  return geoPosition
}

export default useGeoPosition
