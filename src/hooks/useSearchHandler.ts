import { useMemo, useCallback, useState } from 'react'
import { SEARCH_API_KEY, SEARCH_API_URL } from 'config'
import useFetch from 'hooks/useFetch'

const useSearchHandler = (setPosition: any): any => {
  const [run, setRun] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const resetSearch = useCallback(() => {
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
      resetSearch()
    },
    [setPosition, resetSearch]
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
    () => `${SEARCH_API_URL}?key=${SEARCH_API_KEY}&q=${searchTerm}&format=json`,
    [searchTerm]
  )

  const searchResults = useFetch({ url, run, reset })

  return useMemo(
    () => ({
      searchResults,
      searchTerm,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      resetSearch,
    }),
    [
      searchResults,
      searchTerm,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      resetSearch,
    ]
  )
}

export default useSearchHandler
