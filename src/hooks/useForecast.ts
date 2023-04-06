import { useEffect, useCallback, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import { FORECAST_API_URL } from 'config'

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
          expires: null,
          loading: false,
          error: null,
        })
      } catch (error) {
        setResult({
          response: null,
          expires: null,
          loading: false,
          error,
        })
      }
    }
  }, [latitude, longitude])

  useEffect(() => {
    loadData()
  }, [loadData])

  return result
}

export default useForecast
