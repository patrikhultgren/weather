import Close from 'components/Icon/Close'
import SearchIcon from 'components/Icon/Search'
import { useTranslation } from 'i18n/context'
import type { ISearchHandler } from 'types'

interface IProps {
  searchHandler: ISearchHandler
}

export default function SearchForm({ searchHandler }: IProps) {
  const { t } = useTranslation()

  return (
    <form
      role="search"
      className="flex w-full"
      onSubmit={searchHandler.onSubmitSearch}
    >
      <input
        autoFocus
        type="text"
        placeholder={t('search-for-a-location')}
        aria-label={t('search-for-a-location')}
        className="block w-full bg-white px-4 py-3 text-black"
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
          aria-label={t('clear-search')}
          data-ref="reset-search-term"
          className="border-r border-r-slate-300 bg-slate-100 px-4 py-2 hover:bg-slate-200"
          onClick={searchHandler.resetSearchTerm}
        >
          <Close />
        </button>
      )}
      <button
        type="submit"
        aria-label={t('search')}
        className="bg-slate-100 px-4 py-2 hover:bg-slate-200"
      >
        <SearchIcon decorative />
      </button>
    </form>
  )
}
