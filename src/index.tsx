import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorBoundary from 'components/Error/Boundary'
import PreApp from './PreApp'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import 'css/style.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <PreApp />
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
