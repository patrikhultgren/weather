import { useEffect, useMemo } from 'react'
import { IQuery } from 'utils/types'
import { ADDRESS_API_URL } from 'config'
import useFetch from 'hooks/useFetch'

interface IProps {
  latitude?: number
  longitude?: number
  position: any
  setPosition: any
}

const useAddress = ({
  latitude,
  longitude,
  position,
  setPosition,
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
    if (city && !position.city) {
      setPosition((prev: any) => ({ ...prev, city }))
    }
  }, [city, position.city, setPosition])

  return address
}

export default useAddress
