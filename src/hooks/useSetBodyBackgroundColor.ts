import { useEffect } from 'react'

const useSetBodyBackgroundColor = (
  mountBackgroundColor: CSSStyleDeclaration['backgroundColor'],
  unmountBackgroundColor: CSSStyleDeclaration['backgroundColor']
) => {
  useEffect(() => {
    document.body.style.backgroundColor = mountBackgroundColor

    return () => {
      document.body.style.backgroundColor = unmountBackgroundColor
    }
  }, [mountBackgroundColor, unmountBackgroundColor])
}

export default useSetBodyBackgroundColor
