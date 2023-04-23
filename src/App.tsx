import ChartsPage from 'components/Pages/Charts'
import TablesPage from 'components/Pages/Tables'
import SearchPage from 'components/Pages/Search'
import { Route, Routes } from 'react-router-dom'
import useApp from 'hooks/useApp'

export default function App() {
  const app = useApp()

  return (
    <>
      <Routes>
        <Route path="chart" element={<ChartsPage app={app} />} />
        <Route path="search" element={<SearchPage app={app} />} />
        <Route path="*" element={<TablesPage app={app} />} />
      </Routes>
    </>
  )
}
