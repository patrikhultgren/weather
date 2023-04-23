import { useEffect } from 'react'
import Loading from 'components/Loading'

import Search from './Search'

interface IProps {
  weather: any
}

export default function SearchPage({ weather }: IProps) {
  useEffect(() => {
    document.body.style.backgroundColor = '#475569'
  }, [])

  return (
    <main role="main">
      <Loading status={weather.status} error={weather.error} />
      <Search weather={weather} />
    </main>
  )
}
