import { useEffect } from 'react'

const useSetBodyBackgroundColor = (
  backgroundColor: CSSStyleDeclaration['backgroundColor']
) => {
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [])
}

export default useSetBodyBackgroundColor
