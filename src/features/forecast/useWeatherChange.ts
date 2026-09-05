import { useMemo } from 'react'
import type { ITimeSerie, IWeatherChange } from 'types'
import { findWeatherChange } from './weatherChange'

interface IProps {
  days: Array<Array<ITimeSerie>> | null
}

const useWeatherChange = ({ days }: IProps): IWeatherChange | null =>
  useMemo(() => findWeatherChange(days), [days])

export default useWeatherChange
