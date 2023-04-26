import { POSITIONS_STORAGE_KEY } from 'config'
import isEqual from 'lodash/isEqual'
import { IPosition } from 'utils/types'

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
