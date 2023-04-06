import { useEffect, useCallback, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import { POSITION_API_URL } from 'config'

interface IProps {
  latitude?: number
  longitude?: number
}

const usePosition = ({ latitude, longitude }: IProps): IQuery<any> => {
  const [result, setResult] = useState<IQuery<any>>({
    loading: false,
    error: null,
    response: null,
  })

  const loadData = useCallback(async () => {
    if (latitude && longitude) {
      setResult((prev: any) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await request({
          endpoint: `${POSITION_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=sv`,
        })

        setResult({
          response,
          loading: false,
          error: null,
        })
      } catch (error) {
        setResult({
          response: null,
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

export default usePosition
