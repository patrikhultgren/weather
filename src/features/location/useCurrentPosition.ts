import { useMemo } from 'react'
import type { IPosition } from 'types'

export const emptyPosition: IPosition = {
  latitude: 0,
  longitude: 0,
  city: '',
  status: 'empty',
}

/** The position the app is currently showing the forecast for. */
const useCurrentPosition = (positions: Array<IPosition>): IPosition =>
  useMemo(() => positions[0] ?? emptyPosition, [positions])

export default useCurrentPosition
