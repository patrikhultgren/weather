import { afterEach, describe, expect, it, vi } from 'vitest'
import { StatusError, getJson, isAbortError, toError } from './http'

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getJson', () => {
  it('returns the parsed body', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ city: 'Stockholm' }))
    )

    await expect(getJson('/address')).resolves.toEqual({ city: 'Stockholm' })
  })

  it('returns null when the response carries no json', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        })
      )
    )

    await expect(getJson('/address')).resolves.toBeNull()
  })

  it('throws a StatusError carrying the http status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, 404)))

    await expect(getJson('/search')).rejects.toMatchObject({
      name: 'StatusError',
      status: 404,
    })
  })

  it('passes the abort signal through to fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({}))
    vi.stubGlobal('fetch', fetchMock)

    const controller = new AbortController()
    await getJson('/search', controller.signal)

    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      signal: controller.signal,
    })
  })
})

describe('toError', () => {
  it('keeps the status of a StatusError', () => {
    expect(toError(new StatusError('Status error: 404', 404))).toEqual({
      name: 'StatusError',
      message: 'Status error: 404',
      status: 404,
    })
  })

  it('narrows a plain error', () => {
    expect(toError(new TypeError('boom'))).toEqual({
      name: 'TypeError',
      message: 'boom',
    })
  })

  it('narrows a GeolocationPositionError, which does not extend Error', () => {
    const geolocationError = {
      code: 1,
      message: 'User denied Geolocation',
      PERMISSION_DENIED: 1,
    }

    expect(toError(geolocationError)).toEqual({
      name: 'Error',
      message: 'User denied Geolocation',
    })
  })

  it('copes with something that is not an error at all', () => {
    expect(toError('just a string')).toEqual({
      name: 'Error',
      message: 'just a string',
    })
  })
})

describe('isAbortError', () => {
  it('recognises an aborted fetch', () => {
    expect(isAbortError(new DOMException('Aborted', 'AbortError'))).toBe(true)
  })

  it('does not mistake other errors for aborts', () => {
    expect(isAbortError(new Error('AbortError'))).toBe(false)
  })
})
