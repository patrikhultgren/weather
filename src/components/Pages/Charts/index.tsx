import { IApp } from 'utils/types'
import PageLayoutForecast from 'components/PageLayout/Forecast'
import Charts from './Charts'

interface IProps {
  app: IApp
}

export default function ChartsPage({ app }: IProps) {
  return (
    <PageLayoutForecast app={app} activeMenuItem="charts">
      <Charts app={app} />
    </PageLayoutForecast>
  )
}
