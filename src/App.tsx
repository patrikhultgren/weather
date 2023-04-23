import WeatherPage from 'components/Pages/Weather'
import SearchPage from 'components/Pages/Search'
import { Route, Routes } from 'react-router-dom'
import useApp from 'hooks/useApp'

export default function App() {
  const app = useApp()

  return (
    <>
      <Routes>
        <Route path="search" element={<SearchPage app={app} />} />
        <Route path="*" element={<WeatherPage app={app} />} />
      </Routes>
    </>
  )
}
