export interface IError {
  name: string
  message: string
  status?: number
}

export interface IQuery<IResponse> {
  response: IResponse | null
  loading: boolean
  error: any
  expires: Date | null
  searchHandler?: any
}
