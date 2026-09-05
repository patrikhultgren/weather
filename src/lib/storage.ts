/**
 * localStorage throws in private browsing modes and when storage is full, so
 * every access is guarded. A failed read is indistinguishable from no value.
 */
export const readJson = <TValue>(key: string, fallback: TValue): TValue => {
  try {
    const data = localStorage.getItem(key)
    return data === null ? fallback : (JSON.parse(data) as TValue)
  } catch {
    return fallback
  }
}

export const writeJson = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Nothing useful to do; the app works without persistence.
  }
}
