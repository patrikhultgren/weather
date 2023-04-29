import { IApp } from 'utils/types'
import PageLayoutForecast from 'components/PageLayout/Forecast'
import Forecast from './Forecast'

interface IProps {
  app: IApp
}

export default function TablesPage({ app }: IProps) {
  return (
    <PageLayoutForecast app={app} activeMenuItem="tables">
      <Forecast app={app} />
    </PageLayoutForecast>
  )
}
