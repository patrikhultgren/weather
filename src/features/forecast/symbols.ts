import type { SymbolCode } from 'react-yr-weather-icons'
import type { ITimeSerie } from 'types'

/** The Yr symbol for an hour, or '' when the forecast reaches too far ahead. */
export const getSymbolCode = (hour: ITimeSerie): SymbolCode | '' =>
  hour.data.next_1_hours?.summary?.symbol_code ??
  hour.data.next_6_hours?.summary?.symbol_code ??
  ''

export const getAirTemperature = (hour: ITimeSerie): number =>
  hour.data.instant.details.air_temperature
