import { ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import {
  ClearSkyDay,
  ClearSkyNight,
  Cloudy,
  FairDay,
  FairNight,
  Fog,
  LightSleet,
  LightSnow,
  PartlyCloudyDay,
} from '@patrikhultgren/react-weather-icons'
import { format } from 'utils/date'
import { ITimeSerie } from 'utils/types'
import PartlyCloudyNight from 'components/Icon/Weather/PartlyCloudyNight'
import Snow from 'components/Icon/Weather/Snow'
import Sleet from 'components/Icon/Weather/Sleet'
import Rain from 'components/Icon/Weather/Rain'
import LongArrow from 'components/Icon/LongArrow'

const icons: { [key: string]: ReactNode } = {
  partlycloudy_night: <PartlyCloudyNight title="Delvis monlig natt" />,
  fair_night: <FairNight title="Delvis molnig natt" />,
  clearsky_night: <ClearSkyNight title="Klar natt" />,
  clearsky_day: <ClearSkyDay title="Soligt" />,
  partlycloudy_day: <PartlyCloudyDay title="Delvis monligt" />,
  cloudy: <Cloudy title="Monligt" />,
  lightsnow: <LightSnow title="Lite snö" />,
  snow: <Snow title="Snö" />,
  fog: <Fog title="Dimma" />,
  lightsleet: <LightSleet title="Lätt snöblandat regn" />,
  fair_day: <FairDay title="Delvis monligt" />,
  sleet: <Sleet title="Snöblandet regn" />,
  rain: <Rain title="Regn" />,
}

interface IProps {
  hour: ITimeSerie
}

export default function Hour({ hour }: IProps) {
  const precipitationAmountByHours = useMemo(
    () => ({
      1: hour.data?.next_1_hours?.details?.precipitation_amount,
      6: hour.data?.next_6_hours?.details?.precipitation_amount,
    }),
    [hour]
  )

  const precipitationAmount = precipitationAmountByHours['1']

  const symbolCodeByHours = useMemo(
    () => ({
      1: hour.data?.next_1_hours?.summary?.symbol_code,
      6: hour.data?.next_6_hours?.summary?.symbol_code,
    }),
    [hour]
  )

  const symbolCode = useMemo(
    () => symbolCodeByHours['1'] || symbolCodeByHours['6'],
    [symbolCodeByHours]
  )

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
          {icons[symbolCode] ? icons[symbolCode] : symbolCode}
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
