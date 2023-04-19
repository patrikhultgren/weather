import { useEffect } from 'react'
import { GEO_POSITION_STORAGE_KEY } from 'config'

const usePersistPosition = (position: any) => {
  useEffect(() => {
    if (position.latitude && position.longitude && position.city) {
      let result = []

      const data = localStorage.getItem(GEO_POSITION_STORAGE_KEY)

      if (data) {
        try {
          result = JSON.parse(data)
        } catch {}
      }

      if (
        !result.some(
          (item: any) =>
            item.latitude === position.latitude &&
            item.longitude === position.longitude
        )
      ) {
        result.unshift(position)
      }

      localStorage.setItem(GEO_POSITION_STORAGE_KEY, JSON.stringify(result))
    }
  }, [position])
}

export default usePersistPosition
