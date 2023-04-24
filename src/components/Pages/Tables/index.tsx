import { useEffect } from 'react'
import { IApp } from 'utils/types'
import Loading from 'components/Loading'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Credit from 'components/Credit'
import ForecastNotReady from 'components/ForecastNotReady'
import { getAppState } from 'utils/app'
import Forecast from './Forecast'

interface IProps {
  app: IApp
}

export default function TablesPage({ app }: IProps) {
  const appState = getAppState(app)

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
  }, [])

  return (
    <main role="main">
      <Loading status={app.status} error={app.error} />
      <Header app={app} />
      <NavBar app={app} activeMenuItem="tables" />
      {appState === 'show-forecast' ? (
        <Forecast app={app} />
      ) : (
        <ForecastNotReady app={app} appState={appState} />
      )}
      <Credit />
    </main>
  )
}
