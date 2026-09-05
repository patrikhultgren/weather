import { describe, expect, it, vi } from 'vitest'
import { MAX_STORED_POSITIONS, POSITIONS_STORAGE_KEY } from 'config'
import type { IPosition } from 'types'
import {
  addPosition,
  isSamePlace,
  readPositions,
  roundPosition,
  writePositions,
} from './positions'

const position = (overrides: Partial<IPosition> = {}): IPosition => ({
  latitude: 59.33,
  longitude: 18.07,
  city: 'Stockholm',
  status: 'foundBySearch',
  ...overrides,
})

describe('roundPosition', () => {
  it('rounds the coordinates to two decimals', () => {
    expect(
      roundPosition(position({ latitude: 59.3251172, longitude: 18.0710935 }))
    ).toMatchObject({ latitude: 59.33, longitude: 18.07 })
  })
})

describe('addPosition', () => {
  it('puts the new position first', () => {
    const existing = [
      position({ city: 'Uppsala', latitude: 59.86, longitude: 17.64 }),
    ]

    const result = addPosition(existing, position())

    expect(result).toHaveLength(2)
    expect(result[0].city).toBe('Stockholm')
  })

  it('moves a place already in the list back to the front', () => {
    const stockholm = position()
    const uppsala = position({
      city: 'Uppsala',
      latitude: 59.86,
      longitude: 17.64,
    })

    const result = addPosition([uppsala, stockholm], stockholm)

    expect(result.map((item) => item.city)).toEqual(['Stockholm', 'Uppsala'])
  })

  it('keeps a place that shares only its latitude with the new one', () => {
    const sameLatitude = position({
      city: 'Elsewhere on the same parallel',
      latitude: 59.33,
      longitude: -7.5,
    })

    const result = addPosition([sameLatitude], position())

    expect(result.map((item) => item.city)).toEqual([
      'Stockholm',
      'Elsewhere on the same parallel',
    ])
  })

  it('keeps a place that shares only its longitude with the new one', () => {
    const sameLongitude = position({
      city: 'Elsewhere on the same meridian',
      latitude: 12.5,
      longitude: 18.07,
    })

    const result = addPosition([sameLongitude], position())

    expect(result).toHaveLength(2)
  })

  it('takes the city from a known position when the new one has none', () => {
    const known = position()

    const result = addPosition(
      [known],
      position({ city: '', status: 'foundByAllowingPosition' })
    )

    expect(result[0]).toMatchObject({
      city: 'Stockholm',
      status: 'foundByAllowingPosition',
    })
    expect(result).toHaveLength(1)
  })

  it('drops an older entry for the same city at different coordinates', () => {
    const old = position({ latitude: 10, longitude: 10 })

    const result = addPosition([old], position())

    expect(result).toHaveLength(1)
    expect(result[0].latitude).toBe(59.33)
  })

  it('caps the history', () => {
    const many = Array.from({ length: MAX_STORED_POSITIONS + 4 }, (_, index) =>
      position({ city: `City ${index}`, latitude: index, longitude: index })
    )

    expect(addPosition(many, position())).toHaveLength(MAX_STORED_POSITIONS)
  })

  it('returns the same array when nothing changed, so renders can bail out', () => {
    const existing = [position()]

    expect(addPosition(existing, position())).toBe(existing)
  })
})

describe('isSamePlace', () => {
  it('compares coordinates only', () => {
    expect(isSamePlace(position(), position({ city: 'Renamed' }))).toBe(true)
    expect(isSamePlace(position(), position({ latitude: 1 }))).toBe(false)
  })
})

describe('readPositions', () => {
  it('returns an empty list when nothing is stored', () => {
    expect(readPositions()).toEqual([])
  })

  it('returns an empty list for unparseable data instead of throwing', () => {
    localStorage.setItem(POSITIONS_STORAGE_KEY, '{ not json')

    expect(readPositions()).toEqual([])
  })

  it('drops entries that are not positions', () => {
    localStorage.setItem(
      POSITIONS_STORAGE_KEY,
      JSON.stringify([position(), { latitude: 'nope' }, null, 42])
    )

    expect(readPositions()).toEqual([position()])
  })
})

describe('writePositions', () => {
  it('does not persist positions that are still being reverse geocoded', () => {
    writePositions([
      position(),
      position({ city: '', latitude: 1, longitude: 1 }),
    ])

    expect(readPositions()).toEqual([position()])
  })

  it('survives storage being unavailable', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(() => writePositions([position()])).not.toThrow()
  })
})
