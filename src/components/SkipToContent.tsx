import { useCallback, type SyntheticEvent } from 'react'
import { useTranslation } from 'i18n/context'

const FOCUS_RESET_DELAY = 1000

const SkipToContent = () => {
  const { t } = useTranslation()

  const onClick = useCallback((event: SyntheticEvent) => {
    event.preventDefault()

    const container = document.querySelector<HTMLElement>('main:first-of-type')

    if (container) {
      container.tabIndex = -1
      container.focus()
      setTimeout(() => container.removeAttribute('tabindex'), FOCUS_RESET_DELAY)
    }
  }, [])

  return (
    <button type="button" className="sr-only block p-3" onClick={onClick}>
      {t('skip-to-content')}
    </button>
  )
}

export default SkipToContent
