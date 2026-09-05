import isEqual from 'lodash/isEqual'
import {
  MAX_STORED_POSITIONS,
  POSITION_DECIMALS,
  POSITIONS_STORAGE_KEY,
} from 'config'
import { readJson, writeJson } from 'lib/storage'
import type { IPosition, PositionStatus } from 'types'

const positionStatuses: Array<PositionStatus> = [
  'foundBySearch',
  'foundByAllowingPosition',
  'empty',
]

const isPosition = (value: unknown): value is IPosition => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.latitude === 'number' &&
    typeof candidate.longitude === 'number' &&
    typeof candidate.city === 'string' &&
    positionStatuses.includes(candidate.status as PositionStatus)
  )
}

const round = (value: number) => parseFloat(value.toFixed(POSITION_DECIMALS))

export const roundPosition = (position: IPosition): IPosition => ({
  ...position,
  latitude: round(position.latitude),
  longitude: round(position.longitude),
})

export const isSamePlace = (a: IPosition, b: IPosition): boolean =>
  a.latitude === b.latitude && a.longitude === b.longitude

/**
 * Puts a position first in the history, dropping any entry for the same place
 * or the same city. Returns the original array when nothing changed so that
 * callers can rely on reference equality.
 */
export const addPosition = (
  positions: Array<IPosition>,
  position: IPosition
): Array<IPosition> => {
  const rounded = roundPosition(position)

  if (!rounded.city) {
    const knownCity = positions.find(
      (item) => isSamePlace(item, rounded) && item.city
    )?.city

    if (knownCity) {
      rounded.city = knownCity
    }
  }

  const result = [
    rounded,
    ...positions
      .filter((item) => !rounded.city || item.city !== rounded.city)
      .filter((item) => !isSamePlace(item, rounded)),
  ].slice(0, MAX_STORED_POSITIONS)

  return isEqual(positions, result) ? positions : result
}

export const readPositions = (): Array<IPosition> =>
  readJson<Array<unknown>>(POSITIONS_STORAGE_KEY, []).filter(isPosition)

/** Positions without a city are still being reverse geocoded; don't keep them. */
export const writePositions = (positions: Array<IPosition>): void =>
  writeJson(
    POSITIONS_STORAGE_KEY,
    positions.filter((position) => position.city)
  )
