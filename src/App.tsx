import ChartsPage from 'components/Pages/Charts'
import TablesPage from 'components/Pages/Tables'
import SearchPage from 'components/Pages/Search'
import { Route, Routes } from 'react-router-dom'
import useApp from 'hooks/useApp'

export default function App() {
  const app = useApp()

  return (
    <Routes>
      <Route path="weather/charts" element={<ChartsPage app={app} />} />
      <Route path="weather/search" element={<SearchPage app={app} />} />
      <Route path="*" element={<TablesPage app={app} />} />
    </Routes>
  )
}
