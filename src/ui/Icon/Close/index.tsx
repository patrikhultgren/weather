import { VscClose } from 'react-icons/vsc'

interface IProps {
  title?: string
  size?: number
}

const Close = ({ title, size = 28 }: IProps) => (
  <VscClose title={title} size={size} />
)

export default Close
