import { useMemo, useCallback, useEffect, useState } from 'react'
import { SEARCH_API_KEY, SEARCH_API_URL } from 'config'
import useFetch from 'hooks/useFetch'

const transformResponse = (response: any) => response.slice().reverse()

const useSearchHandler = (setPosition: any): any => {
  const [run, setRun] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [active, setActive] = useState<boolean>(false)

  const closeSearch = useCallback(() => {
    setSearchTerm('')
    setReset(true)
    setRun(false)
    setActive(false)
  }, [])

  const resetSearchTerm = useCallback(() => {
    setSearchTerm('')
    setReset(true)
    setRun(false)
  }, [])

  const onSelectSearchResult = useCallback(
    (searchResult: any) => {
      setPosition({
        latitude: parseFloat(searchResult.lat),
        longitude: parseFloat(searchResult.lon),
      })
      closeSearch()
    },
    [setPosition, closeSearch]
  )

  const onSubmitSearch = useCallback(
    (event: any) => {
      event.preventDefault()

      if (searchTerm) {
        setRun(true)
      }
    },
    [searchTerm]
  )

  const onChangeSearchTerm = useCallback((event: any) => {
    setSearchTerm(event.target.value)
    setRun(false)
    setReset(false)
  }, [])

  const url = useMemo(
    () =>
      `${SEARCH_API_URL}?key=${SEARCH_API_KEY}&q=${searchTerm.trim()}&format=json`,
    [searchTerm]
  )

  const searchResults = useFetch({ url, run, reset, transformResponse })

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'auto'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [active])

  return useMemo(
    () => ({
      searchResults,
      searchTerm,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      closeSearch,
      resetSearchTerm,
      active,
      setActive,
    }),
    [
      searchResults,
      searchTerm,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      closeSearch,
      resetSearchTerm,
      active,
      setActive,
    ]
  )
}

export default useSearchHandler
