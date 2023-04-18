import { useMemo } from 'react'
import { format } from 'utils/date'
import { IQuery } from 'utils/types'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'

interface IWeather {
  address: any
  days: Array<any> | null
}

const useWeather = (): IQuery<IWeather> => {
  const geoPosition = useGeoPosition()

  const address = useAddress({
    latitude: geoPosition?.latitude,
    longitude: geoPosition?.longitude,
  })

  const forecast = useForecast({
    latitude: geoPosition?.latitude?.toFixed(4),
    longitude: geoPosition?.longitude?.toFixed(4),
  })

  return useMemo(() => {
    let result: IQuery<IWeather> = {
      loading: geoPosition.loading || address.loading || forecast.loading,
      error: geoPosition.error || address.error || forecast.error,
      response: { address: null, days: null },
      expires: null,
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
  }, [geoPosition, address, forecast])
}

export default useWeather
