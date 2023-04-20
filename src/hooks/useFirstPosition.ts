import { useMemo } from 'react'
import { IPosition } from 'utils/types'

const useFirstPosition = (positions: Array<IPosition>): IPosition =>
  useMemo(() => {
    if (positions.length) {
      return positions[0]
    }

    return { latitude: 0, longitude: 0, city: '' }
  }, [positions])

export default useFirstPosition
