import { useMemo } from 'react'
import { ISearchHandler } from 'utils/types'
import Loading from 'common/Loading'
import ErrorBoundaryEveryChild from 'common/Error/BoundaryEveryChild'
import useCallOnEscape from 'hooks/useCallOnEscape'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'
import Search from './Search'

interface IProps {
  searchHandler: ISearchHandler
}

export default function Handler({ searchHandler }: IProps) {
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
        <Search searchHandler={searchHandler} />
      </ErrorBoundaryEveryChild>
    </main>
  )
}
