import { IApp } from 'utils/types'

interface IProps {
  app: IApp
}

export default function Forecast({ app }: IProps) {
  console.log('app', app)
  return <>Diagram</>
}
