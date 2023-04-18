import classNames from 'classnames'
import Search from 'components/Icon/Search'
import Close from 'components/Icon/Close'
import useIsFullscreen from 'hooks/useIsFullscreen'

interface IProps {
  searchHandler: any
}

export default function SearchBar({ searchHandler }: IProps) {
  const isFullscreen = useIsFullscreen()

  return (
    <>
      {searchHandler.active && (
        <div className="fixed inset-0 bg-slate-600 h-full w-full z-10" />
      )}
      {!searchHandler.active && (
        <div className="fixed bottom-0 left-0 bg-slate-600 w-full z-10">
          <button
            type="button"
            className={classNames(
              'mx-auto z-10 bg-slate-500 hover:bg-slate-700 text-white h-12 w-12 flex items-center justify-center',
              { 'mb-6': isFullscreen }
            )}
            onClick={() => searchHandler.setActive(true)}
          >
            <Search />
          </button>
        </div>
      )}
      <div
        className={classNames(
          'z-20 w-full fixed px-4',
          isFullscreen ? 'bottom-10' : 'bottom-4'
        )}
      >
        {searchHandler.active && searchHandler.searchResults.response && (
          <ul className="mb-4 overflow-auto h-[calc(100vh-16rem)]">
            {searchHandler.searchResults.response.map((searchResult: any) => (
              <li
                role="button"
                className="px-4 even:bg-white odd:bg-slate-200 border-b py-3 truncate"
                key={searchResult.place_id}
                onClick={() => searchHandler.onSelectSearchResult(searchResult)}
              >
                {searchResult.display_name}
              </li>
            ))}
          </ul>
        )}
        {searchHandler.active && (
          <div className="flex">
            <form
              onSubmit={searchHandler.onSubmitSearch}
              className="flex w-full"
            >
              <input
                type="text"
                placeholder="Sök efter en plats"
                className="block px-4 py-3 w-full"
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
                <Search />
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
        )}
      </div>
    </>
  )
}
