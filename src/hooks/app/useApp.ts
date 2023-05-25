import { useEffect, useMemo, useState } from 'react'
import { getPositions } from 'utils/position'
import { IPosition, IApp } from 'utils/types'
import useGeoPosition from './useGeoPosition'
import useAddress from './useAddress'
import useForecast from './useForecast'
import usePersistPositions from './usePersistPositions'
import useIsFullscreen from './useIsFullscreen'
import useOnline from './useOnline'
import useFirstPosition from './useFirstPosition'
import useWeatherChange from './useWeatherChange'

const useApp = (): IApp => {
  const online = useOnline()
  const isFullscreen = useIsFullscreen()
  const [positions, setPositions] = useState<Array<IPosition>>([])
  const position = useFirstPosition(positions)
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
    latitude: position.latitude,
    longitude: position.longitude,
  })

  const weatherChange = useWeatherChange(
    forecast.finished ? forecast.response : null
  )

  useEffect(() => {
    const positionsFromLocalStorage = getPositions()
    setPositions(positionsFromLocalStorage)
    setPositionsAreLoaded(true)
  }, [])

  usePersistPositions(positionsAreLoaded, positions)

  return useMemo(
    () => ({
      city: position.city,
      days: forecast.response,
      geoPosition,
      positions,
      setPositions,
      weatherChange,
      error: address.error || forecast.error,
      status: {
        online,
        isFullscreen,
        loading: geoPosition.loading || address.loading || forecast.loading,
        finished: geoPosition.finished && address.finished && forecast.finished,
      },
    }),
    [
      geoPosition,
      address,
      position,
      positions,
      setPositions,
      forecast,
      weatherChange,
      online,
      isFullscreen,
    ]
  )
}

export default useApp
