import { IApp } from 'utils/types'

const data: IApp = {
  setPositions: () => null,
  showUseMyLocation: false,
  updated_at: null,
  activateMyLocation: () => null,
  city: '',
  days: null,
  geoPosition: {
    error: null,
    loading: true,
    finished: true,
    userHasApprovedToShareLocation: false,
  },
  weatherChange: null,
  positions: [
    {
      latitude: 60.16,
      longitude: 20.52,
      city: 'Stockholm, Vårdö, Ålands skärgård, Landskapet Åland, Finland',
      status: 'foundBySearch',
    },
    {
      latitude: 44.48,
      longitude: -92.26,
      city: 'Stockholm, Pepin County, Wisconsin, 54769, USA',
      status: 'foundBySearch',
    },
    {
      latitude: 59.26,
      longitude: 18.13,
      city: 'Stockholm',
      status: 'foundByAllowingPosition',
    },
    {
      latitude: 41.09,
      longitude: -74.52,
      city: 'Stockholm, Hardyston Township, Sussex County, New Jersey, 07460, USA',
      status: 'foundBySearch',
    },
    {
      latitude: 47.04,
      longitude: -68.14,
      city: 'Stockholm, Aroostook County, Maine, 04783, USA',
      status: 'foundBySearch',
    },
  ],
  error: null,
  status: {
    online: true,
    isFullscreen: false,
    loading: true,
    finished: false,
  },
}

export default data
