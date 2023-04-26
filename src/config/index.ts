import {
  ClearSkyDay,
  ClearSkyNight,
  ClearSkyPolarTwilight,
  Cloudy,
  FairDay,
  FairNight,
  FairPolarTwilight,
  Fog,
  HeavyRain,
  HeavyRainAndThunder,
  HeavyRainShowersDay,
  HeavySnowShowersPolarTwilight,
  HeavyRainShowersAndThunderDay,
  HeavyRainShowersAndThunderNight,
  HeavyRainShowersAndThunderPolarTwilight,
  LightRain,
  LightSleet,
  LightSnow,
  PartlyCloudyDay,
  PartlyCloudyNight,
  Rain,
  RainShowersNight,
  Sleet,
  Snow,
} from '@patrikhultgren/react-weather-icons'

export const FORECAST_API_URL = process.env.REACT_APP_FORECAST_API_URL || ''

export const ADDRESS_API_URL = process.env.REACT_APP_ADDRESS_API_URL || ''

export const SEARCH_API_URL = process.env.REACT_APP_SEARCH_API_URL || ''
export const SEARCH_API_KEY = process.env.REACT_APP_SEARCH_API_KEY || ''

export const POSITIONS_STORAGE_KEY = 'positions_v4'
