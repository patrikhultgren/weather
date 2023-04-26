import classNames from 'classnames'
import { ISearchHandler } from 'utils/types'

interface IProps {
  searchHandler: ISearchHandler
  searchResultsId: string
}

export default function SearchResults({
  searchHandler,
  searchResultsId,
}: IProps) {
  const { response } = searchHandler.searchResults

  return (
    <div id={searchResultsId}>
      <h2 className="p-4 py-2 bg-gray-300 mt-4 font-bold tracking-wide">
        {response?.type === 'searchResults'
          ? 'Sökresultat'
          : 'Tidigare platser'}
      </h2>
      <ul className="overflow-auto">
        {response?.positions?.map((searchResult, index) => (
          <li
            role="button"
            className={classNames(
              'px-4',
              'hover:bg-slate-700',
              'hover:text-white',
              'py-3',
              'truncate',
              searchHandler.selectedIndex === index
                ? 'bg-slate-900 text-white'
                : 'odd:bg-white even:bg-slate-200'
            )}
            key={`${searchResult.latitude}_${searchResult.longitude}`}
            onClick={() => searchHandler.onSelectSearchResult(searchResult)}
          >
            {searchResult.city}
          </li>
        ))}
      </ul>
    </div>
  )
}
