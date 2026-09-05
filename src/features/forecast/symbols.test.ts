import { describe, expect, it } from 'vitest'
import { getAirTemperature, getSymbolCode } from './symbols'
import { buildHour } from './testHelpers'

describe('getSymbolCode', () => {
  it('prefers the next hour', () => {
    expect(getSymbolCode(buildHour({ time: 't', symbolCode: 'rain' }))).toBe(
      'rain'
    )
  })

  it('falls back to the six hour summary further ahead', () => {
    const hour = buildHour({
      time: 't',
      symbolCode: 'snow',
      useSixHourSymbol: true,
    })

    expect(getSymbolCode(hour)).toBe('snow')
  })

  it('is empty when the forecast reaches past both summaries', () => {
    expect(getSymbolCode(buildHour({ time: 't', noSymbol: true }))).toBe('')
  })
})

describe('getAirTemperature', () => {
  it('reads the instant temperature', () => {
    expect(
      getAirTemperature(buildHour({ time: 't', airTemperature: -3.4 }))
    ).toBe(-3.4)
  })
})
