import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from 'common/Error/Boundary'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'css/style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)

serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        const serviceWorker = event?.target as ServiceWorker

        if (serviceWorker?.state === 'activated') {
          window.location.reload()
        }
      })

      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' })
    }
  },
})
