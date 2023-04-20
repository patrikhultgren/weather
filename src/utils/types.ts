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
