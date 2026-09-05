import Button from 'components/Button'
import Gps from 'components/Icon/Gps'
import { useTranslation } from 'i18n/context'

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
