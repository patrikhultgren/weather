import { useMemo } from 'react'
import { IApp } from 'utils/types'
import Loading from 'components/Loading'
import ErrorBoundaryEveryChild from 'components/ErrorBoundaryEveryChild'
import useCallOnEscape from 'hooks/useCallOnEscape'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'
import useSearchHandler from 'hooks/useSearchHandler'
import { StatusError } from 'utils/request'

import Search from './Search'

interface IProps {
  app: IApp
}

export default function SearchPage({ app }: IProps) {
  const searchHandler = useSearchHandler(app.positions, app.setPositions)

  useCallOnEscape(searchHandler.closeSearch)
  useSetBodyBackgroundColor('#475569')

  const searchResultsError = searchHandler.searchResults.error

  const error = useMemo(
    () => (searchResultsError?.status === 404 ? null : searchResultsError),
    [searchResultsError]
  )

  return (
    <main role="main">
      <ErrorBoundaryEveryChild>
        <Loading loading={searchHandler.searchResults.loading} error={error} />
        <Search searchHandler={searchHandler} />
      </ErrorBoundaryEveryChild>
    </main>
  )
}
