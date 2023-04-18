import { useEffect, useCallback, useState } from 'react'
import { IQuery } from 'utils/types'
import request from 'utils/request'
import useVisibilityChange from 'hooks/useVisibilityChange'

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
  })

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
        })
      } catch (error) {
        setResult({
          response: null,
          loading: false,
          error,
        })
      }
    }
  }, [count, run])

  useEffect(() => {
    loadData()
  }, [loadData])

  return result
}

export default useFetch
