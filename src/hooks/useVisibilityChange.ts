import { useEffect } from 'react'

const useVisibilityChange = (onVisibilityChange: any) => {
  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [onVisibilityChange])
}

export default useVisibilityChange
