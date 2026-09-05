import type { IError } from 'types'

export class StatusError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'StatusError'
    this.status = status
  }
}

const hasJsonBody = (response: Response): boolean =>
  (response.headers.get('content-type') || '').includes('json')

/**
 * Fetches JSON. Resolves with null when the response has no JSON body, throws
 * a StatusError carrying the http status when the response is not ok.
 */
export const getJson = async <TResponse>(
  url: string,
  signal?: AbortSignal
): Promise<TResponse | null> => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'same-origin',
    headers: { Accept: 'application/json, text/plain, */*' },
    signal,
  })

  if (!response.ok) {
    throw new StatusError(`Status error: ${response.status}`, response.status)
  }

  return hasJsonBody(response) ? ((await response.json()) as TResponse) : null
}

export const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'AbortError'

/**
 * Narrows anything thrown into the plain error shape the UI renders. Duck
 * typing rather than instanceof, because GeolocationPositionError and friends
 * carry a message without extending Error.
 */
export const toError = (error: unknown): IError => {
  if (typeof error === 'object' && error !== null) {
    const candidate = error as {
      name?: unknown
      message?: unknown
      status?: unknown
    }

    if (typeof candidate.message === 'string') {
      return {
        name: typeof candidate.name === 'string' ? candidate.name : 'Error',
        message: candidate.message,
        ...(typeof candidate.status === 'number'
          ? { status: candidate.status }
          : {}),
      }
    }
  }

  return { name: 'Error', message: String(error) }
}
