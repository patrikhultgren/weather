import { ReactNode } from 'react'
import { IApp } from 'utils/types'
import Error from 'components/Error'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ForecastNotReady from 'components/ForecastNotReady'
import ErrorBoundary from 'components/ErrorBoundary'
import SkipToContent from 'components/SkipToContent'

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
      <SkipToContent />
      {app.error && <Error error={app.error} />}
      <Header city={app.city} />
      <NavBar
        isFullscreen={app.status.isFullscreen}
        activeMenuItem={activeMenuItem}
      />
      <main role="main">
        <ErrorBoundary>
          {app.days ? (
            <>{children}</>
          ) : (
            <ForecastNotReady app={app} activeMenuItem={activeMenuItem} />
          )}
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
