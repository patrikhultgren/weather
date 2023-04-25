import { IApp } from 'utils/types'
import Temperature from './Temperature'
import Precipitation from './Precipitation'
import Wind from './Wind'

interface IProps {
  app: IApp
}

export default function Charts({ app }: IProps) {
  return (
    <div className="overflow-x-scroll pb-10 pt-4">
      <div className="w-[1500px] mx-auto">
        <Temperature app={app} />
        <Precipitation app={app} />
        <Wind app={app} />
      </div>
    </div>
  )
}
