import { useMemo, useCallback, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { SEARCH_API_KEY, SEARCH_API_URL } from 'config'
import { addPosition } from 'utils/position'
import {
  IPosition,
  ILocationIQPosition,
  ISearchHandler,
  IQuery,
  ISearchResults,
} from 'utils/types'
import {
  ARROW_UP_KEY_CODE,
  ARROW_DOWN_KEY_CODE,
  ENTER_KEY_CODE,
  ESC_KEY_CODE,
} from 'utils/keyCodes'
import useFetch from 'hooks/useFetch'

const transformResponse = (
  response: Array<ILocationIQPosition>
): Array<IPosition> =>
  response.map((position) => ({
    latitude: parseFloat(position.lat),
    longitude: parseFloat(position.lon),
    city: position.display_name,
    status: 'foundBySearch',
  }))

const useSearchHandler = (
  positions: Array<IPosition>,
  setPositions: Function
): ISearchHandler => {
  const navigate = useNavigate()
  const [run, setRun] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [active, setActive] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const location = useLocation()
  const locationFrom = location.state?.from

  const openSearch = useCallback(() => {
    setActive(true)
  }, [])

  const closeSearch = useCallback(() => {
    setSearchTerm('')
    setReset(true)
    setRun(false)
    setActive(false)
    navigate(locationFrom || '/')
    setSelectedIndex(null)
  }, [navigate, locationFrom, setSelectedIndex])

  const resetSearchTerm = useCallback(() => {
    setSearchTerm('')
    setReset(true)
    setRun(false)
  }, [])

  const onSelectSearchResult = useCallback(
    (searchResult: IPosition) => {
      setPositions((prev: Array<IPosition>) => addPosition(prev, searchResult))
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

  const fetchedSearchResults = useFetch<Array<IPosition>>({
    url,
    run,
    reset,
    transformResponse,
  })

  const searchResults: IQuery<ISearchResults> = useMemo(
    () =>
      searchTerm
        ? {
            ...fetchedSearchResults,
            response: {
              type: 'searchResults',
              positions: fetchedSearchResults.response,
            },
          }
        : {
            loading: false,
            error: null,
            finished: true,
            response: {
              type: 'history',
              positions: positions
                .filter((position) => position.city)
                .filter((_position, index) => index > 0),
            },
          },
    [searchTerm, fetchedSearchResults, positions]
  )

  const searchResultpositions = searchResults.response?.positions || []

  const handleUpArrowKeydown = useCallback(
    (selectedIndex: number) => {
      if (selectedIndex === 0) {
        if (searchResultpositions.length) {
          setSelectedIndex(searchResultpositions.length - 1)
        }
      } else if (selectedIndex > 0) {
        setSelectedIndex((prev) => (prev === null ? prev : prev - 1))
      }
    },
    [searchResultpositions]
  )

  const handleDownArrowKeydown = useCallback(
    (selectedIndex: number) => {
      if (searchResultpositions.length) {
        if (selectedIndex < searchResultpositions.length - 1) {
          setSelectedIndex((prev) => (prev === null ? prev : prev + 1))
        } else if (selectedIndex === searchResultpositions.length - 1) {
          setSelectedIndex(0)
        }
      }
    },
    [searchResultpositions]
  )

  const onKeyDown = useCallback(
    ({ keyCode }: { keyCode: number }) => {
      if ([ARROW_UP_KEY_CODE, ARROW_DOWN_KEY_CODE].includes(keyCode)) {
        if (selectedIndex === null) {
          const numberOfPositions = searchResults.response?.positions?.length

          if (numberOfPositions) {
            setSelectedIndex(
              keyCode === ARROW_UP_KEY_CODE ? numberOfPositions - 1 : 0
            )
          }
        } else {
          if (keyCode === ARROW_UP_KEY_CODE) {
            handleUpArrowKeydown(selectedIndex)
          } else if (keyCode === ARROW_DOWN_KEY_CODE) {
            handleDownArrowKeydown(selectedIndex)
          }
        }
      } else if (keyCode === ENTER_KEY_CODE && selectedIndex !== null) {
        const position = searchResults.response?.positions?.[selectedIndex]

        if (position) {
          onSelectSearchResult(position)
        }
      } else if (keyCode === ESC_KEY_CODE) {
        closeSearch()
        setSelectedIndex(null)
      } else {
        setSelectedIndex(null)
      }
    },
    [
      selectedIndex,
      setSelectedIndex,
      searchResults,
      onSelectSearchResult,
      handleDownArrowKeydown,
      closeSearch,
    ]
  )

  return useMemo(
    () => ({
      searchResults,
      searchTerm,
      selectedIndex,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      onKeyDown,
      openSearch,
      closeSearch,
      resetSearchTerm,
      active,
      setActive,
    }),
    [
      searchResults,
      searchTerm,
      selectedIndex,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      onKeyDown,
      openSearch,
      closeSearch,
      resetSearchTerm,
      active,
      setActive,
    ]
  )
}

export default useSearchHandler
