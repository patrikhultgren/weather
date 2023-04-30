import { useCallback, useMemo, useId } from 'react'
import Close from 'components/Icon/Close'
import { ISearchHandler } from 'utils/types'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import NoSearchResults from './NoSearchResults'

interface IProps {
  searchHandler: ISearchHandler
}

export default function Search({ searchHandler }: IProps) {
  const searchResultsId = useId()

  const { response, finished } = searchHandler.searchResults

  const hasSearchResults = useMemo(
    () => Boolean(response?.positions?.length),
    [response]
  )

  const closeSearch = useCallback(() => {
    searchHandler.closeSearch()
  }, [searchHandler])

  return (
    <div className="px-4 max-w-[700px] mx-auto">
      <div className="flex mt-4">
        <SearchForm searchHandler={searchHandler} />
        <button
          onClick={closeSearch}
          type="button"
          data-ref="close-search"
          className="text-black z-10 right-0 w-14 ml-2 text-xl bg-slate-100 py-2.5 flex items-center justify-center"
        >
          <Close title="Stäng sök" />
        </button>
      </div>
      {hasSearchResults && (
        <SearchResults
          searchHandler={searchHandler}
          searchResultsId={searchResultsId}
        />
      )}
      {!hasSearchResults && finished && response?.type === 'searchResults' && (
        <NoSearchResults searchResultsId={searchResultsId} />
      )}
    </div>
  )
}
