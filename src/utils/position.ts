import { GEO_POSITION_STORAGE_KEY } from 'config'
import isEqual from 'lodash/isEqual'

export const getPositions = () => {
  let result = []

  const data = localStorage.getItem(GEO_POSITION_STORAGE_KEY)

  if (data) {
    try {
      result = JSON.parse(data)
    } catch {}
  }

  return result
}

export const savePositions = (positions: any) => {
  localStorage.setItem(GEO_POSITION_STORAGE_KEY, JSON.stringify(positions))
}

export const addPosition = (
  positions: Array<any>,
  latitude: number,
  longitude: number,
  city: string
) => {
  let result = positions.filter(
    (item: any) => item.latitude !== latitude && item.longitude !== longitude
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
