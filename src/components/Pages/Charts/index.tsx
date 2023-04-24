import { useEffect } from 'react'
import { IApp } from 'utils/types'
import Loading from 'components/Loading'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Credit from 'components/Credit'

import Charts from './Charts'

interface IProps {
  app: IApp
}

export default function ChartsPage({ app }: IProps) {
  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
  }, [])

  return (
    <main role="main">
      <Loading status={app.status} error={app.error} />
      <Header app={app} />
      <NavBar app={app} />
      <Charts app={app} />
      <Credit />
    </main>
  )
}
