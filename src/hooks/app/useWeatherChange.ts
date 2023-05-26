import { useMemo } from 'react'
import { ITimeSerie, IWeatherChange } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import { getAirTemperature } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'

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
      ].filter((symbolCode) => !currentSymbolCodes.includes(symbolCode))

      for (let dayIndex = 0; dayIndex < daysToCheck.length; dayIndex++) {
        const hourIndex = daysToCheck[dayIndex].findIndex((hour) =>
          filteredSymbolCodes.includes(getSymbolCode(hour))
        )

        if (hourIndex > -1) {
          return daysToCheck[dayIndex][hourIndex]
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
