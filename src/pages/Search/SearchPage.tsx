import { IApp } from 'types'
import useSearchHandler from 'features/search/useSearchHandler'
import SearchLayout from './SearchLayout'

interface IProps {
  app: IApp
}

export default function SearchPage({ app }: IProps) {
  const searchHandler = useSearchHandler({
    positions: app.positions,
    setPositions: app.setPositions,
  })

  return <SearchLayout searchHandler={searchHandler} />
}
