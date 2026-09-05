import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import ErrorBoundary from 'components/Error/Boundary'
import { TranslationProvider } from 'i18n/TranslationProvider'
import App from 'app/App'
import 'css/style.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Missing #root element')
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <TranslationProvider>
          <App />
        </TranslationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
)

// A new service worker takes over immediately and reloads the open page.
registerSW({ immediate: true })
