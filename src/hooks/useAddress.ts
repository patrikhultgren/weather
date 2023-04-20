import { useEffect, useMemo } from 'react'
import { IQuery } from 'utils/types'
import { ADDRESS_API_URL } from 'config'
import useFetch from 'hooks/useFetch'
import { addPosition } from 'utils/position'
import { IPosition } from 'utils/types'

interface IProps {
  position: IPosition
  setPositions: Function
}

const useAddress = ({ position, setPositions }: IProps): IQuery<IPosition> => {
  const run = useMemo(
    () => Boolean(position.latitude && position.longitude && !position.city),
    [position]
  )

  const url = useMemo(
    () =>
      `${ADDRESS_API_URL}?latitude=${position.latitude}&longitude=${position.longitude}&localityLanguage=sv`,
    [position.latitude, position.longitude]
  )

  const address = useFetch({ url, run })

  const city = address.response?.city

  useEffect(() => {
    if (run && city && position.latitude && position.longitude) {
      setPositions((positions: Array<IPosition>) =>
        addPosition(positions, position.latitude, position.longitude, city)
      )
    }
  }, [run, city, position, setPositions])

  return address
}

export default useAddress
