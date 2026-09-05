import type { SymbolCode } from 'react-yr-weather-icons'
import type { ITimeSerie, IWeatherChange, TempChange } from 'types'
import { getAirTemperature, getSymbolCode } from './symbols'

/** Weather worth warning about, most significant first. */
const NOTABLE_SYMBOLS = ['thunder', 'snow', 'sleet', 'rain', 'clearsky']

/** How many days ahead to look for a change. */
const DAYS_AHEAD = 3

/** An hour only counts if the symbol appears more than once that day. */
const MIN_OCCURRENCES = 2

const countSymbols = (day: Array<ITimeSerie>): Map<string, number> => {
  const counts = new Map<string, number>()

  for (const hour of day) {
    const symbolCode = getSymbolCode(hour)
    counts.set(symbolCode, (counts.get(symbolCode) ?? 0) + 1)
  }

  return counts
}

/**
 * The most common daytime symbol of the day that is both notable and not
 * already part of the current weather.
 */
const findNotableSymbol = (
  day: Array<ITimeSerie>,
  notableSymbols: Array<string>
): string | null => {
  const byFrequency = [...countSymbols(day).entries()].sort(
    ([, a], [, b]) => b - a
  )

  for (const [symbolCode, count] of byFrequency) {
    if (count < MIN_OCCURRENCES || !symbolCode.includes('_day')) {
      continue
    }

    if (notableSymbols.some((notable) => symbolCode.includes(notable))) {
      return symbolCode
    }
  }

  return null
}

const getTempChange = (from: ITimeSerie, to: ITimeSerie): TempChange | null => {
  const fromTemp = getAirTemperature(from)
  const toTemp = getAirTemperature(to)

  if (fromTemp < 0 && toTemp > 0) {
    return 'minus-to-plus'
  }

  if (fromTemp > 0 && toTemp < 0) {
    return 'plus-to-minus'
  }

  return null
}

/**
 * Looks a few days ahead for weather that differs from what the user already
 * has, so the app can point it out. Returns null when nothing stands out.
 */
export const findWeatherChange = (
  days: Array<Array<ITimeSerie>> | null
): IWeatherChange | null => {
  if (!days || days.length < 2) {
    return null
  }

  const [today, tomorrow] = days

  // A day that has almost run out says little about the current weather, so
  // tomorrow is treated as the present and the search starts a day later.
  const offset = today.length < 4 ? 1 : 0

  const currentSymbols = [
    ...today.map(getSymbolCode),
    ...(offset ? tomorrow.map(getSymbolCode) : []),
  ]

  const notableSymbols = NOTABLE_SYMBOLS.filter(
    (notable) => !currentSymbols.some((current) => current.includes(notable))
  )

  const daysAhead = days.slice(offset + 1, offset + 1 + DAYS_AHEAD)

  for (const day of daysAhead) {
    const symbolCode = findNotableSymbol(day, notableSymbols)

    if (!symbolCode) {
      continue
    }

    const hour = day.find(
      (candidate) => getSymbolCode(candidate) === symbolCode
    )

    if (hour) {
      return {
        time: hour.time,
        symbolCode: symbolCode as SymbolCode,
        tempChange: getTempChange(today[0], hour),
      }
    }
  }

  return null
}
