import { useEffect } from 'react'
import { IApp } from 'utils/types'
import Loading from 'components/Loading'

import Search from './Search'

interface IProps {
  app: IApp
}

export default function SearchPage({ app }: IProps) {
  useEffect(() => {
    document.body.style.backgroundColor = '#475569'
  }, [])

  return (
    <main role="main">
      <Loading status={app.status} error={app.error} />
      <Search app={app} />
    </main>
  )
}
