import { VscClose } from 'react-icons/vsc'

interface IProps {
  title?: string
}

const Close = ({ title }: IProps) => <VscClose title={title} size={28} />

export default Close
