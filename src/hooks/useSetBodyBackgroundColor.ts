import { useEffect } from 'react'

const useSetBodyBackgroundColor = (
  mountBackgroundColor: string,
  unmountBackgroundColor: string
): void => {
  useEffect(() => {
    document.body.style.backgroundColor = mountBackgroundColor

    return () => {
      document.body.style.backgroundColor = unmountBackgroundColor
    }
  }, [mountBackgroundColor, unmountBackgroundColor])
}

export default useSetBodyBackgroundColor
