import { useEffect, useMemo, useState } from 'react'
import { format } from 'utils/date'
import { getPositions } from 'utils/position'
import { IPosition, ITimeSerie, IWeather } from 'utils/types'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'
import useSearchHandler from 'hooks/useSearchHandler'
import usePersistPositions from 'hooks/usePersistPositions'
import useIsFullscreen from 'hooks/useIsFullscreen'
import useOnline from 'hooks/useOnline'
import useFirstPosition from './useFirstPosition'

const useWeather = (): IWeather => {
  const online = useOnline()
  const isFullscreen = useIsFullscreen()
  const [positions, setPositions] = useState<Array<IPosition>>([])
  const position = useFirstPosition(positions)
  const searchHandler = useSearchHandler(positions, setPositions)
  const [positionsAreLoaded, setPositionsAreLoaded] = useState<boolean>(false)
  const geoPosition = useGeoPosition(
    setPositions,
    positionsAreLoaded,
    positions
  )

  const address = useAddress({
    position,
    setPositions,
  })

  const forecast = useForecast({
    latitude: position.latitude?.toFixed(4),
    longitude: position.longitude?.toFixed(4),
  })

  useEffect(() => {
    const positionsFromLocalStorage = getPositions()
    setPositions(positionsFromLocalStorage)

    if (!positionsFromLocalStorage.length) {
      setPositionsAreLoaded(true)
    }
  }, [])

  usePersistPositions(positions)

  return useMemo(() => {
    let weather: IWeather = {
      city: position.city,
      days: null,
      geoPosition,
      searchHandler,
      error: geoPosition.error || address.error || forecast.error,
      status: {
        online,
        isFullscreen,
        loading: geoPosition.loading || address.loading || forecast.loading,
        type: 'placeholder',
      },
    }

    if (forecast.response) {
      const groupDaysByMonth: {
        [key: string]: Array<ITimeSerie>
      } = forecast.response.properties.timeseries.reduce(
        (acc: { [key: string]: Array<ITimeSerie> }, timeSerie) => {
          const key = format(timeSerie.time, 'yyyy-MM-dd')
          return {
            ...acc,
            [key]: acc[key] ? [...acc[key], timeSerie] : [timeSerie],
          }
        },
        {}
      )

      weather.days = Object.keys(groupDaysByMonth).map(
        (key) => groupDaysByMonth[key]
      )

      weather.status.type = 'spinner'
    }

    return weather
  }, [
    geoPosition,
    address,
    position.city,
    forecast,
    online,
    isFullscreen,
    searchHandler,
  ])
}

export default useWeather
