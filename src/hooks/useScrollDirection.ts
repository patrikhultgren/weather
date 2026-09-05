import { useEffect, useState } from 'react'

export type ScrollDirection = 'up' | 'down'

/** Reports which way the page was last scrolled, throttled to a frame. */
const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up')

  useEffect(() => {
    let previousScrollY = window.scrollY
    let frameRequested = false

    const update = () => {
      const scrollY = window.scrollY

      if (scrollY !== previousScrollY) {
        setScrollDirection(scrollY > previousScrollY ? 'down' : 'up')
        previousScrollY = Math.max(scrollY, 0)
      }

      frameRequested = false
    }

    const onScroll = () => {
      if (!frameRequested) {
        frameRequested = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollDirection
}

export default useScrollDirection
