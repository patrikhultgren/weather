import { useCallback, useState } from 'react'
import classNames from 'classnames'
import Container from 'components/Container'
import ErrorIcon from 'components/Icon/Error'
import Close from 'components/Icon/Close'
import { useTranslation } from 'i18n/context'
import type { IError } from 'types'

interface IProps {
  error: IError
  className?: string
}

/**
 * Dismissal is per error: callers give the component a key so a new error
 * mounts a fresh, visible alert.
 */
const ErrorAlert = ({ error, className }: IProps) => {
  const { t } = useTranslation()
  const [show, setShow] = useState<boolean>(true)

  const hide = useCallback(() => setShow(false), [])

  if (!show) {
    return null
  }

  return (
    <div role="alert" className={classNames('bg-red-100 px-4 py-2', className)}>
      <Container className="flex items-center">
        <ErrorIcon />
        <p className="mx-2">{error.message || t('something-went-wrong')}</p>
        <button type="button" className="ml-auto p-3" onClick={hide}>
          <Close title={t('close-message')} size={18} />
        </button>
      </Container>
    </div>
  )
}

export default ErrorAlert
