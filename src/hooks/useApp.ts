import { useEffect, useMemo, useState } from 'react'
import { getPositions } from 'utils/position'
import { IPosition, IApp } from 'utils/types'
import useGeoPosition from 'hooks/useGeoPosition'
import useAddress from 'hooks/useAddress'
import useForecast from 'hooks/useForecast'
import usePersistPositions from 'hooks/usePersistPositions'
import useIsFullscreen from 'hooks/useIsFullscreen'
import useOnline from 'hooks/useOnline'
import useFirstPosition from './useFirstPosition'

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
      error: geoPosition.error || address.error || forecast.error,
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
      online,
      isFullscreen,
    ]
  )
}

export default useApp
