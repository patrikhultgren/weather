import { useEffect } from 'react'
import { POSITIONS_STORAGE_KEY } from 'config'
import { IPosition } from 'utils/types'

const usePersistPositions = (
  positionsAreLoaded: boolean,
  positions: Array<IPosition>
) => {
  useEffect(() => {
    if (positionsAreLoaded) {
      localStorage.setItem(POSITIONS_STORAGE_KEY, JSON.stringify(positions))
    }
  }, [positionsAreLoaded, positions])
}

export default usePersistPositions
