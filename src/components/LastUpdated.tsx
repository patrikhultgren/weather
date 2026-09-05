import { useTranslation } from 'i18n/context'
import { format } from 'lib/date'

interface IProps {
  updated_at: string | null
}

export default function LastUpdated({ updated_at }: IProps) {
  const { t, language } = useTranslation()

  if (!updated_at) {
    return null
  }

  return (
    <div className="mt-10 text-center text-sm">
      {t('last_updated')}:{' '}
      {format(updated_at, language === 'en' ? 'h:mm a' : 'H:mm', language)}
    </div>
  )
}
