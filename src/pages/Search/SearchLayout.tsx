import { useMemo } from 'react'
import { ISearchHandler } from 'types'
import Loading from 'components/Loading'
import ErrorBoundaryEveryChild from 'components/Error/BoundaryEveryChild'
import useCallOnEscape from 'hooks/useCallOnEscape'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'
import SearchPanel from './SearchPanel'

export interface IProps {
  searchHandler: ISearchHandler
}

export default function SearchLayout({ searchHandler }: IProps) {
  useSetBodyBackgroundColor('#475569', '#fff')
  useCallOnEscape(searchHandler.closeSearch)

  const searchResultsError = searchHandler.searchResults.error

  const error = useMemo(
    () => (searchResultsError?.status === 404 ? null : searchResultsError),
    [searchResultsError]
  )

  return (
    <main>
      <ErrorBoundaryEveryChild>
        <Loading loading={searchHandler.searchResults.loading} error={error} />
        <SearchPanel searchHandler={searchHandler} />
      </ErrorBoundaryEveryChild>
    </main>
  )
}
