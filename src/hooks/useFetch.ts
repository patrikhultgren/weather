import { useEffect, useCallback, useMemo, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import useVisibilityChange from 'hooks/useVisibilityChange'
import { addMinutes, isAfter } from 'date-fns'

interface IProps {
  url: string
  run: boolean
}

const useFetch = ({ url, run }: IProps): IQuery<any> => {
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
    expires: null,
  })

  const hasExpired = useMemo(
    () => (result.expires ? isAfter(new Date(), result.expires) : true),
    [result.expires]
  )

  const loadData = useCallback(async () => {
    if (url && count && run && hasExpired) {
      setResult((prev: any) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await request({
          endpoint: url,
        })

        setResult({
          response,
          loading: false,
          error: null,
          expires: addMinutes(new Date(), 15),
        })
      } catch (error) {
        setResult({
          response: null,
          loading: false,
          error,
          expires: null,
        })
      }
    }
  }, [url, count, run, hasExpired])

  useEffect(() => {
    loadData()
  }, [loadData])

  return result
}

export default useFetch
