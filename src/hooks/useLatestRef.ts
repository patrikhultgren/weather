import { useEffect, useRef, type RefObject } from 'react'

/**
 * Keeps a mutable ref pointing at the latest value, so long lived listeners can
 * call the current callback without being torn down and re-registered. The ref
 * is updated in an effect rather than during render, which React requires.
 */
const useLatestRef = <TValue>(value: TValue): RefObject<TValue> => {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export default useLatestRef
