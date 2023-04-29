import { IApp } from 'utils/types'
import PageLayoutForecast from 'components/PageLayout/Forecast'
import ErrorBoundaryEveryChild from 'components/Error/BoundaryEveryChild'
import Temperature from './Temperature'
import Precipitation from './Precipitation'
import Wind from './Wind'

interface IProps {
  app: IApp
}

export default function ChartsPage({ app }: IProps) {
  return (
    <PageLayoutForecast app={app} activeMenuItem="charts">
      <section aria-label="Diagram" className="overflow-x-scroll pb-10 pt-4">
        <div className="w-[1500px] mx-auto">
          <ErrorBoundaryEveryChild>
            <Temperature app={app} />
            <Precipitation app={app} />
            <Wind app={app} />
          </ErrorBoundaryEveryChild>
        </div>
      </section>
    </PageLayoutForecast>
  )
}
