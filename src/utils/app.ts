import { IApp, IActiveAction } from 'utils/types'

export const getActiveAction = (app: IApp): IActiveAction => {
  const { days, status, geoPosition } = app

  if (geoPosition.error && !days) {
    return 'geo-error'
  } else if (days) {
    return 'show-forecast'
  } else if (!status.online) {
    return 'offline'
  }

  return 'show-go-to-search-info'
}
