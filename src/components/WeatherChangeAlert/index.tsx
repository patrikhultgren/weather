import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Container from 'components/Container'
import Close from 'components/Icon/Close'
import { IWeatherChange } from 'utils/types'
import { format } from 'utils/date'

interface Props {
  weatherChange: IWeatherChange
  className?: string
}

const WeatherChangeAlert = ({ weatherChange, className }: Props) => {
  const [show, setShow] = useState<boolean>(true)

  const hideError = useCallback(() => {
    setShow(false)
  }, [])

  useEffect(() => {
    setShow(true)
  }, [weatherChange])

  const { Icon } = weatherChange.icon

  return show ? (
    <div
      role="alert"
      className={classNames(
        'px-4',
        'py-1',
        'font-bold',
        'text-sm',
        'md:text-base',
        className
      )}
    >
      <Container className="flex items-center justity-center">
        <p className="ml-auto mr-1">
          På {format(weatherChange.time, 'EEEE')} blir det{' '}
          {weatherChange.icon.title.toLowerCase()}
        </p>
        <Icon size="1.7rem" />
        <button type="button" className="mr-auto p-3" onClick={hideError}>
          <Close title="Stäng felmeddelande" size={18} />
        </button>
      </Container>
    </div>
  ) : null
}

export default WeatherChangeAlert
