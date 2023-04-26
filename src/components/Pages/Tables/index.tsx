import { IApp } from 'utils/types'
import Error from 'components/Error'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ForecastNotReady from 'components/ForecastNotReady'
import ErrorBoundaryEveryChild from 'components/ErrorBoundaryEveryChild'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'
import { getActiveAction } from 'utils/app'
import Forecast from './Forecast'

const ACTIVE_MENU_ITEM = 'tables'

interface IProps {
  app: IApp
}

export default function TablesPage({ app }: IProps) {
  const activeAction = getActiveAction(app)

  useSetBodyBackgroundColor('#fff')

  return (
    <>
      <main role="main">
        <ErrorBoundaryEveryChild>
          {app.error && <Error error={app.error} />}
          <Header app={app} />
          <NavBar app={app} activeMenuItem={ACTIVE_MENU_ITEM} />
          {activeAction === 'show-forecast' ? (
            <Forecast app={app} />
          ) : (
            <ForecastNotReady
              app={app}
              activeAction={activeAction}
              activeMenuItem={ACTIVE_MENU_ITEM}
            />
          )}
        </ErrorBoundaryEveryChild>
      </main>
      <Footer />
    </>
  )
}
