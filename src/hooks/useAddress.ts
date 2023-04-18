import { useMemo } from 'react'
import { IQuery } from 'utils/types'
import { ADDRESS_API_URL } from 'config'
import useFetch from 'hooks/useFetch'

interface IProps {
  latitude?: number
  longitude?: number
}

const useAddress = ({ latitude, longitude }: IProps): IQuery<any> => {
  const run = useMemo(
    () => Boolean(latitude && longitude),
    [latitude, longitude]
  )

  const url = useMemo(
    () =>
      `${ADDRESS_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=sv`,
    [latitude, longitude]
  )

  return useFetch({ url, run })
}

export default useAddress
