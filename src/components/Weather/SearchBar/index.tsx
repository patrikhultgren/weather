import Search from 'components/Icon/Search'
import Close from 'components/Icon/Close'

interface IProps {
  searchHandler: any
}

export default function SearchBar({ searchHandler }: IProps) {
  return (
    <>
      {searchHandler.searchResults.response && (
        <button
          type="button"
          className="fixed top-0 left-0 text-black z-20 fixed text-xl bg-slate-100 border-4 border-slate-300 w-full h-10 flex items-center justify-center md:hidden"
          onClick={searchHandler.resetSearch}
        >
          <Close title="Stäng sök" />
        </button>
      )}
      <div className="bg-white z-10 w-full fixed static bottom-0 left-0 max-w-[450px] mx-auto">
        <div className="md:px-0 relative">
          {searchHandler.searchResults.response && (
            <ul className="md:hidden">
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
        </div>
      </div>
    </>
  )
}
