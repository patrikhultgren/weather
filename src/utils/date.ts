import { format as dateFnsFormat } from 'date-fns'
import sv from 'date-fns/locale/sv'
import en from 'date-fns/locale/en-GB'
import es from 'date-fns/locale/es'

const languages = {
  sv,
  en,
  es,
}

export const format = (
  str: string,
  dateFormat: string,
  language: 'sv' | 'en' | 'es'
) => {
  const date = new Date(str)

  if (date) {
    return dateFnsFormat(date, dateFormat, { locale: languages[language] })
  }

  return ''
}
