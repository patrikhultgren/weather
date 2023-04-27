import { IApp } from 'utils/types'
import useSearchHandler from 'hooks/useSearchHandler'
import Handler from './Handler'

interface IProps {
  app: IApp
}

export default function SearchPage({ app }: IProps) {
  const searchHandler = useSearchHandler(app.positions, app.setPositions)

  return <Handler searchHandler={searchHandler} />
}
