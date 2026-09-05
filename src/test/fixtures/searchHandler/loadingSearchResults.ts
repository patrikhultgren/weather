import { ISearchHandler } from 'types'

const data: ISearchHandler = {
  searchResults: {
    response: {
      type: 'searchResults',
      positions: [],
    },
    loading: true,
    finished: false,
    error: null,
  },
  searchTerm: 'Stockholm',
  selectedIndex: null,
  onSubmitSearch: () => null,
  onChangeSearchTerm: () => null,
  onSelectSearchResult: () => null,
  closeSearch: () => null,
  resetSearchTerm: () => null,
  onKeyDown: () => null,
}

export default data
