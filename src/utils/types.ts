export interface IError {
  name: string
  message: string
  status?: number
}

export interface IQuery<IResponse> {
  response: IResponse | null
  expires: Date | null
  loading: boolean
  error: any
}
