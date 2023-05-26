import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Container from 'ui/Container'
import Close from 'ui/Icon/Close'
import { IWeatherChange } from 'utils/types'
import { format } from 'utils/date'

const tempChangeText = {
  'minus-to-plus': 'plusgrader',
  'plus-to-minus': 'minusgrader',
}

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

  const { time, tempChange } = weatherChange
  const { Icon, title } = weatherChange.icon

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
        <div className="flex">
          <p className="pl-4 mr-1">
            På {format(time, 'EEEE')} {title.toLowerCase()}
            {tempChange && ` och ${tempChangeText[tempChange]}`}
          </p>
          <Icon size="1.7rem" />
        </div>
        <button type="button" className="p-3" onClick={hideError}>
          <Close title="Stäng meddelande" size={18} />
        </button>
      </Container>
    </div>
  ) : null
}

export default WeatherChangeAlert
