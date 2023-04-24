import { useEffect } from 'react'
import { IApp } from 'utils/types'
import Loading from 'components/Loading'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Credit from 'components/Credit'
import ForecastNotReady from 'components/ForecastNotReady'
import { getAppState } from 'utils/app'
import Charts from './Charts'

interface IProps {
  app: IApp
}

export default function ChartsPage({ app }: IProps) {
  const appState = getAppState(app)

  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
  }, [])

  return (
    <main role="main">
      <Loading status={app.status} error={app.error} />
      <Header app={app} />
      <NavBar app={app} activeMenuItem="charts" key="charts" />
      {appState === 'show-forecast' ? (
        <Charts app={app} />
      ) : (
        <ForecastNotReady app={app} appState={appState} />
      )}
      <Credit />
    </main>
  )
}
