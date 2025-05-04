import { ReactNode } from 'react'
import { IApp } from 'utils/types'
import ErrorAlert from 'ui/Error/Alert'
import NavBar from 'ui/NavBar'
import Header from 'ui/Header'
import Footer from 'ui/Footer'
import ErrorBoundary from 'ui/Error/Boundary'
import SkipToContent from 'ui/SkipToContent'
import WeatherChangeAlert from 'ui/WeatherChangeAlert'
import UseMyLocation from 'ui/UseMyLocation'
import NoForecast from './NoForecast'

interface IProps {
  app: IApp
  children: ReactNode
  activeMenuItem: 'tables'
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
        showUseMyLocation={app.showUseMyLocation}
        activateMyLocation={app.activateMyLocation}
      />
      <main>
        <ErrorBoundary>
          <UseMyLocation
            className="hidden md:block mt-5 mx-auto"
            showUseMyLocation={app.showUseMyLocation}
            activateMyLocation={app.activateMyLocation}
          />
        </ErrorBoundary>
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
