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

export const weathers: { [key: string]: { Icon: any; title: string } } = {
  clearsky_day: { Icon: ClearSkyDay, title: 'Soligt' },
  clearsky_night: { Icon: ClearSkyNight, title: 'Klar natt' },
  clearsky_polartwilight: {
    Icon: ClearSkyPolarTwilight,
    title: 'Klar natt med polarskymning',
  },
  cloudy: { Icon: Cloudy, title: 'Monligt' },
  fair_day: { Icon: FairDay, title: 'Delvis monligt' },
  fair_night: { Icon: FairNight, title: 'Delvis monlig natt' },
  fair_polartwilight: {
    Icon: FairPolarTwilight,
    title: 'Delvis monlig natt med polarskymning',
  },
  fog: { Icon: Fog, title: 'Dimma' },
  heavyrain: { Icon: HeavyRain, title: 'Mycket regn' },
  heavyrainandthunder: {
    Icon: HeavyRainAndThunder,
    title: 'Mycket regn och åska',
  },
  heavyrainshowers_day: { Icon: HeavyRainShowersDay, title: 'Mycket regn' },
  heavysnowshowers_polartwilight: {
    Icon: HeavySnowShowersPolarTwilight,
    title: 'Kraftiga snöskurar under polarskymning',
  },
  partlycloudy_day: { Icon: PartlyCloudyDay, title: 'Delvis monligt' },
  partlycloudy_night: { Icon: PartlyCloudyNight, title: 'Delvis monlig natt' },
  lightsnow: { Icon: LightSnow, title: 'Lite snö' },
  lightrain: { Icon: LightRain, title: 'Duggregn' },
  lightsleet: { Icon: LightSleet, title: 'Lätt snöblandat regn' },
  sleet: { Icon: Sleet, title: 'Snöblandet regn' },
  snow: { Icon: Snow, title: 'Snö' },
  rain: { Icon: Rain, title: 'Regn' },
  rainshowers_night: { Icon: RainShowersNight, title: 'Regnig natt' },
}
