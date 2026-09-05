import type { ChangeEventHandler, Dispatch, SetStateAction } from 'react'
import type { IError, IQuery } from './query'
import type { IGeoPosition, IPosition, ISearchResults } from './location'
import type { ITimeSerie, IWeatherChange } from './forecast'

export interface IAppStatus {
  online: boolean
  isFullscreen: boolean
  loading: boolean
  finished: boolean
}

export interface IApp {
  city: string
  days: Array<Array<ITimeSerie>> | null
  updated_at: string | null
  status: IAppStatus
  error: IError | null
  geoPosition: IGeoPosition
  positions: Array<IPosition>
  weatherChange: IWeatherChange | null
  showUseMyLocation: boolean
  activateMyLocation: () => void
  setPositions: Dispatch<SetStateAction<Array<IPosition>>>
}

export interface ISearchHandler {
  searchResults: IQuery<ISearchResults>
  searchTerm: string
  selectedIndex: number | null
  onSubmitSearch: (event: React.SyntheticEvent) => void
  onChangeSearchTerm: ChangeEventHandler<HTMLInputElement>
  onSelectSearchResult: (searchResult: IPosition) => void
  closeSearch: () => void
  resetSearchTerm: () => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
