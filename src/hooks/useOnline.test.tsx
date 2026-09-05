import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import useOnline from './useOnline'

const setOnLine = (value: boolean) => {
  Object.defineProperty(navigator, 'onLine', {
    value,
    configurable: true,
  })
}

afterEach(() => {
  setOnLine(true)
  vi.restoreAllMocks()
})

describe('useOnline', () => {
  it('starts from the current connection state', () => {
    setOnLine(false)

    expect(renderHook(() => useOnline()).result.current).toBe(false)
  })

  it('reacts to going offline and back online', () => {
    const { result } = renderHook(() => useOnline())

    expect(result.current).toBe(true)

    act(() => {
      setOnLine(false)
      window.dispatchEvent(new Event('offline'))
    })

    expect(result.current).toBe(false)

    act(() => {
      setOnLine(true)
      window.dispatchEvent(new Event('online'))
    })

    expect(result.current).toBe(true)
  })

  it('stops listening when it unmounts', () => {
    const removeEventListener = vi.spyOn(window, 'removeEventListener')

    renderHook(() => useOnline()).unmount()

    expect(removeEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    )
  })
})
