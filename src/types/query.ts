export interface IError {
  name: string
  message: string
  status?: number
}

export interface IQuery<TResponse> {
  response: TResponse | null
  loading: boolean
  error: IError | null
  finished: boolean
}
