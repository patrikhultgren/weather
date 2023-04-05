import Loading from 'components/Loading'
import useWeather from 'hooks/useWeather'

import Header from './Header'
import Forecast from './Forecast'
import Credit from './Credit'

export default function Weather() {
  const weather = useWeather()

  return (
    <main>
      <Loading loading={weather.loading} error={weather.error} />
      <Header weather={weather} />
      <Forecast weather={weather} />
      <Credit />
    </main>
  )
}
