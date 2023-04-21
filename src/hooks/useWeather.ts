import { useEffect, useMemo, useState } from 'react'
import { getPositions } from 'utils/position'
import { IPosition, IWeather } from 'utils/types'
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

  return useMemo(
    () => ({
      city: position.city,
      days: forecast.response,
      geoPosition,
      searchHandler,
      error:
        geoPosition.error ||
        address.error ||
        forecast.error ||
        searchHandler.searchResults.error,
      status: {
        online,
        isFullscreen,
        loading:
          geoPosition.loading ||
          address.loading ||
          forecast.loading ||
          searchHandler.searchResults.loading,
        type: forecast.response ? 'spinner' : 'placeholder',
      },
    }),
    [
      geoPosition,
      address,
      position,
      forecast,
      online,
      isFullscreen,
      searchHandler,
    ]
  )
}

export default useWeather
