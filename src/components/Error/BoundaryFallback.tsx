import { useCallback } from 'react'
import Button from 'components/Button'
import { useTranslation } from 'i18n/context'
import { toError } from 'lib/http'

export interface IProps {
  error: unknown
}

const ErrorBoundaryFallback = ({ error }: IProps) => {
  const { t } = useTranslation()

  const onClick = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="bg-red-100 p-4" role="alert">
      <div className="flex items-center justify-center">
        <div>
          <h2 className="text-lg md:text-xl">{t('something-went-wrong')}</h2>
          <pre className="mt-3 text-sm">{toError(error).message}</pre>
          <Button className="mt-3" variant="secondary" onClick={onClick}>
            {t('reload-the-page')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundaryFallback
