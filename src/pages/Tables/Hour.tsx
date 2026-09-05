import { useMemo } from 'react'
import classNames from 'classnames'
import { SymbolCode, YrWeatherIcon } from 'react-yr-weather-icons'
import LongArrow from 'components/Icon/LongArrow'
import { getAirTemperature, getSymbolCode } from 'features/forecast/symbols'
import { useTranslation } from 'i18n/context'
import { format } from 'lib/date'
import type { ITimeSerie } from 'types'

const cell = 'border-y border-slate-300 px-2 py-1 text-center'

const round = (value: number | undefined): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : null

interface IProps {
  hour: ITimeSerie
}

export default function Hour({ hour }: IProps) {
  const { t, language } = useTranslation()

  const { instant, next_1_hours } = hour.data

  const precipitationAmount = next_1_hours?.details?.precipitation_amount ?? 0

  const symbolCode = useMemo(() => getSymbolCode(hour), [hour])

  const airTemperature = Math.round(getAirTemperature(hour))
  const windSpeed = round(instant.details.wind_speed)
  const windSpeedOfGust = round(instant.details.wind_speed_of_gust)
  const windFromDirection = instant.details.wind_from_direction

  return (
    <>
      <td className={cell}>
        {format(hour.time, language === 'en' ? 'h a' : 'HH', language)}
      </td>
      <td className="border-y border-slate-300 px-2 py-1">
        <div className="flex justify-center">
          <YrWeatherIcon
            symbolCode={symbolCode as SymbolCode}
            title={t(symbolCode)}
          />
        </div>
      </td>
      <td className={cell}>
        <span
          className={classNames(
            'font-bold',
            airTemperature > 0 ? 'text-red-700' : 'text-blue-700'
          )}
        >
          {airTemperature} °
        </span>
      </td>
      <td className={cell}>
        <div className="flex items-center justify-center">
          <span className="mr-1.5">
            {windSpeed} {windSpeedOfGust ? `(${windSpeedOfGust})` : ''}
          </span>
          <LongArrow
            title={t('wind-direction', {
              degrees: windFromDirection.toLocaleString(language),
            })}
            degrees={windFromDirection}
          />
        </div>
      </td>
      <td className={`${cell} hidden text-blue-700 md:table-cell`}>
        {precipitationAmount > 0 &&
          `${precipitationAmount.toLocaleString(language)} mm`}
      </td>
    </>
  )
}
