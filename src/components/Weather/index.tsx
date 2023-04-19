import Loading from 'components/Loading'
import useWeather from 'hooks/useWeather'

import Header from './Header'
import Forecast from './Forecast'
import Credit from './Credit'
import Search from './Search'

export default function Weather() {
  const weather = useWeather()

  return (
    <>
      <Loading status={weather.status} error={weather.error} />
      {!weather.searchHandler.active && <Header weather={weather} />}
      {!weather.searchHandler.active && <Forecast weather={weather} />}
      {!weather.searchHandler.active && <Credit />}
      <Search searchHandler={weather.searchHandler} />
    </>
  )
}
