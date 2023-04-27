import { ISearchHandler } from 'utils/types'

const data: ISearchHandler = {
  searchResults: {
    loading: false,
    error: null,
    finished: true,
    response: {
      type: 'history',
      positions: [
        {
          latitude: 44.48,
          longitude: -92.26,
          city: 'Stockholm, Pepin County, Wisconsin, 54769, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 59.26,
          longitude: 18.13,
          city: 'Stockholm',
          status: 'foundByAllowingPosition',
        },
        {
          latitude: 41.09,
          longitude: -74.52,
          city: 'Stockholm, Hardyston Township, Sussex County, New Jersey, 07460, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 47.04,
          longitude: -68.14,
          city: 'Stockholm, Aroostook County, Maine, 04783, USA',
          status: 'foundBySearch',
        },
      ],
    },
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
