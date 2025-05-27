import SearchIcon from 'common/Icon/Search'
import Close from 'common/Icon/Close'
import { ISearchHandler } from 'utils/types'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  searchHandler: ISearchHandler
}

export default function Search({ searchHandler }: IProps) {
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
          arial-label={t('clear-search')}
          data-ref="reset-search-term"
          className="bg-slate-100 py-2 px-4 hover:bg-slate-200 border-r border-r-slate-300"
          onClick={searchHandler.resetSearchTerm}
        >
          <Close title={t('clear-search')} />
        </button>
      )}
      <button
        type="submit"
        className="bg-slate-100 py-2 px-4 hover:bg-slate-200"
      >
        <SearchIcon />
        <span className="sr-only">{t('search')}</span>
      </button>
    </form>
  )
}
