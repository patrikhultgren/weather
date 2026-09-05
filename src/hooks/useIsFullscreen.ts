import { useEffect, useState } from 'react'

const QUERY = '(display-mode: fullscreen)'

const useIsFullscreen = (): boolean => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    () => window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)
    const update = (event: MediaQueryListEvent) =>
      setIsFullscreen(event.matches)

    mediaQuery.addEventListener('change', update)

    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  return isFullscreen
}

export default useIsFullscreen
