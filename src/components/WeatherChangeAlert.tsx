import { useCallback, useState } from 'react'
import classNames from 'classnames'
import { YrWeatherIcon } from 'react-yr-weather-icons'
import Container from 'components/Container'
import Close from 'components/Icon/Close'
import { useTranslation } from 'i18n/context'
import { format } from 'lib/date'
import { capitalizeFirstLetter } from 'lib/string'
import type { IWeatherChange } from 'types'

interface IProps {
  weatherChange: IWeatherChange
  className?: string
}

/** Callers key this on the change so a new one mounts a fresh, visible alert. */
const WeatherChangeAlert = ({ weatherChange, className }: IProps) => {
  const { t, language } = useTranslation()
  const [show, setShow] = useState<boolean>(true)

  const hide = useCallback(() => setShow(false), [])

  if (!show) {
    return null
  }

  const { time, symbolCode, tempChange } = weatherChange

  return (
    <div
      role="alert"
      className={classNames(
        'bg-gray-100 py-1 text-sm font-bold md:text-base',
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <div />
        <div className="flex items-center">
          <p className="mr-1 pl-8">
            {capitalizeFirstLetter(format(time, 'EEEE', language))}{' '}
            {t(symbolCode).toLowerCase()}
            {tempChange && ` ${t('and')} ${t(tempChange)}`}
          </p>
          <YrWeatherIcon symbolCode={symbolCode} size="1.7rem" />
        </div>
        <button type="button" className="p-3" onClick={hide}>
          <Close title={t('close-message')} size={18} />
        </button>
      </Container>
    </div>
  )
}

export default WeatherChangeAlert
