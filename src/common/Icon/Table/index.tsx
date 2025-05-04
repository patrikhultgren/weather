import { VscTable } from 'react-icons/vsc'

interface IProps {
  className?: string
  title?: string
}

const Chart = ({ className, title }: IProps) => (
  <VscTable className={className} title={title} size={22} />
)

export default Chart
