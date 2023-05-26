import { ITimeSerie } from './types'

export const getSymbolCode = (hour: ITimeSerie): string =>
  hour.data.next_1_hours?.summary?.symbol_code ||
  hour.data?.next_6_hours?.summary?.symbol_code ||
  ''

export const getAirTemperature = (hour: ITimeSerie): number =>
  hour.data.instant.details.air_temperature
