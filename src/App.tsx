import { useState, useEffect } from 'react'
import ChartsPage from 'components/Pages/Charts'
import { Route, Routes } from 'react-router-dom'
import TablesPage from 'components/Pages/Tables'
import SearchPage from 'components/Pages/Search'
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
