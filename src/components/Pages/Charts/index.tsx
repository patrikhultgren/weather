import { IApp } from 'utils/types'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Error from 'components/Error'
import ForecastNotReady from 'components/ForecastNotReady'
import ErrorBoundaryEveryChild from 'components/ErrorBoundaryEveryChild'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'
import { getAppState } from 'utils/app'
import Charts from './Charts'

const ACTIVE_MENU_ITEM = 'charts'

interface IProps {
  app: IApp
}

export default function ChartsPage({ app }: IProps) {
  const appState = getAppState(app)

  useSetBodyBackgroundColor('#fff')

  return (
    <>
      <main role="main">
        <ErrorBoundaryEveryChild>
          {app.error && <Error error={app.error} />}
          <Header app={app} />
          <NavBar app={app} activeMenuItem={ACTIVE_MENU_ITEM} />
          {appState === 'show-forecast' ? (
            <Charts app={app} />
          ) : (
            <ForecastNotReady
              app={app}
              appState={appState}
              activeMenuItem={ACTIVE_MENU_ITEM}
            />
          )}
        </ErrorBoundaryEveryChild>
      </main>
      <Footer />
    </>
  )
}
