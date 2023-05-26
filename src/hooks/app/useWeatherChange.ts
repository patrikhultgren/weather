import { useMemo } from 'react'
import { ITimeSerie, IWeatherChange } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import { getAirTemperature } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'

type GroupedSymbolCodesSorted = Array<{ key: string; value: number }>
type GroupedSymbolCodes = { [key: string]: number }

const groupSymbolCodes = (dayToCheck: ITimeSerie[]): GroupedSymbolCodes =>
  dayToCheck.reduce(
    (acc: any, hour) => ({
      ...acc,
      [getSymbolCode(hour)]: acc[getSymbolCode(hour)]
        ? acc[getSymbolCode(hour)] + 1
        : 1,
    }),
    {}
  )

const sortGroupedSymbolCodes = (
  groupedSymbolCodes: GroupedSymbolCodes
): GroupedSymbolCodesSorted => {
  const result = Object.keys(groupedSymbolCodes).map((key) => ({
    key,
    value: groupedSymbolCodes[key],
  }))

  result.sort((a, b) => b.value - a.value)

  return result
}

const getFinalSymbolCode = (
  groupedSymbolCodesSorted: GroupedSymbolCodesSorted,
  filteredSymbolCodes: string[]
): string | null => {
  for (const groupedSymbolCodeSorted of groupedSymbolCodesSorted) {
    for (const filteredSymbolCode of filteredSymbolCodes) {
      if (groupedSymbolCodeSorted.key.includes(filteredSymbolCode)) {
        return filteredSymbolCode
      }
    }
  }

  return null
}

const findHourIndex = (
  dayToCheck: ITimeSerie[],
  finalSymbolCode: string
): number =>
  dayToCheck.findIndex((hour) => getSymbolCode(hour).includes(finalSymbolCode))

interface IProps {
  days: ITimeSerie[][] | null
}

const useWeatherChange = ({ days }: IProps): IWeatherChange | null => {
  const hour = useMemo(() => {
    if (days && days.length >= 2) {
      const today = days[0]
      const tomorrow = days[1]

      const offset = today.length < 3 ? 1 : 0

      const daysToCheck = days.filter(
        (_, index) => index > 0 + offset && index < 4 + offset
      )

      let currentSymbolCodes = today.map((hour) => getSymbolCode(hour))

      if (offset) {
        currentSymbolCodes = [
          ...currentSymbolCodes,
          ...tomorrow.map((hour) => getSymbolCode(hour)),
        ]
      }

      const filteredSymbolCodes = [
        'thunder',
        'snow',
        'sleet',
        'rain',
        'clearsky',
      ].filter(
        (symbolCode) =>
          !currentSymbolCodes.some((currentSymbolCode) =>
            currentSymbolCode.includes(symbolCode)
          )
      )

      for (let dayIndex = 0; dayIndex < daysToCheck.length; dayIndex++) {
        const groupedSymbolCodes = groupSymbolCodes(daysToCheck[dayIndex])

        const groupedSymbolCodesSorted =
          sortGroupedSymbolCodes(groupedSymbolCodes)

        const finalSymbolCode = getFinalSymbolCode(
          groupedSymbolCodesSorted,
          filteredSymbolCodes
        )

        if (finalSymbolCode) {
          const currentHourIndex = findHourIndex(
            daysToCheck[dayIndex],
            finalSymbolCode
          )

          if (currentHourIndex > -1) {
            return daysToCheck[dayIndex][currentHourIndex]
          }
        }
      }
    }

    return null
  }, [days])

  const tempChange = useMemo(() => {
    if (days && hour) {
      const fromTemp = getAirTemperature(days[0][0])
      const toTemp = getAirTemperature(hour)

      if (fromTemp < 0 && toTemp > 0) {
        return 'minus-to-plus'
      } else if (fromTemp > 0 && toTemp < 0) {
        return 'plus-to-minus'
      }
    }

    return null
  }, [days, hour])

  return useMemo(
    () =>
      hour
        ? {
            time: hour.time,
            icon: weatherIcons[getSymbolCode(hour)],
            tempChange,
          }
        : null,
    [hour, tempChange]
  )
}

export default useWeatherChange
