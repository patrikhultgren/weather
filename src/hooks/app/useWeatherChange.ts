import { useMemo, useState, useEffect } from 'react'
import { ITimeSerie, IWeatherChange } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'

interface IProps {
  days: ITimeSerie[][] | null
  error: any
}

const useWeatherChange = ({ days, error }: IProps): IWeatherChange | null => {
  const [daysInState, setDaysInstate] = useState<ITimeSerie[][] | null>(null)

  useEffect(() => {
    if (days) {
      setDaysInstate(days)
    }
  }, [days])

  useEffect(() => {
    if (error) {
      setDaysInstate(null)
    }
  }, [error])

  const hour = useMemo(() => {
    if (daysInState) {
      const daysToCheck = daysInState.filter((_, index) => index && index < 4)
      const currentSymbolCodes = daysInState[0].map((hour) =>
        getSymbolCode(hour)
      )

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
  }, [daysInState])

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
