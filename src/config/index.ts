import {
  ClearSkyDay,
  ClearSkyNight,
  Cloudy,
  FairDay,
  FairNight,
  Fog,
  HeavySnowShowersPolarTwilight,
  LightRain,
  LightSleet,
  LightSnow,
  PartlyCloudyDay,
  PartlyCloudyNight,
  Rain,
  Sleet,
  Snow,
} from '@patrikhultgren/react-weather-icons'

export const FORECAST_API_URL = process.env.REACT_APP_FORECAST_API_URL || ''

export const ADDRESS_API_URL = process.env.REACT_APP_ADDRESS_API_URL || ''

export const SEARCH_API_URL = process.env.REACT_APP_SEARCH_API_URL || ''
export const SEARCH_API_KEY = process.env.REACT_APP_SEARCH_API_KEY || ''

export const POSITIONS_STORAGE_KEY = 'positions_v4'

export const weathers: { [key: string]: { Icon: any; title: string } } = {
  partlycloudy_night: { Icon: PartlyCloudyNight, title: 'Delvis monlig natt' },
  fair_night: { Icon: FairNight, title: 'Delvis monlig natt' },
  clearsky_night: { Icon: ClearSkyNight, title: 'Klar natt' },
  clearsky_day: { Icon: ClearSkyDay, title: 'Soligt' },
  partlycloudy_day: { Icon: PartlyCloudyDay, title: 'Delvis monligt' },
  cloudy: { Icon: Cloudy, title: 'Monligt' },
  lightsnow: { Icon: LightSnow, title: 'Lite snö' },
  lightrain: { Icon: LightRain, title: 'Duggregn' },
  snow: { Icon: Snow, title: 'Snö' },
  fog: { Icon: Fog, title: 'Dimma' },
  lightsleet: { Icon: LightSleet, title: 'Lätt snöblandat regn' },
  fair_day: { Icon: FairDay, title: 'Delvis monligt' },
  sleet: { Icon: Sleet, title: 'Snöblandet regn' },
  rain: { Icon: Rain, title: 'Regn' },
  heavysnowshowers_polartwilight: {
    Icon: HeavySnowShowersPolarTwilight,
    title: 'Kraftiga snöskurar under polarskymning',
  },
}
