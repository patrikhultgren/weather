import { useEffect, useState } from 'react'

/** Tracks navigator.onLine through the online/offline events. */
const useOnline = (): boolean => {
  const [online, setOnline] = useState<boolean>(() => navigator.onLine ?? true)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)

    window.addEventListener('online', update)
    window.addEventListener('offline', update)

    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  return online
}

export default useOnline
