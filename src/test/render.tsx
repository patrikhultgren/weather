import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactElement, ReactNode } from 'react'
import {
  TranslationContext,
  interpolate,
  type ITranslationContext,
  type SupportedLanguage,
} from 'i18n/context'
import en from 'i18n/locales/en.json'

const translations = en as Record<string, string>

/**
 * The real provider loads its messages asynchronously; tests supply them up
 * front so rendering stays synchronous while still using the real strings.
 */
export const createTranslationContext = (
  language: SupportedLanguage = 'en'
): ITranslationContext => ({
  language,
  t: (key, params) => interpolate(translations[key] ?? key, params),
})

interface IOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string
  language?: SupportedLanguage
}

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', language = 'en', ...options }: IOptions = {}
): RenderResult => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[route]}>
      <TranslationContext.Provider value={createTranslationContext(language)}>
        {children}
      </TranslationContext.Provider>
    </MemoryRouter>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

/** Wrapper for renderHook, which takes the provider rather than an element. */
export const ProviderWrapper = ({
  children,
  route = '/',
}: {
  children: ReactNode
  route?: string
}) => (
  <MemoryRouter initialEntries={[route]}>
    <TranslationContext.Provider value={createTranslationContext()}>
      {children}
    </TranslationContext.Provider>
  </MemoryRouter>
)

export * from '@testing-library/react'
