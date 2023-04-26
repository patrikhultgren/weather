import { IApp } from 'utils/types'
import Loading from 'components/Loading'
import ErrorBoundaryEveryChild from 'components/ErrorBoundaryEveryChild'
import useCallOnEscape from 'hooks/useCallOnEscape'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'

import Search from './Search'

interface IProps {
  app: IApp
}

export default function SearchPage({ app }: IProps) {
  useCallOnEscape(app.searchHandler.closeSearch)
  useSetBodyBackgroundColor('#475569')

  return (
    <main role="main">
      <ErrorBoundaryEveryChild>
        <Loading loading={app.status.loading} error={app.error} />
        <Search app={app} />
      </ErrorBoundaryEveryChild>
    </main>
  )
}
