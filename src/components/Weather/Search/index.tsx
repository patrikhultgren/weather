import { useMemo } from 'react'
import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import Close from 'components/Icon/Close'
import { IWeather } from 'utils/types'
import { useId } from 'react'
import useScrollDirection from 'hooks/useScrollDirection'

interface IProps {
  weather: IWeather
}

export default function Search({ weather }: IProps) {
  const searchResultsId = useId()
  const scrollDirection = useScrollDirection()

  const {
    searchHandler,
    status: { isFullscreen },
  } = weather

  const { response, finished } = searchHandler.searchResults

  const hasSearchResults = useMemo(
    () => Boolean(response?.positions?.length),
    [response]
  )

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
      {hasSearchResults && (
        <div id={searchResultsId}>
          <h2 className="p-4 py-2 bg-gray-300 mt-4 font-bold">
            {response?.type === 'searchResults'
              ? 'Sökresultat'
              : 'Tidigare platser'}
          </h2>
          <ul className="overflow-auto">
            {response?.positions?.map((searchResult) => (
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
      {hasSearchResults && finished && (
        <p id={searchResultsId} className="p-4 mt-4 bg-white font-bold">
          Typiskt, hittade inga sökresultat. Testa gärna att söka på något
          annat.
        </p>
      )}
    </div>
  ) : (
    <div
      className={classNames(
        'fixed md:static left-0 bg-gray-300 w-full z-10 bg-opacity-50 transition-all ease-in-out duration-300',
        scrollDirection === 'down' ? '-bottom-36' : 'bottom-0'
      )}
    >
      <button
        type="button"
        className={classNames(
          'mx-auto z-10 shadow-md rounded md:rounded-none md:shadow-none bg-slate-600 md:bg-gray-100 md:hover:bg-white text-white md:text-black h-12 w-12 md:w-auto md:px-4 flex items-center justify-center',
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
