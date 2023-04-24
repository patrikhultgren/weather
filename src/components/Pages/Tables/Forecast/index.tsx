import Container from 'components/Container'
import { IApp } from 'utils/types'
import Day from './Day'

const className = 'mb-10'

interface IProps {
  app: IApp
}

export default function Forecast({ app }: IProps) {
  const { days } = app

  if (days) {
    return (
      <Container className={className}>
        {days.map((day) => (
          <Day day={day} key={day[0].time} />
        ))}
      </Container>
    )
  }

  return null
}
