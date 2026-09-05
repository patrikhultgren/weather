import { useEffect } from 'react'
import useLatestRef from './useLatestRef'

const useCallOnEscape = (callback: () => void): void => {
  const callbackRef = useLatestRef(callback)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callbackRef.current()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [callbackRef])
}

export default useCallOnEscape
