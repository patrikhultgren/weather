import { BIG_DATA_CLOUD_ADDRESS_API_URL } from 'config'

const endpoints = {
  getAddressUrl: (latitude: number, longitude: number): string =>
    `${BIG_DATA_CLOUD_ADDRESS_API_URL}/?latitude=${latitude}&longitude=${longitude}&localityLanguage=sv`,
}

export default endpoints
