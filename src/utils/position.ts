import {
  POSITIONS_STORAGE_KEY,
  MAX_AGE_OF_PREVIOUS_POSITION,
  MAX_SETTLED_SPEED,
  MIN_POSITION_UPDATE_DISTANCE,
  MIN_POSITION_UPDATE_INTERVAL,
} from 'config'
import isEqual from 'lodash/isEqual'
import { ICoordinates, IFix, IPosition } from 'utils/types'

const EARTH_RADIUS_IN_METERS = 6_371_000

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

export const distanceInMeters = (from: ICoordinates, to: ICoordinates) => {
  const deltaLatitude = toRadians(to.latitude - from.latitude)
  const deltaLongitude = toRadians(to.longitude - from.longitude)

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(deltaLongitude / 2) ** 2

  return 2 * EARTH_RADIUS_IN_METERS * Math.asin(Math.sqrt(a))
}

// The speed reported by the device is preferred, but it is missing on
// hardware without a GPS, so fall back to comparing with the previous fix.
export const speedInMetersPerSecond = (
  previousFix: IFix | null,
  fix: IFix,
  reportedSpeed: number | null
): number | null => {
  if (
    typeof reportedSpeed === 'number' &&
    Number.isFinite(reportedSpeed) &&
    reportedSpeed >= 0
  ) {
    return reportedSpeed
  }

  if (!previousFix) {
    return null
  }

  const elapsed = fix.time - previousFix.time

  if (elapsed <= 0 || elapsed > MAX_AGE_OF_PREVIOUS_POSITION) {
    return null
  }

  return distanceInMeters(previousFix, fix) / (elapsed / 1000)
}

interface IShouldUpdatePosition {
  fix: IFix
  currentPosition: ICoordinates
  lastUpdate: number
  speed: number | null
}

export const shouldUpdatePosition = ({
  fix,
  currentPosition,
  lastUpdate,
  speed,
}: IShouldUpdatePosition) => {
  if (fix.time - lastUpdate < MIN_POSITION_UPDATE_INTERVAL) {
    return false
  }

  if (speed !== null && speed > MAX_SETTLED_SPEED) {
    return false
  }

  return distanceInMeters(currentPosition, fix) >= MIN_POSITION_UPDATE_DISTANCE
}

export const getPositions = (): Array<IPosition> => {
  let result = []

  const data = localStorage.getItem(POSITIONS_STORAGE_KEY)

  if (data) {
    try {
      result = JSON.parse(data)
    } catch {}
  }

  return result
}

export const savePositions = (positions: Array<IPosition>) => {
  localStorage.setItem(
    POSITIONS_STORAGE_KEY,
    JSON.stringify(positions.filter((position) => position.city))
  )
}

export const addPosition = (
  positions: Array<IPosition>,
  position: IPosition
) => {
  const roundedPosition = {
    ...position,
    latitude: parseFloat(position.latitude.toFixed(2)),
    longitude: parseFloat(position.longitude.toFixed(2)),
  }

  if (!roundedPosition.city) {
    const otherPositionWithCity = positions.find(
      (item) =>
        item.latitude === roundedPosition.latitude &&
        item.longitude === roundedPosition.longitude &&
        item.city
    )

    if (otherPositionWithCity) {
      roundedPosition.city = otherPositionWithCity.city
    }
  }

  let result = positions
    .filter(
      (item) => !roundedPosition.city || item.city !== roundedPosition.city
    )
    .filter(
      (item) =>
        item.latitude !== roundedPosition.latitude &&
        item.longitude !== roundedPosition.longitude
    )
    .slice(0, 7)

  result.unshift(roundedPosition)

  if (isEqual(positions, result)) {
    return positions
  }

  return result
}
