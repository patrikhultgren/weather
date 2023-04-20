export interface IError {
  name: string
  message: string
  status?: number
}

export interface IQuery<IResponse> {
  response: IResponse | null
  loading: boolean
  error: any
  searchHandler?: any
}

export interface IPosition {
  latitude: number
  longitude: number
  city: string
}

export interface ILocationIQPosition {
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  boundingbox: string
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon: string
}
