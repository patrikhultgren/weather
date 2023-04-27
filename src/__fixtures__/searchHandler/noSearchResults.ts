import { ISearchHandler } from 'utils/types'

const data: ISearchHandler = {
  searchResults: {
    response: {
      type: 'searchResults',
      positions: [],
    },
    loading: false,
    finished: true,
    error: null,
  },
  searchTerm: 'SearchWordGivingNoResults',
  selectedIndex: null,
  onSubmitSearch: () => null,
  onChangeSearchTerm: () => null,
  onSelectSearchResult: () => null,
  closeSearch: () => null,
  resetSearchTerm: () => null,
  onKeyDown: () => null,
}

export default data
