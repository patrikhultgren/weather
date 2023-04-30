import { useState, useEffect } from 'react'
import ChartsPage from 'pages/Charts'
import { Route, Routes } from 'react-router-dom'
import TablesPage from 'pages/Tables'
import SearchPage from 'pages/Search'
import useApp from 'hooks/app/useApp'

export default function App() {
  const app = useApp()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <div className={loading ? 'invisible' : 'block'}>
      <Routes>
        <Route path="weather/charts" element={<ChartsPage app={app} />} />
        <Route path="weather/search" element={<SearchPage app={app} />} />
        <Route path="*" element={<TablesPage app={app} />} />
      </Routes>
    </div>
  )
}
