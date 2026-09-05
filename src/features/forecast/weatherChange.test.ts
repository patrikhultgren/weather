import { describe, expect, it } from 'vitest'
import { findWeatherChange } from './weatherChange'
import { buildDay } from './testHelpers'

const fullDay = (date: string, options = {}) => buildDay(date, 24, options)

describe('findWeatherChange', () => {
  it('returns nothing without a forecast', () => {
    expect(findWeatherChange(null)).toBeNull()
  })

  it('returns nothing with only one day', () => {
    expect(findWeatherChange([fullDay('2023-04-05')])).toBeNull()
  })

  it('finds notable weather a few days ahead', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy' }),
      fullDay('2023-04-06', { symbolCode: 'cloudy' }),
      fullDay('2023-04-07', { symbolCode: 'heavysnow_day' }),
    ]

    expect(findWeatherChange(days)).toMatchObject({
      symbolCode: 'heavysnow_day',
      time: '2023-04-07T00:00:00Z',
    })
  })

  it('ignores weather the user already has today', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'heavysnow_day' }),
      fullDay('2023-04-06', { symbolCode: 'cloudy' }),
      fullDay('2023-04-07', { symbolCode: 'heavysnow_day' }),
    ]

    expect(findWeatherChange(days)).toBeNull()
  })

  it('ignores night symbols, which nobody is out in', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy' }),
      fullDay('2023-04-06', { symbolCode: 'cloudy' }),
      fullDay('2023-04-07', { symbolCode: 'heavysnow_night' }),
    ]

    expect(findWeatherChange(days)).toBeNull()
  })

  it('ignores a symbol that only occurs once in a day', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy' }),
      fullDay('2023-04-06', { symbolCode: 'cloudy' }),
      [
        ...buildDay('2023-04-07', 1, { symbolCode: 'heavysnow_day' }),
        ...buildDay('2023-04-07', 23, { symbolCode: 'cloudy' }),
      ],
    ]

    expect(findWeatherChange(days)).toBeNull()
  })

  it('looks no further than three days ahead', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy' }),
      fullDay('2023-04-06', { symbolCode: 'cloudy' }),
      fullDay('2023-04-07', { symbolCode: 'cloudy' }),
      fullDay('2023-04-08', { symbolCode: 'cloudy' }),
      fullDay('2023-04-09', { symbolCode: 'heavysnow_day' }),
    ]

    expect(findWeatherChange(days)).toBeNull()
  })

  it('treats tomorrow as the present when today has almost run out', () => {
    const days = [
      // Only three hours left of today, so tomorrow counts as current weather.
      buildDay('2023-04-05', 3, { symbolCode: 'cloudy' }),
      fullDay('2023-04-06', { symbolCode: 'heavysnow_day' }),
      fullDay('2023-04-07', { symbolCode: 'cloudy' }),
      fullDay('2023-04-08', { symbolCode: 'rain_day' }),
    ]

    expect(findWeatherChange(days)).toMatchObject({ symbolCode: 'rain_day' })
  })

  it('reports a crossing from freezing to above zero', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy', airTemperature: -4 }),
      fullDay('2023-04-06', { symbolCode: 'cloudy', airTemperature: -2 }),
      fullDay('2023-04-07', { symbolCode: 'clearsky_day', airTemperature: 6 }),
    ]

    expect(findWeatherChange(days)).toMatchObject({
      tempChange: 'minus-to-plus',
    })
  })

  it('reports a crossing from above zero to freezing', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy', airTemperature: 4 }),
      fullDay('2023-04-06', { symbolCode: 'cloudy', airTemperature: 2 }),
      fullDay('2023-04-07', {
        symbolCode: 'heavysnow_day',
        airTemperature: -6,
      }),
    ]

    expect(findWeatherChange(days)).toMatchObject({
      tempChange: 'plus-to-minus',
    })
  })

  it('reports no temperature change when both are on the same side of zero', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy', airTemperature: 4 }),
      fullDay('2023-04-06', { symbolCode: 'cloudy', airTemperature: 5 }),
      fullDay('2023-04-07', { symbolCode: 'rain_day', airTemperature: 6 }),
    ]

    expect(findWeatherChange(days)).toMatchObject({ tempChange: null })
  })

  it('picks the most frequent notable symbol of the day', () => {
    const days = [
      fullDay('2023-04-05', { symbolCode: 'cloudy' }),
      fullDay('2023-04-06', { symbolCode: 'cloudy' }),
      [
        ...buildDay('2023-04-07', 4, { symbolCode: 'lightrain_day' }),
        ...buildDay('2023-04-07', 12, { symbolCode: 'heavysnow_day' }),
      ],
    ]

    expect(findWeatherChange(days)).toMatchObject({
      symbolCode: 'heavysnow_day',
    })
  })
})
