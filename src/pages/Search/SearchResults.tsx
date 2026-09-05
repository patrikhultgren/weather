import classNames from 'classnames'
import { useTranslation } from 'i18n/context'
import type { ISearchHandler } from 'types'

interface IProps {
  searchHandler: ISearchHandler
  searchResultsId: string
}

export default function SearchResults({
  searchHandler,
  searchResultsId,
}: IProps) {
  const { t } = useTranslation()

  const { response } = searchHandler.searchResults

  if (!response?.positions?.length) {
    return null
  }

  return (
    <div id={searchResultsId}>
      <h2 className="mt-4 border-b border-slate-400 bg-gray-300 p-4 py-2 font-bold tracking-wider">
        {response.type === 'searchResults'
          ? t('search-results')
          : t('recently-viewed')}
      </h2>
      <ul className="overflow-auto">
        {response.positions.map((searchResult, index) => (
          <li key={`${searchResult.latitude}_${searchResult.longitude}`}>
            <button
              type="button"
              className={classNames(
                'w-full truncate px-4 py-3 text-left hover:bg-slate-700 hover:text-white',
                searchHandler.selectedIndex === index
                  ? 'bg-slate-900 text-white'
                  : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-slate-200'
              )}
              onClick={() => searchHandler.onSelectSearchResult(searchResult)}
            >
              {searchResult.city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
