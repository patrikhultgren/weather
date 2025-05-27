import Button from 'common/Button'
import Gps from 'common/Icon/Gps'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  className?: string
  showUseMyLocation: boolean
  activateMyLocation: () => void
}

export default function UseMyLocation({
  className,
  showUseMyLocation,
  activateMyLocation,
}: IProps) {
  const { t } = useTranslation()

  return showUseMyLocation ? (
    <Button onClick={activateMyLocation} className={className}>
      <div className="flex items-center gap-2">
        <Gps size={18} />
        <div>{t('use-my-location')}</div>
      </div>
    </Button>
  ) : null
}
