import { useCallback, useEffect } from 'react'

const useCallOnEscape = (callback: Function) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    },
    [callback]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false)

    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
    }
  }, [onKeyDown])
}

export default useCallOnEscape
