import { LOQATION_IQ_SEARCH_API_URL, LOQATION_IQ_API_KEY } from 'config'

const endpoints = {
  searchUrl: (searchTerm: string): string =>
    `${LOQATION_IQ_SEARCH_API_URL}?key=${LOQATION_IQ_API_KEY}&q=${searchTerm.trim()}&format=json`,
}

export default endpoints
