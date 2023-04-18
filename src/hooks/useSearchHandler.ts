import { useMemo, useCallback, useState } from 'react'
import { SEARCH_API_KEY, SEARCH_API_URL } from 'config'
import useFetch from 'hooks/useFetch'

const useSearchHandler = (setPosition: any): any => {
  const [run, setRun] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const onSelectSearchResult = useCallback(
    (searchResult: any) => {
      setPosition({
        latitude: parseFloat(searchResult.lat),
        longitude: parseFloat(searchResult.lon),
      })
      setSearchTerm('')
      setReset(true)
      setRun(false)
    },
    [setPosition]
  )

  const onSubmitSearch = useCallback((event: any) => {
    event.preventDefault()
    setRun(true)
  }, [])

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
    }),
    [
      searchResults,
      searchTerm,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
    ]
  )
}

export default useSearchHandler
