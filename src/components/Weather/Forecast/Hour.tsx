import { useMemo } from 'react'
import classNames from 'classnames'
import { format } from 'utils/date'
import PartlyCloudyNight from 'components/Icon/Weather/PartlyCloudyNight'
import FairNight from 'components/Icon/Weather/FairNight'
import ClearSkyNight from 'components/Icon/Weather/ClearSkyNight'
import ClearSkyDay from 'components/Icon/Weather/ClearSkyDay'
import PartlyCloudyDay from 'components/Icon/Weather/PartlyCloudyDay'
import Cloudy from 'components/Icon/Weather/Cloudy'
import LightSnow from 'components/Icon/Weather/LightSnow'
import Snow from 'components/Icon/Weather/Snow'
import Fog from 'components/Icon/Weather/Fog'
import LightSleet from 'components/Icon/Weather/LightSleet'
import FairDay from 'components/Icon/Weather/FairDay'
import Sleet from 'components/Icon/Weather/Sleet'

const icons: any = {
  partlycloudy_night: <PartlyCloudyNight />,
  fair_night: <FairNight />,
  clearsky_night: <ClearSkyNight />,
  clearsky_day: <ClearSkyDay />,
  partlycloudy_day: <PartlyCloudyDay />,
  cloudy: <Cloudy />,
  lightsnow: <LightSnow />,
  snow: <Snow />,
  fog: <Fog />,
  lightsleet: <LightSleet />,
  fair_day: <FairDay />,
  sleet: <Sleet />,
}

interface IProps {
  hour: any
  showAll: boolean
}

export default function Hour({ hour, showAll }: IProps) {
  const nextOneHoursSymbolCode = hour.data?.next_1_hours?.summary?.symbol_code

  const nextSixHoursSymbolCode = hour.data?.next_6_hours?.summary?.symbol_code

  const symbolCode = useMemo(
    () => nextOneHoursSymbolCode || nextSixHoursSymbolCode,
    [nextOneHoursSymbolCode, nextSixHoursSymbolCode]
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
        {windSpeed} {windSpeedOfGust ? `(${windSpeedOfGust})` : ''} m/s
      </td>
    </>
  )
}
