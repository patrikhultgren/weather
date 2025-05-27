import { AiOutlineSearch } from 'react-icons/ai'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  className?: string
}

const Search = ({ className }: IProps) => {
  const { t } = useTranslation()

  return <AiOutlineSearch className={className} title={t('search')} size={24} />
}

export default Search
