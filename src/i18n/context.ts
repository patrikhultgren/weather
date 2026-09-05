import { createContext, useContext } from 'react'

export type SupportedLanguage = 'en' | 'sv' | 'es'

export type Translations = Record<string, string>

export type TranslationParams = Record<string, string | number>

export const supportedLanguages: Array<SupportedLanguage> = ['en', 'sv', 'es']

export interface ITranslationContext {
  /** Looks up a key, falling back to the key itself, and fills in {params}. */
  t: (key: string, params?: TranslationParams) => string
  language: SupportedLanguage
}

export const TranslationContext = createContext<
  ITranslationContext | undefined
>(undefined)

export const getBrowserLanguage = (
  navigatorLanguage: string
): SupportedLanguage => {
  const language = navigatorLanguage.split('-')[0] as SupportedLanguage

  return supportedLanguages.includes(language) ? language : 'en'
}

/** Fills {placeholders} in a translated string. */
export const interpolate = (
  template: string,
  params?: TranslationParams
): string => {
  if (!params) {
    return template
  }

  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  )
}

export const useTranslation = (): ITranslationContext => {
  const context = useContext(TranslationContext)

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }

  return context
}
