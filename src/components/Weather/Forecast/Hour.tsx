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

const icons: any = {
  partlycloudy_night: <PartlyCloudyNight />,
  fair_night: <FairNight />,
  clearsky_night: <ClearSkyNight />,
  clearsky_day: <ClearSkyDay />,
  partlycloudy_day: <PartlyCloudyDay />,
  cloudy: <Cloudy />,
  lightsnow: <LightSnow />,
  snow: <Snow />,
}

interface IProps {
  timeSerie: any
  showAll: boolean
}

export default function Hour({ timeSerie, showAll }: IProps) {
  const symbolCode = useMemo(
    () =>
      showAll
        ? timeSerie.data?.next_1_hours?.summary?.symbol_code
        : timeSerie.data?.next_6_hours?.summary?.symbol_code,
    [timeSerie, showAll]
  )

  const windSpeedOfGust = timeSerie.data.instant.details.wind_speed_of_gust
  const airTemperature = Math.round(
    timeSerie.data.instant.details.air_temperature
  )

  return (
    <>
      <td
        className={classNames('border border-slate-300 px-2 py-1 text-center')}
      >
        {format(timeSerie.time, 'HH')}
      </td>
      <td className="border border-slate-300 px-2 py-1">
        <div className="flex justify-center">
          {icons[symbolCode] ? icons[symbolCode] : symbolCode}
        </div>
      </td>
      <td className="border border-slate-300 px-2 py-1 text-center">
        <span
          className={classNames(
            'font-bold',
            airTemperature > 0 ? 'text-red-700' : 'text-blue-700'
          )}
        >
          {airTemperature} °
        </span>
      </td>
      <td className="border border-slate-300 px-2 py-1 text-center">
        {Math.round(timeSerie.data.instant.details.wind_speed)}{' '}
        {windSpeedOfGust ? `(${Math.round(windSpeedOfGust)})` : ''} m/s
      </td>
    </>
  )
}
