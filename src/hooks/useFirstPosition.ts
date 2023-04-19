import { useMemo } from 'react'

const useFirstPosition = (positions: any) =>
  useMemo(() => {
    if (positions.length) {
      return positions[0]
    }

    return { latitude: null, longitude: null, city: null }
  }, [positions])

export default useFirstPosition
