import { useMemo } from 'react'
import { ITimeSerie, IWeatherChange } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'

const useWeatherChange = (
  days: ITimeSerie[][] | null
): IWeatherChange | null => {
  const hour = useMemo(() => {
    if (days) {
      const daysToCheck = days.filter((_, index) => index && index < 4)
      const currentSymbolCodes = days[0].map((hour) => getSymbolCode(hour))

      const filteredSymbolCodes = [
        'sun',
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
