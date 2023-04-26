import { IApp } from 'utils/types'
import ForecastPageLayout from 'components/ForecastPageLayout'
import useSetBodyBackgroundColor from 'hooks/useSetBodyBackgroundColor'
import Forecast from './Forecast'

interface IProps {
  app: IApp
}

export default function TablesPage({ app }: IProps) {
  useSetBodyBackgroundColor('#fff')

  return (
    <ForecastPageLayout app={app} activeMenuItem="tables">
      <Forecast app={app} />
    </ForecastPageLayout>
  )
}
