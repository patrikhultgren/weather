export const BIG_DATA_CLOUD_ADDRESS_API_URL =
  process.env.REACT_APP_BIG_DATA_CLOUD_ADDRESS_API_URL || ''

export const YR_WEATHER_FORECAST_API_URL =
  process.env.REACT_APP_YR_WEATHER_FORECAST_API_URL || ''

export const LOQATION_IQ_SEARCH_API_URL =
  process.env.REACT_APP_LOQATION_IQ_SEARCH_API_URL || ''

export const LOQATION_IQ_API_KEY =
  process.env.REACT_APP_LOQATION_IQ_API_KEY || ''

export const POSITIONS_STORAGE_KEY = 'positions_v6'

// Shortest time between two position updates based on the users location.
export const MIN_POSITION_UPDATE_INTERVAL = 60_000

// How far the user has to move before the position is updated. The forecast
// doesn't differ within a few kilometers, so updating more often than this
// only means reloading the same weather.
export const MIN_POSITION_UPDATE_DISTANCE = 5_000

// Above this speed (m/s, roughly 25 km/h) the user is considered to be
// travelling. The position is then left alone until they have settled, since
// the forecast would otherwise be reloaded for every place passed by.
export const MAX_SETTLED_SPEED = 7

// A previous position is only used to derive the speed if it is this recent.
export const MAX_AGE_OF_PREVIOUS_POSITION = 300_000
