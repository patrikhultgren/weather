import classNames from 'classnames'
import { FiChevronDown } from 'react-icons/fi'

interface IProps {
  direction: 'down' | 'up'
}

const info = {
  down: { className: '', title: 'Pil ner' },
  up: { className: 'rotate-180', title: 'Pil upp' },
}

const Arrow = ({ direction }: IProps) => (
  <FiChevronDown
    title={info[direction].title}
    className={classNames(info[direction].className)}
    size={18}
  />
)

export default Arrow
