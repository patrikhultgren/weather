import { useEffect } from 'react'
import Loading from 'components/Loading'

import Header from './Header'
import Forecast from './Forecast'
import Credit from './Credit'
import NavBar from './NavBar'

interface IProps {
  weather: any
}

export default function WeatherPage({ weather }: IProps) {
  useEffect(() => {
    document.body.style.backgroundColor = '#fff'
  }, [])

  return (
    <main role="main">
      <Loading status={weather.status} error={weather.error} />
      <Header weather={weather} />
      <NavBar weather={weather} />
      <Forecast weather={weather} />
      <Credit />
    </main>
  )
}
