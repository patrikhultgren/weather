import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  TranslationContext,
  getBrowserLanguage,
  interpolate,
  type SupportedLanguage,
  type TranslationParams,
  type Translations,
} from './context'

const loadTranslations = async (
  language: SupportedLanguage
): Promise<Translations> => {
  const messages = await import(`./locales/${language}.json`)
  return (messages.default ?? messages) as Translations
}

interface IProps {
  children: ReactNode
  /** Overridable so tests and stories don't depend on the browser language. */
  language?: SupportedLanguage
}

export const TranslationProvider = ({ children, language }: IProps) => {
  const resolvedLanguage = useMemo(
    () => language ?? getBrowserLanguage(navigator.language),
    [language]
  )

  const [translations, setTranslations] = useState<Translations | null>(null)

  useEffect(() => {
    let cancelled = false

    loadTranslations(resolvedLanguage)
      .then((messages) => {
        if (!cancelled) setTranslations(messages)
      })
      .catch((error: unknown) => {
        console.error(`Could not load ${resolvedLanguage} translations`, error)
        if (!cancelled) setTranslations({})
      })

    return () => {
      cancelled = true
    }
  }, [resolvedLanguage])

  const t = useCallback(
    (key: string, params?: TranslationParams) =>
      interpolate(translations?.[key] ?? key, params),
    [translations]
  )

  const value = useMemo(
    () => ({ t, language: resolvedLanguage }),
    [t, resolvedLanguage]
  )

  // Rendering before the translations arrive would flash the raw keys.
  if (!translations) {
    return null
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export default TranslationProvider
