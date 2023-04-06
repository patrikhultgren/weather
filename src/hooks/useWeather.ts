import { useMemo } from 'react'
import { format } from 'utils/date'
import { IQuery } from 'utils/types'
import usePosition from 'hooks/usePosition'
import useForecast from 'hooks/useForecast'

interface IWeather {
  position: any
  days: Array<any> | null
}

const useWeather = (): IQuery<IWeather> => {
  const position = usePosition()

  const forecast = useForecast({
    latitude: position.response?.latitude,
    longitude: position.response?.longitude,
  })

  return useMemo(() => {
    let result: IQuery<IWeather> = {
      loading: position.loading || forecast.loading,
      error: position.error || forecast.error,
      response: { position: null, days: null },
    }

    if (result.response) {
      if (position.response) {
        result.response.position = position.response
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
  }, [position, forecast])
}

export default useWeather
