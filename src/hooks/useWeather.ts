import { useMemo, useState } from 'react'
import { format } from 'utils/date'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'
import useSearchHandler from 'hooks/useSearchHandler'
import usePersistPosition from 'hooks/usePersistPosition'
import useOnline from 'hooks/useOnline'

interface IStatus {
  online: boolean
  loading: boolean
  type: 'spinner' | 'placeholder'
}

interface IWeather {
  city: string | null
  days: Array<any> | null
  status: IStatus
  error: any
  searchHandler: any
  geoPosition: any
}

const useWeather = (): IWeather => {
  const online = useOnline()

  const [position, setPosition] = useState<any>({
    latitude: null,
    longitude: null,
    city: null,
  })

  const searchHandler = useSearchHandler(setPosition)

  const geoPosition = useGeoPosition(setPosition)

  const address = useAddress({
    latitude: position?.latitude,
    longitude: position?.longitude,
    setPosition,
    position,
  })

  const forecast = useForecast({
    latitude: position?.latitude?.toFixed(4),
    longitude: position?.longitude?.toFixed(4),
  })

  usePersistPosition(position)

  return useMemo(() => {
    let weather: IWeather = {
      city: position.city,
      days: null,
      geoPosition,
      searchHandler,
      error: geoPosition.error || address.error || forecast.error,
      status: {
        online,
        loading: geoPosition.loading || address.loading || forecast.loading,
        type: 'placeholder',
      },
    }

    if (forecast.response) {
      const groupDaysByMonth = forecast.response.properties.timeseries.reduce(
        (acc: any, timeSerie: any) => {
          const key = format(timeSerie.time, 'yyyy-MM-dd')
          return {
            ...acc,
            [key]: acc[key] ? [...acc[key], timeSerie] : [timeSerie],
          }
        },
        {}
      )

      weather.days = Object.keys(groupDaysByMonth).map(
        (key) => groupDaysByMonth[key]
      )

      weather.status.type = 'spinner'
    }

    return weather
  }, [geoPosition, address, position.city, forecast, online, searchHandler])
}

export default useWeather
