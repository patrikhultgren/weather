export class StatusError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'StatusError'
    this.status = status
  }
}

const getHeader = (response: any, header: string): string => {
  if (response.headers) {
    const result = response.headers.get(header)

    if (result) {
      return result
    }
  }

  return ''
}

const checkStatus = (response: any) => {
  if (response.ok) {
    return response
  }

  throw new StatusError(`Status error: ${response.status}`, response.status)
}

const parseJSON = (response: any) => {
  const contentType = getHeader(response, 'content-type')

  // To check that response not is empty
  if (contentType.indexOf('json') !== -1) {
    return response.json()
  }

  return null
}

interface IRequestParams {
  endpoint: string
  method?: string
  contentType?: string
  data?: any
  headers?: any
  credentials?: string
}

const request = async ({
  endpoint,
  method = 'GET',
  contentType = 'application/json',
  data = null,
  headers = {},
  credentials = 'same-origin',
}: IRequestParams): Promise<any> => {
  let options: any = {
    method,
    mode: 'cors',
    headers,
    credentials,
  }

  if (contentType !== 'multipart/form-data') {
    options.headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': contentType,
      ...headers,
    }
  }

  if (data) {
    options.body =
      contentType === 'application/json' ? JSON.stringify(data) : data
  }

  return fetch(endpoint, options).then(checkStatus).then(parseJSON)
}

export default request
