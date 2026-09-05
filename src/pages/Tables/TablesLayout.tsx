import { ReactNode } from 'react'
import { IApp } from 'types'
import ErrorAlert from 'components/Error/Alert'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Footer from 'components/Footer'
import LastUpdated from 'components/LastUpdated'
import ErrorBoundary from 'components/Error/Boundary'
import SkipToContent from 'components/SkipToContent'
import WeatherChangeAlert from 'components/WeatherChangeAlert'
import UseMyLocation from 'components/UseMyLocation'
import NoForecast from './NoForecast'

interface IProps {
  app: IApp
  children: ReactNode
  activeMenuItem: 'tables'
}

export default function TablesLayout({
  app,
  children,
  activeMenuItem,
}: IProps) {
  return (
    <>
      <SkipToContent />
      {/* Offline the page already explains itself; a failed request on top
          of that is noise. */}
      {app.error && app.status.online && (
        <ErrorAlert key={app.error.message} error={app.error} />
      )}
      {app.weatherChange && (
        <ErrorBoundary>
          <WeatherChangeAlert
            key={app.weatherChange.time}
            weatherChange={app.weatherChange}
          />
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
      <LastUpdated updated_at={app.updated_at} />
      <Footer />
    </>
  )
}
