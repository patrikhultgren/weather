import {
  useLayoutEffect,
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react'
import { IS_LOGGED_IN_STORAGE_KEY } from 'config'

const useAuthenticator = (): any => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [code, setCode] = useState<string>('')

  const onSubmitCode = useCallback(
    (event: FormEvent) => {
      event.preventDefault()

      if (code.toLowerCase() === 'beta') {
        setIsLoggedIn(true)
        localStorage.setItem(IS_LOGGED_IN_STORAGE_KEY, 'true')
      }
    },
    [code]
  )

  const onChangeCode = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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
