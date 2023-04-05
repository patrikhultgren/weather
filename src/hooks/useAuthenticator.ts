import { useLayoutEffect, useCallback, useState } from 'react'
import { IS_LOGGED_IN_STORAGE_KEY } from 'config'

const useAuthenticator = (): any => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')

  const onSubmitCode = useCallback(
    (event: any) => {
      event.preventDefault()

      if (code === 'beta') {
        setIsLoggedIn(true)
        localStorage.setItem(IS_LOGGED_IN_STORAGE_KEY, 'true')
      }
    },
    [code]
  )

  const onChangeCode = useCallback((event: any) => {
    setCode(event.target.value)
  }, [])

  useLayoutEffect(() => {
    if (localStorage.getItem(IS_LOGGED_IN_STORAGE_KEY)) {
      setIsLoggedIn(true)
    }
  }, [])

  return { isLoggedIn, code, onChangeCode, onSubmitCode }
}

export default useAuthenticator
