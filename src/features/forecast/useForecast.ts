import { useMemo } from 'react'
import useFetch from 'hooks/useFetch'
import { format } from 'lib/date'
import { getForecastUrl } from 'services/yr'
import type { SupportedLanguage } from 'i18n/context'
import type { IForecast, IQuery, ITimeSerie, ITransformedForecast } from 'types'

/** Groups the flat hourly series returned by Yr into one array per day. */
export const groupByDay = (
  response: IForecast,
  language: SupportedLanguage
): ITransformedForecast => {
  const days = new Map<string, Array<ITimeSerie>>()

  for (const timeSerie of response.properties.timeseries) {
    const key = format(timeSerie.time, 'yyyy-MM-dd', language)
    const day = days.get(key)

    if (day) {
      day.push(timeSerie)
    } else {
      days.set(key, [timeSerie])
    }
  }

  return {
    updated_at: response.properties.meta.updated_at,
    timeseries: [...days.values()],
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
    () => getForecastUrl(latitude, longitude),
    [latitude, longitude]
  )

  return useFetch<ITransformedForecast, IForecast>({
    url,
    run,
    transformResponse: groupByDay,
  })
}

export default useForecast
