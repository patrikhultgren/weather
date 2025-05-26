import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Container from 'common/Container'
import Close from 'common/Icon/Close'
import { IWeatherChange } from 'utils/types'
import { format } from 'utils/date'
import { capitalizeFirstLetter } from 'utils/string'
import { YrWeatherIcon } from 'react-yr-weather-icons'
import { useTranslation } from 'context/TranslationProvider'

const tempChangeText = {
  'minus-to-plus': 'plusgrader',
  'plus-to-minus': 'minusgrader',
}

interface Props {
  weatherChange: IWeatherChange
  className?: string
}

const WeatherChangeAlert = ({ weatherChange, className }: Props) => {
  const { t, language } = useTranslation()
  const [show, setShow] = useState<boolean>(true)

  const hideError = useCallback(() => {
    setShow(false)
  }, [])

  useEffect(() => {
    setShow(true)
  }, [weatherChange])

  const { time, tempChange } = weatherChange

  return show ? (
    <div
      role="alert"
      className={classNames(
        'py-1',
        'bg-gray-100',
        'font-bold',
        'text-sm',
        'md:text-base',
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <div />
        <div className="flex items-center">
          <p className="pl-8 mr-1">
            {capitalizeFirstLetter(format(time, 'EEEE', language))}{' '}
            {t(weatherChange.symbolCode).toLowerCase()}
            {tempChange && ` och ${tempChangeText[tempChange]}`}
          </p>
          <YrWeatherIcon
            symbolCode={weatherChange.symbolCode}
            width="1.7rem"
            height="1.7rem"
          />
        </div>
        <button type="button" className="p-3" onClick={hideError}>
          <Close title="Stäng meddelande" size={18} />
        </button>
      </Container>
    </div>
  ) : null
}

export default WeatherChangeAlert
