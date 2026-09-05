import { Route, Routes } from 'react-router-dom'
import SearchPage from 'pages/Search/SearchPage'
import TablesPage from 'pages/Tables/TablesPage'
import useApp from './useApp'

export default function App() {
  const app = useApp()

  return (
    <Routes>
      <Route path="weather/search" element={<SearchPage app={app} />} />
      <Route path="*" element={<TablesPage app={app} />} />
    </Routes>
  )
}
