import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  searchResultsId: string
}

export default function NoSearchResults({ searchResultsId }: IProps) {
  const { t } = useTranslation()

  return (
    <p
      id={searchResultsId}
      className="p-4 mt-4 bg-slate-200 font-bold tracking-wider"
    >
      {t('your-search-returned-no-results')}
    </p>
  )
}
