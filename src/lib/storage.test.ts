import { describe, expect, it, vi } from 'vitest'
import { readJson, writeJson } from './storage'

describe('readJson', () => {
  it('returns the fallback when the key is missing', () => {
    expect(readJson('missing', 'fallback')).toBe('fallback')
  })

  it('round trips a value', () => {
    writeJson('key', { a: 1 })

    expect(readJson('key', null)).toEqual({ a: 1 })
  })

  it('returns the fallback for unparseable data', () => {
    localStorage.setItem('key', 'not json')

    expect(readJson('key', 'fallback')).toBe('fallback')
  })

  it('returns the fallback when storage throws', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })

    expect(readJson('key', 'fallback')).toBe('fallback')
  })
})

describe('writeJson', () => {
  it('swallows storage errors so the app keeps working', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => writeJson('key', { a: 1 })).not.toThrow()
  })
})
