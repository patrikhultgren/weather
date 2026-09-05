import { AiOutlineSearch } from 'react-icons/ai'
import { useTranslation } from 'i18n/context'

interface IProps {
  className?: string
  /** Leave unset when the surrounding control already carries the label. */
  decorative?: boolean
}

const Search = ({ className, decorative }: IProps) => {
  const { t } = useTranslation()

  return (
    <AiOutlineSearch
      className={className}
      title={decorative ? undefined : t('search')}
      aria-hidden={decorative || undefined}
      size={24}
    />
  )
}

export default Search
