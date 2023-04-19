import { useMemo, useState } from 'react'
import { format } from 'utils/date'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'
import useSearchHandler from 'hooks/useSearchHandler'

interface IWeather {
  city: string | null
  days: Array<any> | null
  loading: boolean
  error: any
  searchHandler: any
}

const useWeather = (): IWeather => {
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

  return useMemo(() => {
    let result: IWeather = {
      city: position.city,
      days: null,
      loading: geoPosition.loading || address.loading || forecast.loading,
      error: geoPosition.error || address.error || forecast.error,
      searchHandler,
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

      result.days = Object.keys(groupDaysByMonth).map(
        (key) => groupDaysByMonth[key]
      )
    }

    return result
  }, [geoPosition, address, position.city, forecast, searchHandler])
}

export default useWeather
