import { LOQATION_IQ_SEARCH_API_URL, LOQATION_IQ_API_KEY } from 'config'

export const getSearchUrl = (searchTerm: string): string =>
  `${LOQATION_IQ_SEARCH_API_URL}?key=${LOQATION_IQ_API_KEY}` +
  `&q=${encodeURIComponent(searchTerm.trim())}&format=json`
