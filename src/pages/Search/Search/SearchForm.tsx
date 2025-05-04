import SearchIcon from 'common/Icon/Search'
import Close from 'common/Icon/Close'
import { ISearchHandler } from 'utils/types'

interface IProps {
  searchHandler: ISearchHandler
}

export default function Search({ searchHandler }: IProps) {
  return (
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
        onKeyDown={searchHandler.onKeyDown}
      />
      {searchHandler.searchTerm && (
        <button
          type="button"
          arial-label="Rensa sökning"
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
        <span className="sr-only">Sök</span>
      </button>
    </form>
  )
}
