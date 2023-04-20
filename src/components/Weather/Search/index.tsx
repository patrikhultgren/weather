import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import Close from 'components/Icon/Close'
import { IPosition } from 'utils/types'
import { IWeather } from 'utils/types'

interface IProps {
  weather: IWeather
}

export default function Search({ weather }: IProps) {
  const {
    searchHandler,
    status: { isFullscreen },
  } = weather

  return searchHandler.active ? (
    <div className="px-4">
      <div className="flex mt-4">
        <form onSubmit={searchHandler.onSubmitSearch} className="flex w-full">
          <input
            type="text"
            placeholder="Sök efter en plats"
            className="block px-4 py-3 w-full"
            autoFocus
            value={searchHandler.searchTerm}
            onChange={searchHandler.onChangeSearchTerm}
            onBlur={searchHandler.onSubmitSearch}
          />
          {searchHandler.searchTerm && (
            <button
              type="button"
              data-ref="reset-search-term"
              className="bg-slate-100 py-2 px-4 hover:bg-slate-200 border-r border-r-slate-300"
              onClick={searchHandler.resetSearchTerm}
            >
              <Close title="Rensa sökning" />
            </button>
          )}
          <button
            type="submit"
            className="bg-slate-100 py-2 px-4 hover:bg-slate-200"
          >
            <SearchIcon />
          </button>
        </form>
        <button
          type="button"
          data-ref="close-search"
          className="text-black z-10 right-0 w-14 ml-2 text-xl bg-slate-100 py-2.5 flex items-center justify-center"
          onClick={searchHandler.closeSearch}
        >
          <Close title="Stäng sök" />
        </button>
      </div>
      {searchHandler.searchResults.response && (
        <ul className="overflow-auto mt-4">
          {searchHandler.searchResults.response.map((searchResult) => (
            <li
              role="button"
              className="px-4 odd:bg-white even:bg-slate-200 hover:bg-slate-700 hover:text-white py-3 truncate"
              key={`${searchResult.latitude}_${searchResult.longitude}`}
              onClick={() => searchHandler.onSelectSearchResult(searchResult)}
            >
              {searchResult.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  ) : (
    <div className="fixed bottom-0 left-0 bg-gray-300 w-full z-10">
      <button
        type="button"
        className={classNames(
          'mx-auto z-10 bg-gray-100 hover:bg-gray-200 text-black h-12 w-12 flex items-center justify-center',
          { 'mb-6': isFullscreen }
        )}
        onClick={searchHandler.openSearch}
      >
        <SearchIcon />
      </button>
    </div>
  )
}
