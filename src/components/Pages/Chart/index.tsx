import { useEffect } from 'react'
import { IApp } from 'utils/types'
import Loading from 'components/Loading'

import Header from './Header'
import Forecast from './Forecast'
import Credit from './Credit'
import NavBar from './NavBar'

interface IProps {
  app: IApp
}

export default function ChartPage({ app }: IProps) {
  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
  }, [])

  return (
    <main role="main">
      <Loading status={app.status} error={app.error} />
      <Header app={app} />
      <NavBar app={app} />
      <Forecast app={app} />
      <Credit />
    </main>
  )
}
