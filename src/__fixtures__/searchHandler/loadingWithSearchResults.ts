import { ISearchHandler } from 'utils/types'

const data: ISearchHandler = {
  searchResults: {
    response: {
      type: 'searchResults',
      positions: [
        {
          latitude: 59.3251172,
          longitude: 18.0710935,
          city: 'Stockholm, Stockholms kommun, Stockholms län, 111 29, Sverige',
          status: 'foundBySearch',
        },
        {
          latitude: 59.3371186,
          longitude: 17.9860453,
          city: 'Stockholms kommun, Stockholms län, Sverige',
          status: 'foundBySearch',
        },
        {
          latitude: 47.042522,
          longitude: -68.139954,
          city: 'Stockholm, Aroostook County, Maine, 04783, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 50.6574522,
          longitude: -102.3026019,
          city: 'Stockholm, Division No. 5, Saskatchewan, S0A 3Y0, Kanada',
          status: 'foundBySearch',
        },
        {
          latitude: 60.15675735,
          longitude: 20.520943709596644,
          city: 'Stockholm, Vårdö, Ålands skärgård, Landskapet Åland, Finland',
          status: 'foundBySearch',
        },
        {
          latitude: 44.4833009,
          longitude: -92.2621214,
          city: 'Stockholm, Pepin County, Wisconsin, 54769, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 44.7507485,
          longitude: -74.8502288,
          city: 'Town of Stockholm, Saint Lawrence County, New York, 13697, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 41.0895413,
          longitude: -74.5171024,
          city: 'Stockholm, Hardyston Township, Sussex County, New Jersey, 07460, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 45.036352,
          longitude: -94.2210911,
          city: 'Stockholm, Stockholm Township, Wright County, Minnesota, 55321, USA',
          status: 'foundBySearch',
        },
        {
          latitude: 61.5518093,
          longitude: 21.70328463452381,
          city: 'Stockholm, Inderö, Björneborg, Björneborgs ekonomiska region, Satakunda, Sydvästra Finlands regionförvaltningsverk, Fasta Finland, Finland',
          status: 'foundBySearch',
        },
      ],
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
