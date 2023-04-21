import { useEffect, useMemo, useState } from 'react'
import { IQuery, IForecast, ITimeSerie } from 'utils/types'
import { FORECAST_API_URL } from 'config'
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
  const [forecasts, setForecasts] = useState<{
    [key: string]: IQuery<Array<Array<ITimeSerie>>>
  }>({})

  const run = useMemo(
    () => Boolean(latitude && longitude),
    [latitude, longitude]
  )

  const url = useMemo(
    () => `${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}`,
    [latitude, longitude]
  )

  const forecast = useFetch<Array<Array<ITimeSerie>>>({
    url,
    run,
    transformResponse,
  })

  const key = useMemo(() => `${latitude}_${longitude}`, [latitude, longitude])

  useEffect(() => {
    if (run) {
      setForecasts((prev) => ({ ...prev, [key]: forecast }))
    }
  }, [forecast, run, key, setForecasts])

  return forecasts[key] || { loading: true, response: null, error: null }
}

export default useForecast
