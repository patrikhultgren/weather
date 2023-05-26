import { useMemo } from 'react'
import { ITimeSerie, IWeatherChange } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import { getAirTemperature } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'

const findHourIndex = (
  dayToCheck: ITimeSerie[],
  filteredSymbolCodes: string[],
  excludeIndex?: number
): number =>
  dayToCheck.findIndex((hour, index) =>
    filteredSymbolCodes.some(
      (filteredSymbolCode) =>
        getSymbolCode(hour).includes(filteredSymbolCode) &&
        (excludeIndex === undefined || excludeIndex !== index)
    )
  )

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
        'clearsky',
        'rain',
        'snow',
        'sleet',
        'thunder',
      ].filter(
        (symbolCode) =>
          !currentSymbolCodes.some((currentSymbolCode) =>
            currentSymbolCode.includes(symbolCode)
          )
      )

      for (let dayIndex = 0; dayIndex < daysToCheck.length; dayIndex++) {
        const currentHourIndex = findHourIndex(
          daysToCheck[dayIndex],
          filteredSymbolCodes
        )

        if (currentHourIndex > -1) {
          const nextHourIndex = findHourIndex(
            daysToCheck[dayIndex],
            filteredSymbolCodes,
            currentHourIndex
          )

          if (nextHourIndex > -1) {
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
