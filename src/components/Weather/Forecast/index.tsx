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

  if (weather.geoPosition.error && !days) {
    return (
      <Container
        className={classNames(
          'mb-10',
          'min-h-[40vh]',
          'flex',
          'items-center',
          'text-center',
          className
        )}
      >
        <div className="px-4 mt-6 text-xl">
          <p className="text-2xl font-bold">
            Ops... det gick inte att hitta din plats.{' '}
          </p>
          <p className="mt-4">
            Använd{' '}
            <button
              type="button"
              className="underline py-2"
              onClick={weather.searchHandler.openSearch}
            >
              sökfunktionen
            </button>{' '}
            istället.
          </p>
        </div>
      </Container>
    )
  }

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
