import { GEO_POSITION_STORAGE_KEY } from 'config'
import isEqual from 'lodash/isEqual'
import { IPosition } from 'utils/types'

export const getPositions = (): Array<IPosition> => {
  let result = []

  const data = localStorage.getItem(GEO_POSITION_STORAGE_KEY)

  if (data) {
    try {
      result = JSON.parse(data)
    } catch {}
  }

  return result
}

export const savePositions = (positions: Array<IPosition>) => {
  localStorage.setItem(GEO_POSITION_STORAGE_KEY, JSON.stringify(positions))
}

export const addPosition = (
  positions: Array<IPosition>,
  position: IPosition
) => {
  let result = positions
    .filter((item) => !position.city || item.city !== position.city)
    .filter(
      (item) =>
        item.latitude !== position.latitude &&
        item.longitude !== position.longitude
    )
    .slice(0, 7)

  result.unshift(position)

  if (isEqual(positions, result)) {
    return positions
  }

  return result
}
