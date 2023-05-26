import { ReactNode } from 'react'
import { IApp } from 'utils/types'
import ErrorAlert from 'ui/Error/Alert'
import NavBar from 'ui/NavBar'
import Header from 'ui/Header'
import Footer from 'ui/Footer'
import ErrorBoundary from 'ui/Error/Boundary'
import SkipToContent from 'ui/SkipToContent'
import WeatherChangeAlert from 'ui/WeatherChangeAlert'
import NoForecast from './NoForecast'

interface IProps {
  app: IApp
  children: ReactNode
  activeMenuItem: 'tables' | 'charts'
}

export default function PageLayoutForecast({
  app,
  children,
  activeMenuItem,
}: IProps) {
  return (
    <>
      <SkipToContent />
      {app.error && <ErrorAlert error={app.error} />}
      {app.weatherChange && (
        <ErrorBoundary>
          <WeatherChangeAlert weatherChange={app.weatherChange} />
        </ErrorBoundary>
      )}
      <Header city={app.city} />
      <NavBar
        isFullscreen={app.status.isFullscreen}
        activeMenuItem={activeMenuItem}
      />
      <main>
        <ErrorBoundary>
          {app.days && !app.status.loading && !app.error ? (
            <>{children}</>
          ) : (
            <NoForecast app={app} activeMenuItem={activeMenuItem} />
          )}
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
