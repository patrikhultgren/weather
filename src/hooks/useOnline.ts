import { useEffect, useState } from 'react'

const useOnline = (): boolean => {
  const [online, setOnline] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setOnline(navigator.onLine)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return online
}

export default useOnline
