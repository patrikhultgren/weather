import { BIG_DATA_CLOUD_ADDRESS_API_URL } from 'config'
import type { SupportedLanguage } from 'i18n/context'

export const getAddressUrl = (
  latitude: number,
  longitude: number,
  language: SupportedLanguage
): string =>
  `${BIG_DATA_CLOUD_ADDRESS_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`
