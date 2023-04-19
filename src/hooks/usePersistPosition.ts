import { useEffect } from 'react'
import { GEO_POSITION_STORAGE_KEY } from 'config'

const usePersistPosition = (position: any) => {
  useEffect(() => {
    if (position.latitude && position.longitude && position.city) {
      localStorage.setItem(
        GEO_POSITION_STORAGE_KEY,
        JSON.stringify({
          latitude: position.latitude,
          longitude: position.longitude,
          city: position.city,
        })
      )
    }
  }, [position])
}

export default usePersistPosition
