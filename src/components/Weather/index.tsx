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
      <Header weather={weather} />
      <SearchBar searchHandler={weather.searchHandler} />
      <Loading loading={weather.loading} error={weather.error} />
      <Forecast weather={weather} />
      <Credit />
    </>
  )
}
