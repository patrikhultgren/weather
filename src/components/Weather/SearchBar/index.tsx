interface IProps {
  searchHandler: any
}

export default function SearchBar({ searchHandler }: IProps) {
  return (
    <>
      <form onSubmit={searchHandler.onSubmitSearch} className="flex mt-4">
        <input
          type="text"
          placeholder="Sök efter en plats"
          className="block px-4 basis-1/2"
          value={searchHandler.searchTerm}
          onChange={searchHandler.onChangeSearchTerm}
        />
        <button
          type="submit"
          className="bg-slate-300 py-2 px-4 basis-1/2 hover:bg-slate-400"
        >
          Sök
        </button>
      </form>
      {searchHandler.searchResults.response && (
        <ul>
          {searchHandler.searchResults.response.map((searchResult: any) => (
            <li
              key={searchResult.place_id}
              onClick={() => searchHandler.onSelectSearchResult(searchResult)}
            >
              {searchResult.display_name}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
