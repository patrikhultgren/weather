import type { IError } from './query'

export interface ICoordinates {
  latitude: number
  longitude: number
}

/** A single reading from the geolocation API, stamped with when it arrived. */
export interface IFix extends ICoordinates {
  time: number
}

export type PositionStatus =
  'foundBySearch' | 'foundByAllowingPosition' | 'empty'

export interface IPosition extends ICoordinates {
  city: string
  status: PositionStatus
}

export interface IGeoPosition {
  error: IError | null
  loading: boolean
  finished: boolean
  userHasApprovedToShareLocation: boolean
}

export interface ISearchResults {
  positions: Array<IPosition> | null
  type: 'searchResults' | 'history'
}

/** The shape LocationIQ returns for a search hit. */
export interface ILocationIQPosition {
  place_id: string
  lat: string
  lon: string
  display_name: string
}

/** The subset of the BigDataCloud reverse geocode response the app uses. */
export interface IAddress {
  city: string
  locality: string
  countryName: string
  countryCode: string
}
