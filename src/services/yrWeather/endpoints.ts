import { YR_WEATHER_FORECAST_API_URL } from 'config'

const endpoints = {
  getForecastUrl: (latitude: number, longitude: number): string =>
    `${YR_WEATHER_FORECAST_API_URL}/?lat=${latitude}&lon=${longitude}`,
}

export default endpoints
