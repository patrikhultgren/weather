import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Container from 'components/Container'
import ErrorIcon from 'components/Icon/Error'
import Close from 'components/Icon/Close'
import { IError } from 'utils/types'

interface Props {
  error: IError
  className?: string
}

const Error = ({ error, className }: Props) => {
  const [show, setShow] = useState<boolean>(true)

  const hideError = useCallback(() => {
    setShow(false)
  }, [])

  useEffect(() => {
    setShow(true)
  }, [error])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (show) {
        setShow(false)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [show, setShow])

  return show ? (
    <div className={classNames('bg-red-100', 'px-4', 'py-2', className)}>
      <Container className="flex items-center">
        <ErrorIcon />
        <span className="mx-2">{error.message || 'Någonting gick fel'}</span>
        <button type="button" className="ml-auto p-3" onClick={hideError}>
          <Close title="Stäng felmeddelande" size={18} />
        </button>
      </Container>
    </div>
  ) : null
}

export default Error
