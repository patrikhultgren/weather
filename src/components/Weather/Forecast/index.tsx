import classNames from 'classnames'
import Container from 'components/Container'
import Day from './Day'
import Placeholder from './Placeholder'

interface IProps {
  weather: any
  className?: string
}

export default function Forecast({ weather, className }: IProps) {
  const { days } = weather

  return (
    <Container className={classNames('mb-10', className)}>
      {days
        ? days.map((day: any) => <Day day={day} key={day[0].time} />)
        : [0, 1, 2, 4, 5, 6, 7, 8, 9].map((placeholderIndex: number) => (
            <Placeholder
              key={placeholderIndex}
              className="mt-6 first:mt-0 md:first:mt-4"
            />
          ))}
    </Container>
  )
}
