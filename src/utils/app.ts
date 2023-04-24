import { IApp, IAppState } from 'utils/types'

export const getAppState = (app: IApp): IAppState => {
  const { days, status, geoPosition } = app

  if (geoPosition.error && !days) {
    return 'geo-error'
  } else if (status.loading && status.type === 'placeholder') {
    return 'placeholder'
  } else if (days) {
    return 'show-forecast'
  } else if (!status.online) {
    return 'offline'
  }

  return 'go-to-search-info'
}
