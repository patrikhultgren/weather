import { useEffect, useCallback, useMemo, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import { FORECAST_CACHE_EXPIRES_IN_MINUTES, FORECAST_API_URL } from 'config'
import { addMinutes } from 'date-fns'
import useInterval from './useInterval'

interface IProps {
  latitude?: number
  longitude?: number
}

const useForecast = ({ latitude, longitude }: IProps): IQuery<any> => {
  const [result, setResult] = useState<IQuery<any>>({
    loading: false,
    error: null,
    response: null,
    expires: null,
  })

  const loadData = useCallback(async () => {
    if (latitude && longitude) {
      setResult((prev: any) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await request({
          endpoint: `${FORECAST_API_URL}?lat=${latitude.toFixed(
            4
          )}&lon=${longitude.toFixed(4)}`,
        })

        setResult({
          response,
          expires: addMinutes(new Date(), FORECAST_CACHE_EXPIRES_IN_MINUTES),
          loading: false,
          error: null,
        })
      } catch (error) {
        setResult({
          response: null,
          expires: addMinutes(new Date(), FORECAST_CACHE_EXPIRES_IN_MINUTES),
          loading: false,
          error,
        })
      }
    }
  }, [latitude, longitude])

  useEffect(() => {
    loadData()
  }, [loadData])

  const delay = useMemo(() => {
    if (result.expires) {
      const diffInMs = result.expires.getTime() - new Date().getTime()

      if (diffInMs > 0) {
        return diffInMs
      }

      return 0
    }

    return null
  }, [result.expires])

  useInterval(() => {
    loadData()
  }, delay)

  return result
}

export default useForecast
