import { useMemo } from 'react'

const useIsFullscreen = (): boolean =>
  useMemo(() => window.matchMedia('(display-mode: fullscreen)').matches, [])

export default useIsFullscreen
