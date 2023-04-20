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
  latitude: number,
  longitude: number,
  city: string
) => {
  let result = positions.filter(
    (position) =>
      position.latitude !== latitude && position.longitude !== longitude
  )

  result.unshift({
    latitude,
    longitude,
    city,
  })

  if (isEqual(positions, result)) {
    return positions
  }

  return result
}
