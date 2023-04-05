import Loading from 'components/Loading'
import useWeather from 'hooks/useWeather'

import Header from './Header'
import Forecast from './Forecast'
import Credit from './Credit'

export default function Weather() {
  const weather = useWeather()

  return (
    <>
      <Header weather={weather} />
      <Loading loading={weather.loading} error={weather.error} />
      <Forecast weather={weather} />
      <Credit />
    </>
  )
}
