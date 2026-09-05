import { useEffect } from 'react'
import useLatestRef from './useLatestRef'

/** Calls back on every visibilitychange without needing a stable callback. */
const useVisibilityChange = (onVisibilityChange: () => void): void => {
  const callbackRef = useLatestRef(onVisibilityChange)

  useEffect(() => {
    const listener = () => callbackRef.current()

    document.addEventListener('visibilitychange', listener)

    return () => document.removeEventListener('visibilitychange', listener)
  }, [callbackRef])
}

export default useVisibilityChange
