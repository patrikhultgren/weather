import { format as dateFnsFormat } from 'date-fns'
import sv from 'date-fns/locale/sv'
import en from 'date-fns/locale/en-GB'

const languages = {
  sv,
  en,
}

export const format = (
  str: string,
  dateFormat: string,
  language: 'sv' | 'en'
) => {
  const date = new Date(str)

  if (date) {
    return dateFnsFormat(date, dateFormat, { locale: languages[language] })
  }

  return ''
}
