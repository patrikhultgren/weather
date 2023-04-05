import classNames from 'classnames'
import Container from 'components/Container'
import Day from './Day'

interface IProps {
  weather: any
  className?: string
}

export default function Forecast({ weather, className }: IProps) {
  const { days } = weather.response

  return (
    <Container className={classNames('mb-10', className)}>
      {days?.map((day: any) => (
        <Day day={day} key={day[0].time} />
      ))}
    </Container>
  )
}
