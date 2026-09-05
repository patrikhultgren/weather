import {
  MAX_AGE_OF_PREVIOUS_FIX,
  MAX_SETTLED_SPEED,
  MIN_POSITION_UPDATE_DISTANCE,
  MIN_POSITION_UPDATE_INTERVAL,
} from 'config'
import type { ICoordinates, IFix } from 'types'

const EARTH_RADIUS_IN_METERS = 6_371_000

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

export const distanceInMeters = (
  from: ICoordinates,
  to: ICoordinates
): number => {
  const deltaLatitude = toRadians(to.latitude - from.latitude)
  const deltaLongitude = toRadians(to.longitude - from.longitude)

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(deltaLongitude / 2) ** 2

  return 2 * EARTH_RADIUS_IN_METERS * Math.asin(Math.sqrt(a))
}

/**
 * The speed reported by the device is preferred, but it is missing on hardware
 * without a GPS, so fall back to comparing with the previous fix. Returns null
 * when the speed is unknown.
 */
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

  if (elapsed <= 0 || elapsed > MAX_AGE_OF_PREVIOUS_FIX) {
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

/**
 * A fix is only adopted once the user has settled somewhere else: far enough
 * from the tracked position, slow enough not to be travelling, and not too
 * soon after the previous update.
 */
export const shouldUpdatePosition = ({
  fix,
  currentPosition,
  lastUpdate,
  speed,
}: IShouldUpdatePosition): boolean => {
  if (fix.time - lastUpdate < MIN_POSITION_UPDATE_INTERVAL) {
    return false
  }

  if (speed !== null && speed > MAX_SETTLED_SPEED) {
    return false
  }

  return distanceInMeters(currentPosition, fix) >= MIN_POSITION_UPDATE_DISTANCE
}
