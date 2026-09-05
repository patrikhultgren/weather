import { useState } from 'react'

/**
 * Calls `onChange` during render when `value` changes. This is React's
 * documented way of resetting state in response to a prop, and it avoids the
 * extra render an effect would cost.
 */
const useOnValueChange = <TValue>(
  value: TValue,
  onChange: (value: TValue, previous: TValue) => void
): void => {
  const [previous, setPrevious] = useState(value)

  if (!Object.is(previous, value)) {
    setPrevious(value)
    onChange(value, previous)
  }
}

export default useOnValueChange
