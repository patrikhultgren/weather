import { ReactNode } from 'react'
import { IApp } from 'utils/types'
import Error from 'components/Error'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ForecastNotReady from 'components/ForecastNotReady'
import ErrorBoundaryEveryChild from 'components/ErrorBoundaryEveryChild'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'

interface IProps {
  app: IApp
  children: ReactNode
  activeMenuItem: 'tables' | 'charts'
}

export default function ForecastPageLayout({
  app,
  children,
  activeMenuItem,
}: IProps) {
  return (
    <>
      <main role="main">
        <ErrorBoundaryEveryChild>
          {app.error && <Error error={app.error} />}
          <Header city={app.city} />
          <NavBar
            isFullscreen={app.status.isFullscreen}
            activeMenuItem={activeMenuItem}
          />
          {app.days ? (
            <>{children}</>
          ) : (
            <ForecastNotReady app={app} activeMenuItem={activeMenuItem} />
          )}
        </ErrorBoundaryEveryChild>
      </main>
      <Footer />
    </>
  )
}
