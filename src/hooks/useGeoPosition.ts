import { useCallback, useState, useEffect } from 'react'
import { GEO_POSITION_STORAGE_KEY } from 'config'

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
      setPosition((prev) => ({ ...prev, error }))
    },
    [setPosition]
  )

  useEffect(() => {
    if (!navigator.onLine) {
      const data = localStorage.getItem(GEO_POSITION_STORAGE_KEY)

      if (data) {
        try {
          const geoPosition = JSON.parse(data)

          setPosition({
            latitude: geoPosition.latitude,
            longitude: geoPosition.longitude,
            error: '',
            loading: false,
          })
        } catch {
          setPosition({
            error: 'Kunde ej läsa sparad position i offline läge.',
            loading: false,
          })
        }
      } else {
        setPosition({
          error: 'Kunde ej finna sparad position i offline läge.',
          loading: false,
        })
      }

      return
    }

    if (!navigator.geolocation) {
      setPosition((prev) => ({
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

  return position
}

export default useGeoPosition
