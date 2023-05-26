import { useMemo } from 'react'
import { ITimeSerie, IWeatherChange } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'

interface IProps {
  days: ITimeSerie[][] | null
}

const useWeatherChange = ({ days }: IProps): IWeatherChange | null => {
  const hour = useMemo(() => {
    if (days) {
      const firstDay = days[0]
      const offset = firstDay.length < 3 ? 1 : 0

      const daysToCheck = days.filter(
        (_, index) => index > 0 + offset && index < 4 + offset
      )

      const currentSymbolCodes = firstDay.map((hour) => getSymbolCode(hour))

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

  return useMemo(
    () =>
      hour
        ? {
            time: hour.time,
            icon: weatherIcons[getSymbolCode(hour)],
          }
        : null,
    [hour]
  )
}

export default useWeatherChange
