import { useMemo } from 'react'
import {
  IQuery,
  IForecast,
  ITimeSerie,
  ITransformedForecast,
} from 'utils/types'
import endpoints from 'services/yrWeather/endpoints'
import { format } from 'utils/date'
import useFetch from 'hooks/useFetch'
import { SupportedLanguage } from 'context/TranslationProvider'

const transformResponse = (
  response: IForecast,
  language: SupportedLanguage
): ITransformedForecast => {
  const groupByDays: {
    [key: string]: Array<ITimeSerie>
  } = response.properties.timeseries.reduce(
    (acc: { [key: string]: Array<ITimeSerie> }, timeSerie) => {
      const key = format(timeSerie.time, 'yyyy-MM-dd', language)
      return {
        ...acc,
        [key]: acc[key] ? [...acc[key], timeSerie] : [timeSerie],
      }
    },
    {}
  )

  return {
    updated_at: response.properties.meta.updated_at,
    timeseries: Object.keys(groupByDays).map((key) => groupByDays[key]),
  }
}

interface IProps {
  latitude: number
  longitude: number
}

const useForecast = ({
  latitude,
  longitude,
}: IProps): IQuery<ITransformedForecast> => {
  const run = useMemo(
    () => Boolean(latitude && longitude),
    [latitude, longitude]
  )

  const url = useMemo(
    () => endpoints.getForecastUrl(latitude, longitude),
    [latitude, longitude]
  )

  const forecast = useFetch<ITransformedForecast>({
    url,
    run,
    transformResponse,
  })

  return forecast
}

export default useForecast
