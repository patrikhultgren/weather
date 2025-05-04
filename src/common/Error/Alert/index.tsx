import { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Container from 'common/Container'
import ErrorIcon from 'common/Icon/Error'
import Close from 'common/Icon/Close'
import { IError } from 'utils/types'

interface Props {
  error: IError
  className?: string
}

const ErrorAlert = ({ error, className }: Props) => {
  const [show, setShow] = useState<boolean>(true)

  const hideError = useCallback(() => {
    setShow(false)
  }, [])

  useEffect(() => {
    setShow(true)
  }, [error])

  return show ? (
    <div
      role="alert"
      className={classNames('bg-red-100', 'px-4', 'py-2', className)}
    >
      <Container className="flex items-center">
        <ErrorIcon />
        <p className="mx-2">{error.message || 'Någonting gick fel'}</p>
        <button type="button" className="ml-auto p-3" onClick={hideError}>
          <Close title="Stäng felmeddelande" size={18} />
        </button>
      </Container>
    </div>
  ) : null
}

export default ErrorAlert
