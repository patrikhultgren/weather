import { IApp } from 'types'
import TablesLayout from './TablesLayout'
import ErrorBoundary from 'components/Error/Boundary'
import Day from './Day'

export interface IProps {
  app: IApp
}

export default function TablesPage({ app }: IProps) {
  const { days } = app

  return (
    <TablesLayout app={app} activeMenuItem="tables">
      {days && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 lg:mx-4 md:mt-5">
          {days.map((day) => (
            <ErrorBoundary key={day[0].time}>
              <Day day={day} />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </TablesLayout>
  )
}
