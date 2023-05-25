import { ReactNode } from 'react'
import { IApp } from 'utils/types'
import ErrorAlert from 'components/Error/Alert'
import NavBar from 'components/NavBar'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ErrorBoundary from 'components/Error/Boundary'
import SkipToContent from 'components/SkipToContent'
import WeatherChangeAlert from 'components/WeatherChangeAlert'
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
      <Header city={app.city} />
      {app.weatherChange && (
        <ErrorBoundary>
          <WeatherChangeAlert weatherChange={app.weatherChange} />
        </ErrorBoundary>
      )}
      <NavBar
        isFullscreen={app.status.isFullscreen}
        activeMenuItem={activeMenuItem}
      />
      <main>
        <ErrorBoundary>
          {!app.days ? (
            <NoForecast app={app} activeMenuItem={activeMenuItem} />
          ) : (
            <>{children}</>
          )}
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
