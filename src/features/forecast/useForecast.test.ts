import { describe, expect, it } from 'vitest'
import type { IForecast } from 'types'
import { groupByDay } from './useForecast'
import { buildHour } from './testHelpers'

const forecast = (times: Array<string>): IForecast =>
  ({
    properties: {
      meta: { updated_at: '2023-04-05T06:00:00Z' },
      timeseries: times.map((time) => buildHour({ time })),
    },
  }) as unknown as IForecast

describe('groupByDay', () => {
  it('groups the hourly series into one array per local day', () => {
    const result = groupByDay(
      forecast([
        '2023-04-05T22:00:00Z',
        '2023-04-05T23:00:00Z',
        '2023-04-06T00:00:00Z',
      ]),
      'sv'
    )

    expect(result.timeseries.map((day) => day.length)).toEqual([2, 1])
  })

  it('keeps the days in chronological order', () => {
    const result = groupByDay(
      forecast([
        '2023-04-05T10:00:00Z',
        '2023-04-06T10:00:00Z',
        '2023-04-07T10:00:00Z',
      ]),
      'sv'
    )

    expect(result.timeseries.map((day) => day[0].time)).toEqual([
      '2023-04-05T10:00:00Z',
      '2023-04-06T10:00:00Z',
      '2023-04-07T10:00:00Z',
    ])
  })

  it('carries the updated_at through', () => {
    expect(
      groupByDay(forecast(['2023-04-05T10:00:00Z']), 'sv').updated_at
    ).toBe('2023-04-05T06:00:00Z')
  })

  it('handles an empty forecast', () => {
    expect(groupByDay(forecast([]), 'sv').timeseries).toEqual([])
  })
})
