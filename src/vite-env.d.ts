/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly REACT_APP_BIG_DATA_CLOUD_ADDRESS_API_URL?: string
  readonly REACT_APP_YR_WEATHER_FORECAST_API_URL?: string
  readonly REACT_APP_LOQATION_IQ_SEARCH_API_URL?: string
  readonly REACT_APP_LOQATION_IQ_API_KEY?: string
  readonly REACT_APP_BASE_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
