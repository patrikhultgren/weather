import { describe, expect, it } from 'vitest'
import { capitalizeFirstLetter } from './string'

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter', () => {
    expect(capitalizeFirstLetter('onsdag')).toBe('Onsdag')
  })

  it('leaves an already capitalized string alone', () => {
    expect(capitalizeFirstLetter('Onsdag')).toBe('Onsdag')
  })

  it('handles an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('')
  })
})
