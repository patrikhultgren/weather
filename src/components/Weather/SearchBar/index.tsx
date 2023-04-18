import Search from 'components/Icon/Search'
import Close from 'components/Icon/Close'

interface IProps {
  searchHandler: any
}

export default function SearchBar({ searchHandler }: IProps) {
  return (
    <>
      {searchHandler.active && (
        <div className="fixed inset-0 bg-white h-full w-full z-10" />
      )}
      {!searchHandler.active && (
        <div className="fixed bottom-0 left-0 bg-slate-600 w-full z-10">
          <button
            type="button"
            className="mx-auto z-10 bg-slate-600 hover:bg-slate-700 text-white h-16 w-16 border-x flex items-center justify-center"
            onClick={() => searchHandler.setActive(true)}
          >
            <Search />
          </button>
        </div>
      )}
      {searchHandler.active && (
        <button
          type="button"
          className="fixed top-0 text-black z-20 right-0 w-[calc(100%-2rem)] mx-4 mt-4 fixed text-xl bg-slate-100 border-4 border-slate-300 h-10 flex items-center justify-center"
          onClick={searchHandler.resetSearch}
        >
          <Close title="Stäng sök" />
        </button>
      )}
      <div className="z-20 w-full fixed static bottom-4 px-4">
        <div className="md:px-0 relative">
          {searchHandler.searchResults.response && (
            <ul className="overflow-auto h-[calc(100vh-1rem-2.5rem-2.5rem-1.5rem)]">
              {searchHandler.searchResults.response.map((searchResult: any) => (
                <li
                  role="button"
                  className="px-4 even:bg-gray-100 border-b py-2"
                  key={searchResult.place_id}
                  onClick={() =>
                    searchHandler.onSelectSearchResult(searchResult)
                  }
                >
                  {searchResult.display_name}
                </li>
              ))}
            </ul>
          )}
          {searchHandler.active && (
            <form
              onSubmit={searchHandler.onSubmitSearch}
              className="flex border-4 border-slate-300"
            >
              <input
                type="text"
                placeholder="Sök efter en plats"
                className="block px-4 w-full h-10"
                value={searchHandler.searchTerm}
                onChange={searchHandler.onChangeSearchTerm}
                onBlur={searchHandler.onSubmitSearch}
              />
              {searchHandler.searchTerm && (
                <button
                  type="button"
                  className="bg-slate-100 py-2 px-4 hover:bg-slate-200 border-r border-r-slate-300"
                  onClick={searchHandler.resetSearch}
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
          )}
        </div>
      </div>
    </>
  )
}
