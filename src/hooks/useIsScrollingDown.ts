import { useEffect, useCallback, useState } from 'react'

const useIsScrollingDown = (): boolean => {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  const scrollHandler = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setIsScrollingDown(true)
    } else {
      setIsScrollingDown(false)
    }

    setLastScrollY(window.scrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [scrollHandler, lastScrollY])

  return isScrollingDown
}

export default useIsScrollingDown
