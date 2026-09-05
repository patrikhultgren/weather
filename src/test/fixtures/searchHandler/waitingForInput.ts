import { ISearchHandler } from 'types'

const data: ISearchHandler = {
  searchResults: {
    loading: false,
    error: null,
    finished: true,
    response: { type: 'history', positions: [] },
  },
  searchTerm: '',
  selectedIndex: null,
  onSubmitSearch: () => null,
  onChangeSearchTerm: () => null,
  onSelectSearchResult: () => null,
  closeSearch: () => null,
  resetSearchTerm: () => null,
  onKeyDown: () => null,
}

export default data
