import { useEffect } from 'react'
import type { IPosition } from 'types'
import { writePositions } from './positions'

const usePersistPositions = (positions: Array<IPosition>): void => {
  useEffect(() => {
    writePositions(positions)
  }, [positions])
}

export default usePersistPositions
