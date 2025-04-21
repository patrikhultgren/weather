import { useEffect, useMemo, useState, useCallback } from 'react'
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
  const [userHasApprovedToShareLocation, setUserHasApprovedToShareLocation] =
    useState<boolean>(false)

  const geoPosition = useGeoPosition({
    positionsAreLoaded,
    positions,
    setPositions,
    setUserHasApprovedToShareLocation,
  })

  const address = useAddress({
    position,
    setPositions,
  })

  const forecast = useForecast({
    latitude: position.latitude,
    longitude: position.longitude,
  })

  const weatherChange = useWeatherChange({
    days: forecast.response,
  })

  useEffect(() => {
    const positionsFromLocalStorage = getPositions()
    setPositions(positionsFromLocalStorage)
    setPositionsAreLoaded(true)
  }, [])

  const hasPositionFoundBySearch = useMemo(
    () => positions.some((position) => position.status === 'foundBySearch'),
    [positions]
  )

  const showUseMyLocation = useMemo(
    () => userHasApprovedToShareLocation && hasPositionFoundBySearch,
    [userHasApprovedToShareLocation, hasPositionFoundBySearch]
  )

  const activateMyLocation = useCallback(() => {
    setPositions([])
  }, [setPositions])

  usePersistPositions(positionsAreLoaded, positions)

  return useMemo(
    () => ({
      city: position.city,
      days: forecast.response,
      geoPosition,
      positions,
      weatherChange,
      error: address.error || forecast.error,
      showUseMyLocation,
      activateMyLocation,
      setPositions,
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
      forecast,
      weatherChange,
      online,
      isFullscreen,
      showUseMyLocation,
      activateMyLocation,
      setPositions,
    ]
  )
}

export default useApp
