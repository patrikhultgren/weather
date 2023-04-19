import { useMemo, useState } from 'react'
import { format } from 'utils/date'
import { IQuery } from 'utils/types'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'
import useSearchHandler from 'hooks/useSearchHandler'

interface IWeather {
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
    let result: IQuery<IWeather> = {
      loading: geoPosition.loading || address.loading || forecast.loading,
      error: geoPosition.error || address.error || forecast.error,
      response: { days: null, city: position.city },
      searchHandler,
    }

    if (result.response) {
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
