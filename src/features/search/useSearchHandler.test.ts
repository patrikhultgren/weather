import { describe, expect, it } from 'vitest'
import { toPositions } from './useSearchHandler'

const hit = (overrides = {}) => ({
  place_id: '1',
  lat: '59.3251172',
  lon: '18.0710935',
  display_name: 'Stockholm, Sverige',
  ...overrides,
})

describe('toPositions', () => {
  it('maps a LocationIQ hit onto a position', () => {
    expect(toPositions([hit()])).toEqual([
      {
        latitude: 59.3251172,
        longitude: 18.0710935,
        city: 'Stockholm, Sverige',
        status: 'foundBySearch',
      },
    ])
  })

  it('drops hits with unusable coordinates', () => {
    expect(toPositions([hit({ lat: 'nope' }), hit({ lon: '' })])).toEqual([])
  })

  it('copes with a response that is not an array', () => {
    expect(toPositions(undefined as never)).toEqual([])
    expect(toPositions({ error: 'Unauthorized' } as never)).toEqual([])
  })
})
