import { useEffect, useCallback, useMemo, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import { API_CACHE_EXPIRES_IN_MINUTES, POSITION_API_URL } from 'config'
import { addMinutes } from 'date-fns'
import useInterval from './useInterval'

const usePosition = (): IQuery<any> => {
  const [result, setResult] = useState<IQuery<any>>({
    loading: false,
    error: null,
    response: null,
    expires: null,
  })

  const loadData = useCallback(async () => {
    setResult((prev: any) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await request({
        endpoint: POSITION_API_URL,
      })

      setResult({
        response,
        expires: addMinutes(new Date(), API_CACHE_EXPIRES_IN_MINUTES),
        loading: false,
        error: null,
      })
    } catch (error) {
      setResult({
        response: null,
        expires: addMinutes(new Date(), API_CACHE_EXPIRES_IN_MINUTES),
        loading: false,
        error,
      })
    }
  }, [])

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

export default usePosition
