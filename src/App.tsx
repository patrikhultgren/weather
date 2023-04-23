import ChartPage from 'components/Pages/Chart'
import WeatherPage from 'components/Pages/Weather'
import SearchPage from 'components/Pages/Search'
import { Route, Routes } from 'react-router-dom'
import useApp from 'hooks/useApp'

export default function App() {
  const app = useApp()

  return (
    <>
      <Routes>
        <Route path="chart" element={<ChartPage app={app} />} />
        <Route path="search" element={<SearchPage app={app} />} />
        <Route path="*" element={<WeatherPage app={app} />} />
      </Routes>
    </>
  )
}
