import { useMemo } from 'react'
import classNames from 'classnames'
import { format } from 'utils/date'
import { ITimeSerie } from 'utils/types'
import { getSymbolCode, getAirTemperature } from 'utils/weather'
import LongArrow from 'common/Icon/LongArrow'
import { SymbolCode, YrWeatherIcon } from 'react-yr-weather-icons'
import weatherIconTitles from 'config/weatherIconTitles'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  hour: ITimeSerie
}

export default function Hour({ hour }: IProps) {
  const { language } = useTranslation()

  const precipitationAmount = useMemo(
    () => hour.data?.next_1_hours?.details?.precipitation_amount || 0,
    [hour]
  )

  const symbolCode = useMemo(() => getSymbolCode(hour), [hour])

  const airTemperature = useMemo(
    () => Math.round(getAirTemperature(hour)),
    [hour]
  )

  const windSpeed = useMemo(() => {
    const speed = hour.data.instant.details.wind_speed
    return speed ? Math.round(speed) : null
  }, [hour])

  const windSpeedOfGust = useMemo(() => {
    const speed = hour.data.instant.details.wind_speed_of_gust
    return speed ? Math.round(speed) : null
  }, [hour])

  const windFromDirection = useMemo(() => {
    return hour.data.instant.details.wind_from_direction
  }, [hour])

  return (
    <>
      <td className="border-y border-slate-300 px-2 py-1 text-center">
        {format(hour.time, 'HH', language)}
      </td>
      <td className="border-y border-slate-300 px-2 py-1">
        <div className="flex justify-center">
          <YrWeatherIcon
            symbolCode={symbolCode as SymbolCode}
            title={weatherIconTitles[symbolCode]}
          />
        </div>
      </td>
      <td className="border-y border-slate-300 px-2 py-1 text-center">
        <span
          className={classNames(
            'font-bold',
            airTemperature > 0 ? 'text-red-700' : 'text-blue-700'
          )}
        >
          {airTemperature} °
        </span>
      </td>
      <td className="border-y border-slate-300 px-2 py-1 text-center">
        <div className="flex items-center justify-center">
          <span className="mr-1.5">
            {windSpeed} {windSpeedOfGust ? `(${windSpeedOfGust})` : ''}
          </span>
          <LongArrow
            title={`Vindriktning ${windFromDirection.toLocaleString()} grader`}
            degress={windFromDirection}
          />
        </div>
      </td>
      <td className="border-y border-slate-300 px-2 py-1 text-center hidden md:table-cell text-blue-700">
        {precipitationAmount > 0 &&
          `${precipitationAmount.toLocaleString('sv-SE')} mm`}
      </td>
    </>
  )
}
