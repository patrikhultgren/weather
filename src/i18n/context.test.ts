import { describe, expect, it } from 'vitest'
import { getBrowserLanguage, interpolate } from './context'

describe('getBrowserLanguage', () => {
  it('picks a supported language', () => {
    expect(getBrowserLanguage('sv-SE')).toBe('sv')
    expect(getBrowserLanguage('es')).toBe('es')
  })

  it('falls back to english for anything else', () => {
    expect(getBrowserLanguage('de-DE')).toBe('en')
    expect(getBrowserLanguage('')).toBe('en')
  })
})

describe('interpolate', () => {
  it('returns the template untouched without params', () => {
    expect(interpolate('Wind direction {degrees} degrees')).toBe(
      'Wind direction {degrees} degrees'
    )
  })

  it('fills in the placeholders', () => {
    expect(
      interpolate('Wind direction {degrees} degrees', { degrees: 11 })
    ).toBe('Wind direction 11 degrees')
  })

  it('leaves unknown placeholders in place', () => {
    expect(interpolate('{a} and {b}', { a: 1 })).toBe('1 and {b}')
  })
})
