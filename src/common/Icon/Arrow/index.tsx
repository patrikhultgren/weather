import classNames from 'classnames'
import { FiChevronDown } from 'react-icons/fi'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  direction: 'down' | 'up' | 'left' | 'right'
}

const info = {
  down: { className: '' },
  up: { className: 'rotate-180' },
  left: { className: 'rotate-90' },
  right: { className: 'rotate-[270deg]' },
}

const Arrow = ({ direction }: IProps) => {
  const { t } = useTranslation()

  return (
    <FiChevronDown
      title={t(`arrow-${direction}`)}
      className={classNames(info[direction].className)}
      size={18}
    />
  )
}

export default Arrow
