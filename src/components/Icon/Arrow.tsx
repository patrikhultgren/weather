import { FiChevronDown } from 'react-icons/fi'
import { useTranslation } from 'i18n/context'

const rotations = {
  down: '',
  up: 'rotate-180',
  left: 'rotate-90',
  right: 'rotate-270',
}

interface IProps {
  direction: keyof typeof rotations
}

const Arrow = ({ direction }: IProps) => {
  const { t } = useTranslation()

  return (
    <FiChevronDown
      title={t(`arrow-${direction}`)}
      className={rotations[direction]}
      size={18}
    />
  )
}

export default Arrow
