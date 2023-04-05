import { format as dateFnsFormat } from 'date-fns'
import sv from 'date-fns/locale/sv'

export const format = (str: string, dateFormat: string) => {
  const date = new Date(str)

  if (date) {
    return dateFnsFormat(date, dateFormat, { locale: sv })
  }

  return ''
}
