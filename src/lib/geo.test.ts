import { describe, expect, it } from 'vitest'
import {
  MAX_SETTLED_SPEED,
  MIN_POSITION_UPDATE_DISTANCE,
  MIN_POSITION_UPDATE_INTERVAL,
} from 'config'
import {
  distanceInMeters,
  shouldUpdatePosition,
  speedInMetersPerSecond,
} from './geo'

const stockholm = { latitude: 59.33, longitude: 18.07 }
const uppsala = { latitude: 59.86, longitude: 17.64 }
const NOW = 1_700_000_000_000

describe('distanceInMeters', () => {
  it('is zero for the same point', () => {
    expect(distanceInMeters(stockholm, stockholm)).toBe(0)
  })

  it('matches the known distance between two cities', () => {
    // Stockholm to Uppsala is roughly 64 km as the crow flies.
    expect(distanceInMeters(stockholm, uppsala) / 1000).toBeCloseTo(63.7, 1)
  })

  it('is symmetric', () => {
    expect(distanceInMeters(stockholm, uppsala)).toBeCloseTo(
      distanceInMeters(uppsala, stockholm),
      6
    )
  })

  it('handles crossing the antimeridian without going the long way round', () => {
    const west = { latitude: 0, longitude: 179.99 }
    const east = { latitude: 0, longitude: -179.99 }

    expect(distanceInMeters(west, east)).toBeLessThan(3000)
  })
})

describe('speedInMetersPerSecond', () => {
  const fix = { ...uppsala, time: NOW }

  it('prefers the speed reported by the device', () => {
    expect(speedInMetersPerSecond(null, fix, 12.5)).toBe(12.5)
  })

  it('accepts a reported speed of zero', () => {
    expect(speedInMetersPerSecond(null, fix, 0)).toBe(0)
  })

  it('is unknown when there is no reported speed and no previous fix', () => {
    expect(speedInMetersPerSecond(null, fix, null)).toBeNull()
  })

  it('derives the speed from the previous fix', () => {
    const previous = {
      ...uppsala,
      latitude: uppsala.latitude - 0.009,
      time: NOW - 100_000,
    }

    const speed = speedInMetersPerSecond(previous, fix, null)

    // ~1 km in 100 s.
    expect(speed).toBeCloseTo(10, 0)
  })

  it('ignores a stale previous fix, whose average would be meaningless', () => {
    const previous = { ...stockholm, time: NOW - 600_000 }

    expect(speedInMetersPerSecond(previous, fix, null)).toBeNull()
  })

  it('ignores a previous fix that is not older than the new one', () => {
    expect(
      speedInMetersPerSecond({ ...stockholm, time: NOW }, fix, null)
    ).toBeNull()
  })

  it('ignores a nonsensical reported speed', () => {
    expect(speedInMetersPerSecond(null, fix, -1)).toBeNull()
    expect(speedInMetersPerSecond(null, fix, NaN)).toBeNull()
  })
})

describe('shouldUpdatePosition', () => {
  const farAway = { ...uppsala, time: NOW }
  const base = { currentPosition: stockholm, lastUpdate: NOW - 180_000 }

  it('adopts a distant position once the user has stopped', () => {
    expect(shouldUpdatePosition({ ...base, fix: farAway, speed: 0.2 })).toBe(
      true
    )
  })

  it('adopts a distant position when the speed is unknown', () => {
    expect(shouldUpdatePosition({ ...base, fix: farAway, speed: null })).toBe(
      true
    )
  })

  it('leaves the position alone while travelling fast', () => {
    expect(
      shouldUpdatePosition({
        ...base,
        fix: farAway,
        speed: MAX_SETTLED_SPEED + 0.1,
      })
    ).toBe(false)
  })

  it('keeps the position for a short move within the same area', () => {
    const nearby = { latitude: 59.34, longitude: 18.08, time: NOW }

    expect(shouldUpdatePosition({ ...base, fix: nearby, speed: 0 })).toBe(false)
  })

  it('waits out the minimum interval even when far away and stopped', () => {
    expect(
      shouldUpdatePosition({
        currentPosition: stockholm,
        lastUpdate: NOW - (MIN_POSITION_UPDATE_INTERVAL - 1),
        fix: farAway,
        speed: 0,
      })
    ).toBe(false)
  })

  it('treats the distance threshold as inclusive', () => {
    // Roughly MIN_POSITION_UPDATE_DISTANCE north of Stockholm.
    const justFarEnough = {
      latitude:
        stockholm.latitude + MIN_POSITION_UPDATE_DISTANCE / 111_320 + 0.001,
      longitude: stockholm.longitude,
      time: NOW,
    }

    expect(
      shouldUpdatePosition({ ...base, fix: justFarEnough, speed: 0 })
    ).toBe(true)
  })
})
