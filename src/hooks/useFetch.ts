import { useEffect, useCallback, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import useVisibilityChange from 'hooks/useVisibilityChange'
import { addMinutes } from 'date-fns'

interface IProps {
  url: string
  run: boolean
  reset?: boolean
}

const initialState = {
  loading: false,
  error: null,
  response: null,
  expires: null,
}

const useFetch = ({ url, run, reset }: IProps): IQuery<any> => {
  const [count, setCount] = useState<number>(1)

  const onVisibilityChange = useCallback(() => {
    const state = document.visibilityState

    if (state === 'visible') {
      setCount((prev) => prev + 1)
    }
  }, [])

  useVisibilityChange(onVisibilityChange)

  const [result, setResult] = useState<IQuery<any>>({ ...initialState })

  const loadData = useCallback(async () => {
    if (url && count && run) {
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
  }, [url, count, run])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    if (reset) {
      setResult({ ...initialState })
    }
  }, [reset])

  return result
}

export default useFetch
