import { ReactNode } from 'react'
import { IApp } from 'utils/types'
import ErrorAlert from 'common/Error/Alert'
import NavBar from 'common/NavBar'
import Header from 'common/Header'
import Footer from 'common/Footer'
import LastUpdated from 'common/LastUpdated'
import ErrorBoundary from 'common/Error/Boundary'
import SkipToContent from 'common/SkipToContent'
import WeatherChangeAlert from 'common/WeatherChangeAlert'
import UseMyLocation from 'common/UseMyLocation'
import NoForecast from './NoForecast'

interface IProps {
  app: IApp
  children: ReactNode
  activeMenuItem: 'tables'
}

export default function Layout({ app, children, activeMenuItem }: IProps) {
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
      <LastUpdated updated_at={app.updated_at} />
      <Footer />
    </>
  )
}
