import Loading from 'components/Loading'
import useWeather from 'hooks/useWeather'

import Header from './Header'
import Forecast from './Forecast'
import Credit from './Credit'
import SearchBar from './SearchBar'

export default function Weather() {
  const weather = useWeather()

  return (
    <>
      {!weather.searchHandler.active && <Header weather={weather} />}
      <Loading loading={weather.loading} error={weather.error} />
      {!weather.searchHandler.active && <Forecast weather={weather} />}
      {!weather.searchHandler.active && <Credit />}
      <SearchBar searchHandler={weather.searchHandler} />
    </>
  )
}
