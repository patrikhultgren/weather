import { useMemo } from 'react'
import classNames from 'classnames'
import { format } from 'utils/date'
import { ITimeSerie } from 'utils/types'
import { getSymbolCode } from 'utils/weather'
import weatherIcons from 'config/weatherIcons'
import LongArrow from 'ui/Icon/LongArrow'

interface IProps {
  hour: ITimeSerie
}

export default function Hour({ hour }: IProps) {
  const precipitationAmount = useMemo(
    () => hour.data?.next_1_hours?.details?.precipitation_amount || 0,
    [hour]
  )

  const symbolCode = useMemo(() => getSymbolCode(hour), [hour])

  const weatherIcon = useMemo(
    () => weatherIcons?.[symbolCode || ''],
    [symbolCode]
  )
  const WeatherIcon = useMemo(() => weatherIcon?.Icon, [weatherIcon])

  const airTemperature = useMemo(
    () => Math.round(hour.data.instant.details.air_temperature),
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
        {format(hour.time, 'HH')}
      </td>
      <td className="border-y border-slate-300 px-2 py-1">
        <div className="flex justify-center">
          {WeatherIcon ? (
            <WeatherIcon title={weatherIcon?.title} />
          ) : (
            symbolCode
          )}
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
