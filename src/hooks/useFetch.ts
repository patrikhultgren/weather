import { useEffect, useCallback, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import useVisibilityChange from 'hooks/useVisibilityChange'

interface IProps {
  url: string
  run: boolean
  reset?: boolean
  transformResponse?: (response: any) => any
}

const initialState = {
  loading: false,
  error: null,
  response: null,
  finished: false,
}

const useFetch = <TResponse>({
  url,
  run,
  reset,
  transformResponse,
}: IProps): IQuery<TResponse> => {
  const [count, setCount] = useState<number>(1)

  const onVisibilityChange = useCallback(() => {
    const state = document.visibilityState

    if (state === 'visible') {
      setCount((prev) => prev + 1)
    }
  }, [])

  useVisibilityChange(onVisibilityChange)

  const [result, setResult] = useState<IQuery<TResponse>>({ ...initialState })

  const loadData = useCallback(async () => {
    if (url && count && run) {
      setResult((prev) => ({
        ...prev,
        finished: false,
        loading: true,
        error: null,
      }))

      try {
        const response = await request({
          endpoint: url,
        })

        setResult({
          response: transformResponse ? transformResponse(response) : response,
          loading: false,
          finished: true,
          error: null,
        })
      } catch (error) {
        setResult({
          response: null,
          loading: false,
          finished: true,
          error,
        })
      }
    }
  }, [url, count, run, transformResponse])

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
