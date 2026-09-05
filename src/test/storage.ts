/** A minimal in-memory Storage, used because Node's own global shadows jsdom's. */
class MemoryStorage implements Storage {
  #items = new Map<string, string>()

  get length(): number {
    return this.#items.size
  }

  clear(): void {
    this.#items.clear()
  }

  getItem(key: string): string | null {
    return this.#items.get(String(key)) ?? null
  }

  key(index: number): string | null {
    return [...this.#items.keys()][index] ?? null
  }

  removeItem(key: string): void {
    this.#items.delete(String(key))
  }

  setItem(key: string, value: string): void {
    this.#items.set(String(key), String(value))
  }

  [name: string]: unknown
}

export const installStorage = (): void => {
  if (typeof globalThis.Storage === 'undefined') {
    Object.defineProperty(globalThis, 'Storage', {
      value: MemoryStorage,
      configurable: true,
      writable: true,
    })
  }

  for (const name of ['localStorage', 'sessionStorage'] as const) {
    Object.defineProperty(globalThis, name, {
      value: new MemoryStorage(),
      configurable: true,
      writable: true,
    })
  }
}
