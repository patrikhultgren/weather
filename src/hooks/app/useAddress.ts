import { useEffect, useMemo } from 'react'
import { IQuery } from 'utils/types'
import useFetch from 'hooks/useFetch'
import { addPosition } from 'utils/position'
import { IPosition, IAddress } from 'utils/types'
import endpoints from 'services/bigDataCloud/endpoints'

interface IProps {
  position: IPosition
  setPositions: Function
}

const useAddress = ({ position, setPositions }: IProps): IQuery<IAddress> => {
  const run = useMemo(
    () => Boolean(position.latitude && position.longitude && !position.city),
    [position]
  )

  const url = useMemo(
    () => endpoints.getAddressUrl(position.latitude, position.longitude),
    [position.latitude, position.longitude]
  )

  const address = useFetch<IAddress>({ url, run })

  const city = address.response?.city

  useEffect(() => {
    if (run && city && position.latitude && position.longitude) {
      setPositions((positions: Array<IPosition>) =>
        addPosition(positions, { ...position, city })
      )
    }
  }, [run, city, position, setPositions])

  return address
}

export default useAddress
