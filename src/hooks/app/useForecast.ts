import { useMemo } from 'react'
import { IQuery, IForecast, ITimeSerie } from 'utils/types'
import endpoints from 'services/yrWeather/endpoints'
import { format } from 'utils/date'
import useFetch from 'hooks/useFetch'

const transformResponse = (response: IForecast): Array<Array<ITimeSerie>> => {
  const groupDaysByMonth: {
    [key: string]: Array<ITimeSerie>
  } = response.properties.timeseries.reduce(
    (acc: { [key: string]: Array<ITimeSerie> }, timeSerie) => {
      const key = format(timeSerie.time, 'yyyy-MM-dd')
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], timeSerie] : [timeSerie],
      }
    },
    {}
  )

  return Object.keys(groupDaysByMonth).map((key) => groupDaysByMonth[key])
}

interface IProps {
  latitude: number
  longitude: number
}

const useForecast = ({
  latitude,
  longitude,
}: IProps): IQuery<Array<Array<ITimeSerie>>> => {
  const run = useMemo(
    () => Boolean(latitude && longitude),
    [latitude, longitude]
  )

  const url = useMemo(
    () => endpoints.getForecastUrl(latitude, longitude),
    [latitude, longitude]
  )

  const forecast = useFetch<Array<Array<ITimeSerie>>>({
    url,
    run,
    transformResponse,
  })

  return forecast
}

export default useForecast
