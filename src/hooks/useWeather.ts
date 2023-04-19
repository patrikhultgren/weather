import { useEffect, useMemo, useState } from 'react'
import { format } from 'utils/date'
import { IQuery } from 'utils/types'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'
import useSearchHandler from 'hooks/useSearchHandler'

interface IWeather {
  address: any
  days: Array<any> | null
  city: string | null
}

const useWeather = (): IQuery<IWeather> => {
  const [position, setPosition] = useState<any>({
    latitude: null,
    longitude: null,
    city: null,
  })

  const searchHandler = useSearchHandler(setPosition)

  const geoPosition = useGeoPosition()

  const address = useAddress({
    latitude: position?.latitude,
    longitude: position?.longitude,
  })

  const forecast = useForecast({
    latitude: position?.latitude?.toFixed(4),
    longitude: position?.longitude?.toFixed(4),
  })

  useEffect(() => {
    if (geoPosition?.latitude && geoPosition?.longitude) {
      setPosition({
        latitude: geoPosition.latitude,
        longitude: geoPosition.longitude,
        city: null,
      })
    }
  }, [geoPosition?.latitude, geoPosition?.longitude])

  const city = address.response?.city

  useEffect(() => {
    if (city && !position.city) {
      setPosition((prev: any) => ({ ...prev, city }))
    }
  }, [city, position.city])

  return useMemo(() => {
    let result: IQuery<IWeather> = {
      loading: geoPosition.loading || address.loading || forecast.loading,
      error: geoPosition.error || address.error || forecast.error,
      response: { address: null, days: null, city: position.city },
      searchHandler,
    }

    if (result.response) {
      if (address.response) {
        result.response.address = address.response
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

        result.response.days = Object.keys(groupDaysByMonth).map(
          (key) => groupDaysByMonth[key]
        )
      }
    }

    return result
  }, [geoPosition, address, position.city, forecast, searchHandler])
}

export default useWeather
