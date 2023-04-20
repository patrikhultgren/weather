import { useMemo } from 'react'
import { IQuery, IForecast } from 'utils/types'
import { FORECAST_API_URL } from 'config'
import useFetch from 'hooks/useFetch'

interface IProps {
  latitude?: string
  longitude?: string
}

const useForecast = ({ latitude, longitude }: IProps): IQuery<IForecast> => {
  const run = useMemo(
    () => Boolean(latitude && longitude),
    [latitude, longitude]
  )

  const url = useMemo(
    () => `${FORECAST_API_URL}?lat=${latitude}&lon=${longitude}`,
    [latitude, longitude]
  )

  return useFetch<any>({ url, run })
}

export default useForecast
