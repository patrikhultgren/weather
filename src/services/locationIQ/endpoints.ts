import { YR_WEATHER_FORECAST_API_URL, LOQATION_IQ_API_KEY } from 'config'

const endpoints = {
  searchUrl: (searchTerm: string): string =>
    `${YR_WEATHER_FORECAST_API_URL}?key=${LOQATION_IQ_API_KEY}&q=${searchTerm.trim()}&format=json`,
}

export default endpoints
