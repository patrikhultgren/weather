/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
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

// Serve the last forecast when the user is offline or on a stalled connection.
// A named cache keeps it inspectable, and the timeout matters more than it
// looks: without it a connection that hangs rather than fails never falls back.
registerRoute(
  ({ url }) => url.href.includes(YR_WEATHER_FORECAST_API_URL),
  new NetworkFirst({
    cacheName: 'forecasts',
    networkTimeoutSeconds: 5,
    plugins: [
      // Only successful responses are worth keeping.
      new CacheableResponsePlugin({ statuses: [200] }),
      // A handful of places, kept for a week; the forecast itself is stale
      // long before that, but a stale forecast beats a blank page offline.
      new ExpirationPlugin({ maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 }),
    ],
  })
)

// Search and address lookups answer the same way for months.
registerRoute(
  ({ url }) =>
    url.href.includes(LOQATION_IQ_SEARCH_API_URL) ||
    url.href.includes(BIG_DATA_CLOUD_ADDRESS_API_URL),
  new CacheFirst({
    cacheName: 'places',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
)

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
