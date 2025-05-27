import { BIG_DATA_CLOUD_ADDRESS_API_URL } from 'config'
import { SupportedLanguage } from 'context/TranslationProvider'

const endpoints = {
  getAddressUrl: (
    latitude: number,
    longitude: number,
    language: SupportedLanguage
  ): string =>
    `${BIG_DATA_CLOUD_ADDRESS_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`,
}

export default endpoints
