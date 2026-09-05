import { describe, expect, it } from 'vitest'
import { format } from './date'

const time = '2023-04-05T07:00:00Z'

describe('format', () => {
  it('formats a date in the requested language', () => {
    expect(format(time, 'EEEE', 'en')).toBe('Wednesday')
    expect(format(time, 'EEEE', 'sv')).toBe('onsdag')
    expect(format(time, 'EEEE', 'es')).toBe('miércoles')
  })

  it('formats the day key used to group the forecast', () => {
    expect(format(time, 'yyyy-MM-dd', 'en')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('returns an empty string for input that is not a date', () => {
    expect(format('not a date', 'EEEE', 'en')).toBe('')
    expect(format('', 'EEEE', 'en')).toBe('')
  })
})
