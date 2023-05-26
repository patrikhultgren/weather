import { MdShowChart } from 'react-icons/md'

interface IProps {
  className?: string
  title?: string
}

const Table = ({ className, title }: IProps) => (
  <MdShowChart className={className} title={title} size={26} />
)

export default Table
