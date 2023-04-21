import { useEffect } from 'react'
import { POSITIONS_STORAGE_KEY } from 'config'

const usePersistPositions = (positions: Array<any>) => {
  useEffect(() => {
    if (positions.length) {
      localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions))
    }
  }, [positions])
}

export default usePersistPositions
