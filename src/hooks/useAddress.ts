import { useEffect, useCallback, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import { ADDRESS_API_URL } from 'config'
import useVisibilityChange from 'hooks/useVisibilityChange'

interface IProps {
  latitude?: number
  longitude?: number
}

const useAddress = ({ latitude, longitude }: IProps): IQuery<any> => {
  const [count, setCount] = useState<number>(1)

  const onVisibilityChange = useCallback(() => {
    const state = document.visibilityState

    if (state === 'visible') {
      setCount((prev) => prev + 1)
    }
  }, [])

  useVisibilityChange(onVisibilityChange)

  const [result, setResult] = useState<IQuery<any>>({
    loading: false,
    error: null,
    response: null,
  })

  const loadData = useCallback(async () => {
    if (latitude && longitude && count) {
      setResult((prev: any) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await request({
          endpoint: `${ADDRESS_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=sv`,
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
  }, [latitude, longitude, count])

  useEffect(() => {
    loadData()
  }, [loadData])

  return result
}

export default useAddress
