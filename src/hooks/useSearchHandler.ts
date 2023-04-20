import { useMemo, useCallback, useEffect, useState } from 'react'
import { SEARCH_API_KEY, SEARCH_API_URL } from 'config'
import { addPosition } from 'utils/position'
import { IPosition, ILocationIQPosition } from 'utils/types'
import useFetch from 'hooks/useFetch'

const transformResponse = (
  response: Array<ILocationIQPosition>
): Array<IPosition> =>
  response.map((position) => ({
    latitude: parseFloat(position.lat),
    longitude: parseFloat(position.lon),
    city: position.display_name,
  }))

const useSearchHandler = (
  positions: Array<IPosition>,
  setPositions: Function
): any => {
  const [run, setRun] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [active, setActive] = useState<boolean>(false)

  const openSearch = useCallback(() => {
    setActive(true)
  }, [])

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
    (searchResult: IPosition) => {
      setPositions((prev: Array<IPosition>) =>
        addPosition(
          prev,
          searchResult.latitude,
          searchResult.longitude,
          searchResult.city
        )
      )

      closeSearch()
    },
    [setPositions, closeSearch]
  )

  const onSubmitSearch = useCallback(
    (event: any) => {
      event.preventDefault()

      if (
        searchTerm &&
        !['close-search', 'reset-search-term'].includes(
          event?.relatedTarget?.dataset?.ref
        )
      ) {
        setRun(true)
      }
    },
    [searchTerm]
  )

  const onChangeSearchTerm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      setRun(false)
      setReset(false)
    },
    []
  )

  const url = useMemo(
    () =>
      `${SEARCH_API_URL}?key=${SEARCH_API_KEY}&q=${searchTerm.trim()}&format=json`,
    [searchTerm]
  )

  const searchResultsByApi = useFetch<Array<IPosition>>({
    url,
    run,
    reset,
    transformResponse,
  })

  const searchResults = useMemo(
    () =>
      searchTerm
        ? searchResultsByApi
        : {
            loading: false,
            error: null,
            response: positions.filter((_position, index) => index > 0),
          },
    [searchTerm, searchResultsByApi, positions]
  )

  useEffect(() => {
    document.body.style.backgroundColor = active ? '#475569' : '#fff'
    document.body.style.overflow = active ? 'hidden' : 'auto'

    return () => {
      document.body.style.backgroundColor = '#fff'
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
      openSearch,
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
      openSearch,
      closeSearch,
      resetSearchTerm,
      active,
      setActive,
    ]
  )
}

export default useSearchHandler
