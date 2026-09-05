import { useTranslation } from 'i18n/context'

const Spinner = () => {
  const { t } = useTranslation()

  return (
    <div
      role="status"
      className="fixed top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="size-12 animate-spin rounded-full border-8 border-x-slate-700 border-t-white border-b-slate-700" />
      <span className="sr-only">{t('loading')}</span>
    </div>
  )
}

export default Spinner
