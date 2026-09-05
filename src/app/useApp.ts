import { useCallback, useMemo, useState } from 'react'
import useIsFullscreen from 'hooks/useIsFullscreen'
import useOnline from 'hooks/useOnline'
import useAddress from 'features/location/useAddress'
import useCurrentPosition from 'features/location/useCurrentPosition'
import useGeoPosition from 'features/location/useGeoPosition'
import usePersistPositions from 'features/location/usePersistPositions'
import { readPositions } from 'features/location/positions'
import useForecast from 'features/forecast/useForecast'
import useWeatherChange from 'features/forecast/useWeatherChange'
import type { IApp, IPosition } from 'types'

/** Wires the location, address and forecast state together for the pages. */
const useApp = (): IApp => {
  const online = useOnline()
  const isFullscreen = useIsFullscreen()

  // Storage is synchronous, so the stored positions are there from the start.
  const [positions, setPositions] = useState<Array<IPosition>>(readPositions)

  const position = useCurrentPosition(positions)

  const geoPosition = useGeoPosition({ positions, setPositions })

  const address = useAddress({ position, setPositions })

  const forecast = useForecast({
    latitude: position.latitude,
    longitude: position.longitude,
  })

  const weatherChange = useWeatherChange({
    days: forecast.response?.timeseries ?? null,
  })

  usePersistPositions(positions)

  const showUseMyLocation = useMemo(
    () =>
      geoPosition.userHasApprovedToShareLocation &&
      positions.some((item) => item.status === 'foundBySearch'),
    [geoPosition.userHasApprovedToShareLocation, positions]
  )

  /** Clearing the positions makes the geolocation watcher take over again. */
  const activateMyLocation = useCallback(() => setPositions([]), [])

  return useMemo(
    () => ({
      city: position.city,
      days: forecast.response?.timeseries ?? null,
      updated_at: forecast.response?.updated_at ?? null,
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
      position.city,
      geoPosition,
      address,
      positions,
      forecast,
      weatherChange,
      online,
      isFullscreen,
      showUseMyLocation,
      activateMyLocation,
    ]
  )
}

export default useApp
