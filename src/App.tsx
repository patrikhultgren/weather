import Weather from 'components/Weather'
import Login from 'components/Login'
import useAuthenticator from 'hooks/useAuthenticator'

export default function App() {
  const authenticator = useAuthenticator()

  return (
    <>
      <main role="main">
        {authenticator.isLoggedIn ? (
          <Weather />
        ) : (
          <Login authenticator={authenticator} />
        )}
      </main>
    </>
  )
}
