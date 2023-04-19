import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import Close from 'components/Icon/Close'
import useIsFullscreen from 'hooks/useIsFullscreen'

const SEARCH_RESULT_HEIGHT = 48

interface IProps {
  searchHandler: any
}

export default function Search({ searchHandler }: IProps) {
  const isFullscreen = useIsFullscreen()

  const numberOfItemsToShow = Math.floor(
    window.innerHeight - 150 / SEARCH_RESULT_HEIGHT
  )

  return searchHandler.active ? (
    <div
      className={classNames(
        'z-20 w-full px-4 flex flex-col justify-end absolute top-0 left-0 h-[100vh] md:left-1/2 md:max-w-[700px] md:transform md:-translate-x-1/2',
        isFullscreen ? 'pb-10' : 'pb-4'
      )}
    >
      {searchHandler.searchResults.response && (
        <ul
          className="overflow-auto mb-4"
          style={{
            maxHeight: `${numberOfItemsToShow * SEARCH_RESULT_HEIGHT}px`,
          }}
        >
          {searchHandler.searchResults.response.map((searchResult: any) => (
            <li
              role="button"
              className="px-4 even:bg-white odd:bg-slate-200 hover:bg-slate-700 hover:text-white py-3 truncate"
              key={searchResult.place_id}
              onClick={() => searchHandler.onSelectSearchResult(searchResult)}
            >
              {searchResult.display_name}
            </li>
          ))}
        </ul>
      )}
      <div className="flex">
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
        {searchHandler.active && (
          <button
            type="button"
            data-ref="close-search"
            className="text-black z-10 right-0 w-14 ml-2 text-xl bg-slate-100 py-2.5 flex items-center justify-center"
            onClick={searchHandler.closeSearch}
          >
            <Close title="Stäng sök" />
          </button>
        )}
      </div>
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
