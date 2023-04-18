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
}

const useWeather = (): IQuery<IWeather> => {
  const [position, setPosition] = useState<any>({
    latitude: null,
    longitude: null,
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
      })
    }
  }, [geoPosition])

  return useMemo(() => {
    let result: IQuery<IWeather> = {
      loading: geoPosition.loading || address.loading || forecast.loading,
      error: geoPosition.error || address.error || forecast.error,
      response: { address: null, days: null },
      expires: null,
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
  }, [geoPosition, address, forecast, searchHandler])
}

export default useWeather
