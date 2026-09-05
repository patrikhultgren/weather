import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getJson, isAbortError, toError } from 'lib/http'
import { useTranslation, type SupportedLanguage } from 'i18n/context'
import useLatestRef from 'hooks/useLatestRef'
import useOnValueChange from 'hooks/useOnValueChange'
import useVisibilityChange from 'hooks/useVisibilityChange'
import type { IQuery } from 'types'

interface IProps<TResponse, TRaw> {
  url: string
  run: boolean
  /** Clears the result, used when a search is emptied. */
  reset?: boolean
  transformResponse?: (response: TRaw, language: SupportedLanguage) => TResponse
}

const initialState = {
  loading: false,
  error: null,
  response: null,
  finished: false,
} as const

const useFetch = <TResponse, TRaw = TResponse>({
  url,
  run,
  reset,
  transformResponse,
}: IProps<TResponse, TRaw>): IQuery<TResponse> => {
  const { language } = useTranslation()
  const location = useLocation()

  const [reloadCount, setReloadCount] = useState<number>(0)
  const [result, setResult] = useState<IQuery<TResponse>>({ ...initialState })

  // Held in a ref so an inline transform doesn't retrigger the request.
  const transformRef = useLatestRef(transformResponse)

  useVisibilityChange(() => {
    if (document.visibilityState === 'visible') {
      setReloadCount((prev) => prev + 1)
    }
  })

  useEffect(() => {
    if (!url || !run) {
      return
    }

    const controller = new AbortController()

    // Starting the request and marking it in flight are one transition, and
    // there is no external source to derive the loading state from.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult((prev) => ({
      ...prev,
      finished: false,
      loading: true,
      error: null,
    }))

    getJson<TRaw>(url, controller.signal)
      .then((response) => {
        const transform = transformRef.current

        setResult({
          response: transform
            ? transform(response as TRaw, language)
            : (response as unknown as TResponse),
          loading: false,
          finished: true,
          error: null,
        })
      })
      .catch((error: unknown) => {
        // A superseded or unmounted request must not overwrite newer state.
        if (isAbortError(error)) {
          return
        }

        setResult({
          response: null,
          loading: false,
          finished: true,
          error: toError(error),
        })
      })

    return () => controller.abort()
  }, [url, run, reloadCount, language, transformRef])

  useOnValueChange(reset, (isReset) => {
    if (isReset) {
      setResult({ ...initialState })
    }
  })

  // An error from the previous page is no longer relevant once we navigate.
  useOnValueChange(location.pathname, () => {
    setResult((prev) => (prev.error ? { ...prev, error: null } : prev))
  })

  return result
}

export default useFetch
