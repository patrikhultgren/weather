import { format as formatWithDateFns } from 'date-fns'
import { enGB, es, sv } from 'date-fns/locale'
import type { SupportedLanguage } from 'i18n/context'

const locales = { sv, en: enGB, es }

/** Formats an ISO timestamp, returning '' rather than throwing on bad input. */
export const format = (
  isoDate: string,
  dateFormat: string,
  language: SupportedLanguage
): string => {
  const date = new Date(isoDate)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return formatWithDateFns(date, dateFormat, { locale: locales[language] })
}
