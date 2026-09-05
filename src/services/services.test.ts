import { describe, expect, it } from 'vitest'
import { getAddressUrl } from './bigDataCloud'
import { getSearchUrl } from './locationIQ'
import { getForecastUrl } from './yr'

describe('getForecastUrl', () => {
  it('passes the coordinates as lat and lon', () => {
    expect(getForecastUrl(59.33, 18.07)).toContain('lat=59.33&lon=18.07')
  })
})

describe('getAddressUrl', () => {
  it('asks for the locality in the current language', () => {
    const url = getAddressUrl(59.33, 18.07, 'sv')

    expect(url).toContain('latitude=59.33')
    expect(url).toContain('longitude=18.07')
    expect(url).toContain('localityLanguage=sv')
  })
})

describe('getSearchUrl', () => {
  it('trims the search term', () => {
    expect(getSearchUrl('  Stockholm  ')).toContain('q=Stockholm&')
  })

  // An unescaped & or # used to truncate or corrupt the query.
  it('escapes characters that would otherwise break the query string', () => {
    const url = getSearchUrl('Foo & Bar #1')

    expect(url).toContain('q=Foo%20%26%20Bar%20%231')
  })

  it('asks for json', () => {
    expect(getSearchUrl('Stockholm')).toContain('format=json')
  })
})
