import Button from 'ui/Button'
import Gps from 'ui/Icon/Gps'

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
  return showUseMyLocation ? (
    <Button onClick={activateMyLocation} className={className}>
      <div className="flex items-center gap-2">
        <Gps size={18} />
        <div>Använd min plats</div>
      </div>
    </Button>
  ) : null
}
