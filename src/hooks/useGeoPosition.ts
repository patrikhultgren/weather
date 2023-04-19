import { useCallback, useState, useEffect } from 'react'
import { GEO_POSITION_STORAGE_KEY } from 'config'

const initialState = {
  latitude: null,
  longitude: null,
  city: null,
  error: null,
  loading: false,
}

interface IPosition {
  latitude: number | null
  longitude: number | null
  city: string | null
  error: any
  loading: boolean
}

const useGeoPosition = (setPosition: any): IPosition => {
  const [geoPosition, setGeoPosition] = useState<IPosition>({
    ...initialState,
    loading: true,
  })

  const onChange = ({ coords }: any) => {
    setGeoPosition({
      ...initialState,
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
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
            ...initialState,
            latitude: geoPosition.latitude,
            longitude: geoPosition.longitude,
            city: geoPosition.city,
          })
        } catch {
          setGeoPosition({
            ...initialState,
            error: new Error('Kunde ej läsa sparad position i offline läge.'),
          })
        }
      } else {
        setGeoPosition({
          ...initialState,
          error: new Error('Kunde ej finna sparad position i offline läge.'),
        })
      }

      return
    }

    if (!navigator.geolocation) {
      setGeoPosition((prev) => ({
        ...prev,
        loading: false,
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
    if (geoPosition.latitude && geoPosition.longitude) {
      setPosition({
        latitude: geoPosition.latitude,
        longitude: geoPosition.longitude,
        city: geoPosition.city,
      })
    }
  }, [
    geoPosition.latitude,
    geoPosition.longitude,
    geoPosition.city,
    setPosition,
  ])

  useEffect(() => {
    if (geoPosition.latitude && geoPosition.longitude && geoPosition.city) {
      localStorage.setItem(
        GEO_POSITION_STORAGE_KEY,
        JSON.stringify({
          latitude: geoPosition.latitude,
          longitude: geoPosition.longitude,
          city: geoPosition.city,
        })
      )
    }
  }, [geoPosition.latitude, geoPosition.longitude, geoPosition.city])

  return geoPosition
}

export default useGeoPosition
