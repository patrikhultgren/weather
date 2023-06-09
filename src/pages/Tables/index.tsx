import { IApp } from 'utils/types'
import PageLayoutForecast from 'ui/PageLayout/Forecast'
import Container from 'ui/Container'
import ErrorBoundary from 'ui/Error/Boundary'
import Day from './Day'

interface IProps {
  app: IApp
}

export default function TablesPage({ app }: IProps) {
  const { days } = app

  return (
    <PageLayoutForecast app={app} activeMenuItem="tables">
      {days && (
        <Container className="mb-10">
          {days.map((day) => (
            <ErrorBoundary key={day[0].time}>
              <Day day={day} />
            </ErrorBoundary>
          ))}
        </Container>
      )}
    </PageLayoutForecast>
  )
}
