import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { TranslationProvider } from './TranslationProvider'
import { useTranslation } from './context'

const Show = () => {
  const { t, language } = useTranslation()

  return (
    <>
      <p>{t('tables')}</p>
      <p data-testid="language">{language}</p>
    </>
  )
}

describe('TranslationProvider', () => {
  it('translates once the messages have loaded', async () => {
    render(
      <TranslationProvider language="sv">
        <Show />
      </TranslationProvider>
    )

    expect(await screen.findByText('Tabeller')).toBeInTheDocument()
    expect(screen.getByTestId('language')).toHaveTextContent('sv')
  })

  // Rendering early would flash the raw keys at the user.
  it('renders nothing until the messages arrive', () => {
    render(
      <TranslationProvider language="en">
        <Show />
      </TranslationProvider>
    )

    expect(screen.queryByText('Tables')).not.toBeInTheDocument()
  })

  it('falls back to the browser language', async () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES')

    render(
      <TranslationProvider>
        <Show />
      </TranslationProvider>
    )

    await waitFor(() =>
      expect(screen.getByTestId('language')).toHaveTextContent('es')
    )
  })

  it('still renders when the messages cannot be loaded', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    render(
      // Not a language we ship, so the dynamic import rejects.
      <TranslationProvider language={'de' as 'en'}>
        <Show />
      </TranslationProvider>
    )

    // Falls back to showing the key itself rather than a blank page.
    expect(await screen.findByText('tables')).toBeInTheDocument()
  })

  it('throws when used outside the provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => render(<Show />)).toThrow(/must be used within/)
  })
})
