import WeatherPage from 'components/WeatherPage'
import SearchPage from 'components/SearchPage'
import { Route, Routes } from 'react-router-dom'
import useWeather from 'hooks/useWeather'

export default function App() {
  const weather = useWeather()

  return (
    <>
      <Routes>
        <Route path="sok" element={<SearchPage weather={weather} />} />
        <Route path="*" element={<WeatherPage weather={weather} />} />
      </Routes>
    </>
  )
}
