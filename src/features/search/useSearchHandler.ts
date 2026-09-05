import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_PATH } from 'config'
import useFetch from 'hooks/useFetch'
import { getSearchUrl } from 'services/locationIQ'
import { addPosition } from 'features/location/positions'
import type {
  ILocationIQPosition,
  IPosition,
  IQuery,
  ISearchHandler,
  ISearchResults,
} from 'types'

/** Buttons whose blur must not trigger a search, since they close the field. */
const NON_SUBMITTING_REFS = ['close-search', 'reset-search-term']

export const toPositions = (
  response: Array<ILocationIQPosition>
): Array<IPosition> => {
  if (!Array.isArray(response)) {
    return []
  }

  return response
    .map((position) => ({
      latitude: parseFloat(position.lat),
      longitude: parseFloat(position.lon),
      city: position.display_name,
      status: 'foundBySearch' as const,
    }))
    .filter(
      (position) =>
        Number.isFinite(position.latitude) &&
        Number.isFinite(position.longitude)
    )
}

const wrap = (index: number, length: number) => (index + length) % length

interface IProps {
  positions: Array<IPosition>
  setPositions: React.Dispatch<React.SetStateAction<Array<IPosition>>>
}

const useSearchHandler = ({
  positions,
  setPositions,
}: IProps): ISearchHandler => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationFrom = (location.state as { from?: string } | null)?.from

  const [run, setRun] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const closeSearch = useCallback(() => {
    setSearchTerm('')
    setReset(true)
    setRun(false)
    setSelectedIndex(null)
    navigate(locationFrom || BASE_PATH)
  }, [navigate, locationFrom])

  const resetSearchTerm = useCallback(() => {
    setSearchTerm('')
    setReset(true)
    setRun(false)
  }, [])

  const onSelectSearchResult = useCallback(
    (searchResult: IPosition) => {
      setPositions((prev) => addPosition(prev, searchResult))
      closeSearch()
    },
    [setPositions, closeSearch]
  )

  const onSubmitSearch = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()

      // Set when the submit came from the field losing focus.
      const relatedTarget = (event as React.FocusEvent).relatedTarget as
        HTMLElement | null | undefined

      if (
        searchTerm &&
        !NON_SUBMITTING_REFS.includes(relatedTarget?.dataset?.ref ?? '')
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

  const url = useMemo(() => getSearchUrl(searchTerm), [searchTerm])

  const fetchedSearchResults = useFetch<
    Array<IPosition>,
    Array<ILocationIQPosition>
  >({
    url,
    run,
    reset,
    transformResponse: toPositions,
  })

  /** Without a search term the field lists previously visited places. */
  const searchResults: IQuery<ISearchResults> = useMemo(() => {
    if (searchTerm) {
      return {
        ...fetchedSearchResults,
        response: {
          type: 'searchResults',
          positions: fetchedSearchResults.response,
        },
      }
    }

    return {
      loading: false,
      error: null,
      finished: true,
      response: {
        type: 'history',
        // The first position is the one already being shown.
        positions: positions.slice(1).filter((position) => position.city),
      },
    }
  }, [searchTerm, fetchedSearchResults, positions])

  const resultPositions = useMemo(
    () => searchResults.response?.positions ?? [],
    [searchResults.response]
  )

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { length } = resultPositions

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (!length) {
          return
        }

        const step = event.key === 'ArrowUp' ? -1 : 1

        setSelectedIndex((prev) =>
          prev === null
            ? wrap(step === -1 ? length - 1 : 0, length)
            : wrap(prev + step, length)
        )
      } else if (event.key === 'Enter' && selectedIndex !== null) {
        const position = resultPositions[selectedIndex]

        if (position) {
          onSelectSearchResult(position)
        }
      } else if (event.key === 'Escape') {
        closeSearch()
      } else {
        setSelectedIndex(null)
      }
    },
    [resultPositions, selectedIndex, onSelectSearchResult, closeSearch]
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
      closeSearch,
      resetSearchTerm,
    }),
    [
      searchResults,
      searchTerm,
      selectedIndex,
      onSubmitSearch,
      onChangeSearchTerm,
      onSelectSearchResult,
      onKeyDown,
      closeSearch,
      resetSearchTerm,
    ]
  )
}

export default useSearchHandler
