import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react'

export type SupportedLanguage = 'en' | 'sv'
type Translations = Record<string, string>

interface TranslationContextProps {
  t: (key: string) => string
  language: SupportedLanguage
}

const supportedLanguages: SupportedLanguage[] = ['en', 'sv']

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
)

const getDefaultLanguage = (): SupportedLanguage => {
  //const browserLang = navigator.language.split('-')[0] as SupportedLanguage
  const browserLang = 'en'
  return supportedLanguages.includes(browserLang) ? browserLang : 'en'
}

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const language = getDefaultLanguage()
  const [translations, setTranslations] = useState<Translations>({})

  const loadLanguage = async (lang: SupportedLanguage) => {
    try {
      const messages = await import(`../locales/${lang}.json`)
      setTranslations(messages)
    } catch (error) {
      console.error(`Could not load ${lang} translations`, error)
      setTranslations({})
    }
  }

  useEffect(() => {
    loadLanguage(language)
  }, [language])

  const t = (key: string) => translations[key] || key

  return (
    <TranslationContext.Provider value={{ t, language }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = (): TranslationContextProps => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
