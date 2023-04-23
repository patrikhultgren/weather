import React from 'react'
import ReactDOM from 'react-dom/client'
import 'css/style.css'
import Router from './Router'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router />
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
