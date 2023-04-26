import { IApp } from 'utils/types'
import ForecastPageLayout from 'components/ForecastPageLayout'
import Charts from './Charts'

interface IProps {
  app: IApp
}

export default function ChartsPage({ app }: IProps) {
  return (
    <ForecastPageLayout app={app} activeMenuItem="charts">
      <Charts app={app} />
    </ForecastPageLayout>
  )
}
