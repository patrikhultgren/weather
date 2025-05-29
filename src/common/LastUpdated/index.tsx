import Container from 'common/Container'
import { useTranslation } from 'context/TranslationProvider'
import { format } from 'utils/date'

interface Props {
  updated_at: string | null
}

export default function LastUpdated({ updated_at }: Props) {
  const { t, language } = useTranslation()

  return updated_at ? (
    <div className="mt-10">
      <Container className="text-sm text-center">
        {t('last_updated')}:{' '}
        {format(updated_at, language === 'sv' ? 'H:mm' : 'H:mm a', language)}
      </Container>
    </div>
  ) : null
}
