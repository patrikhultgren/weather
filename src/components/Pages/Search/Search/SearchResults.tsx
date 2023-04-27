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
      <h2 className="p-4 py-2 bg-gray-300 mt-4 font-bold tracking-wider border-b border-slate-400">
        {response?.type === 'searchResults'
          ? 'Sökresultat'
          : 'Tidigare platser'}
      </h2>
      <ul className="overflow-auto">
        {response?.positions?.map((searchResult, index) => (
          <li key={`${searchResult.latitude}_${searchResult.longitude}`}>
            <button
              type="button"
              className={classNames(
                'px-4',
                'py-3',
                'text-left',
                'w-full',
                'hover:bg-slate-700',
                'hover:text-white',
                'truncate',
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
