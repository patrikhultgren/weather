import { RxArrowDown } from 'react-icons/rx'

interface IProps {
  degress: number
  title: string
}

const LongArrow = ({ degress, title }: IProps) => (
  <RxArrowDown
    title={title}
    style={{ transform: `rotate(${degress}deg)` }}
    size={18}
  />
)

export default LongArrow
