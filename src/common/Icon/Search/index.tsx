import { AiOutlineSearch } from 'react-icons/ai'

interface IProps {
  className?: string
}

const Search = ({ className }: IProps) => (
  <AiOutlineSearch className={className} title="Sök" size={24} />
)

export default Search
