import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import Close from 'components/Icon/Close'
import { IWeather } from 'utils/types'
import { useId } from 'react'

interface IProps {
  weather: IWeather
}

export default function Search({ weather }: IProps) {
  const searchResultsId = useId()

  const {
    searchHandler,
    status: { isFullscreen },
  } = weather

  const { response } = searchHandler.searchResults

  return searchHandler.active ? (
    <div className="px-4 max-w-[700px] mx-auto">
      <div className="flex mt-4">
        <form
          role="search"
          className="flex w-full"
          onSubmit={searchHandler.onSubmitSearch}
        >
          <input
            autoFocus
            type="text"
            placeholder="Sök efter en plats"
            aria-label="Sök efter en plats"
            className="block px-4 py-3 w-full"
            autoComplete="off"
            autoCapitalize="off"
            name="search"
            spellCheck={false}
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
      {response?.positions?.[0] && (
        <div id={searchResultsId}>
          <h2 className="p-4 py-2 bg-gray-300 mt-4 font-bold">
            {response.type === 'searchResults'
              ? 'Sökresultat'
              : 'Tidigare platser'}
          </h2>
          <ul className="overflow-auto">
            {response.positions.map((searchResult) => (
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
        </div>
      )}
    </div>
  ) : (
    <div className="fixed md:static bottom-0 left-0 bg-gray-300 w-full z-10">
      <button
        type="button"
        className={classNames(
          'mx-auto z-10 bg-gray-100 hover:bg-gray-200 text-black h-12 w-12 md:w-auto md:px-4 flex items-center justify-center',
          { 'mb-6': isFullscreen }
        )}
        onClick={searchHandler.openSearch}
      >
        <SearchIcon className="md:mr-2" />
        <span className="hidden md:inline">Sök efter plats</span>
      </button>
    </div>
  )
}
