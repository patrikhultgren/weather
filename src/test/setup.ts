import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { installStorage } from './storage'

// Node 26 defines an experimental `localStorage` global that resolves to
// undefined unless --localstorage-file is passed, and it shadows the one jsdom
// provides. Installing our own keeps the suite working on every Node version.
installStorage()

// jsdom implements neither of these and several hooks depend on them.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
    addListener: () => undefined,
    removeListener: () => undefined,
  })) as unknown as typeof window.matchMedia
}

window.requestAnimationFrame ??= ((callback: FrameRequestCallback) =>
  setTimeout(
    () => callback(0),
    0
  ) as unknown as number) as typeof requestAnimationFrame

// jsdom has no layout, so scrolling is a no-op rather than an error.
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: () => undefined,
  writable: true,
  configurable: true,
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  localStorage.clear()
})
