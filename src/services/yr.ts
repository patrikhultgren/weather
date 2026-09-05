import { YR_WEATHER_FORECAST_API_URL } from 'config'

export const getForecastUrl = (latitude: number, longitude: number): string =>
  `${YR_WEATHER_FORECAST_API_URL}?lat=${latitude}&lon=${longitude}`
