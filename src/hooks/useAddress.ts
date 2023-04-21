import { useEffect, useMemo } from 'react'
import { IQuery } from 'utils/types'
import { ADDRESS_API_URL } from 'config'
import useFetch from 'hooks/useFetch'
import { savePosition } from 'utils/position'
import { IPosition, IAddress } from 'utils/types'

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
    () =>
      `${ADDRESS_API_URL}?latitude=${position.latitude}&longitude=${position.longitude}&localityLanguage=sv`,
    [position.latitude, position.longitude]
  )

  const address = useFetch<IAddress>({ url, run })

  const city = address.response?.city

  useEffect(() => {
    if (run && city && position.latitude && position.longitude) {
      setPositions((positions: Array<IPosition>) =>
        savePosition(positions, { ...position, city })
      )
    }
  }, [run, city, position, setPositions])

  return address
}

export default useAddress
