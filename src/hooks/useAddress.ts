import { useEffect, useMemo } from 'react'
import { IQuery } from 'utils/types'
import { ADDRESS_API_URL } from 'config'
import useFetch from 'hooks/useFetch'
import { addPosition } from 'utils/position'

interface IProps {
  latitude?: number
  longitude?: number
  setPositions: any
}

const useAddress = ({
  latitude,
  longitude,
  setPositions,
}: IProps): IQuery<any> => {
  const run = useMemo(
    () => Boolean(latitude && longitude),
    [latitude, longitude]
  )

  const url = useMemo(
    () =>
      `${ADDRESS_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=sv`,
    [latitude, longitude]
  )

  const address = useFetch({ url, run })

  const city = address.response?.city

  useEffect(() => {
    if (city && latitude && longitude) {
      setPositions((prev: any) => addPosition(prev, latitude, longitude, city))
    }
  }, [city, latitude, longitude, setPositions])

  return address
}

export default useAddress
