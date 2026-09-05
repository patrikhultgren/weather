import { useEffect, useMemo } from 'react'
import useFetch from 'hooks/useFetch'
import { getAddressUrl } from 'services/bigDataCloud'
import { useTranslation } from 'i18n/context'
import type { IAddress, IPosition, IQuery } from 'types'
import { addPosition } from './positions'

interface IProps {
  position: IPosition
  setPositions: React.Dispatch<React.SetStateAction<Array<IPosition>>>
}

/** Reverse geocodes a position that has coordinates but no city yet. */
const useAddress = ({ position, setPositions }: IProps): IQuery<IAddress> => {
  const { language } = useTranslation()

  const run = useMemo(
    () => Boolean(position.latitude && position.longitude && !position.city),
    [position.latitude, position.longitude, position.city]
  )

  const url = useMemo(
    () => getAddressUrl(position.latitude, position.longitude, language),
    [position.latitude, position.longitude, language]
  )

  const address = useFetch<IAddress>({ url, run })

  const city = address.response?.city

  useEffect(() => {
    if (run && city) {
      setPositions((positions) => addPosition(positions, { ...position, city }))
    }
  }, [run, city, position, setPositions])

  return address
}

export default useAddress
