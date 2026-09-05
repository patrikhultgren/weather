/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import {
  CacheFirst,
  NetworkFirst,
  StaleWhileRevalidate,
} from 'workbox-strategies'
import {
  BIG_DATA_CLOUD_ADDRESS_API_URL,
  LOQATION_IQ_SEARCH_API_URL,
  YR_WEATHER_FORECAST_API_URL,
} from './config'

declare const self: ServiceWorkerGlobalScope

self.skipWaiting()
clientsClaim()

// The build injects the list of precached assets here.
precacheAndRoute(self.__WB_MANIFEST)

const fileExtensionRegexp = /\/[^/?]+\.[^/]+$/

// App shell routing: serve index.html for navigations, but not for requests
// that look like a file or belong to the dev server.
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false
    if (url.pathname.startsWith('/_')) return false
    return !fileExtensionRegexp.test(url.pathname)
  },
  createHandlerBoundToURL(`${import.meta.env.BASE_URL}index.html`)
)

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
)

// Serve the last forecast when the user is offline.
registerRoute(
  ({ url }) => url.href.includes(YR_WEATHER_FORECAST_API_URL),
  new NetworkFirst()
)

// Search and address lookups are stable enough to answer from cache.
registerRoute(
  ({ url }) =>
    url.href.includes(LOQATION_IQ_SEARCH_API_URL) ||
    url.href.includes(BIG_DATA_CLOUD_ADDRESS_API_URL),
  new CacheFirst()
)

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
