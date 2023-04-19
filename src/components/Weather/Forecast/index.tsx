import classNames from 'classnames'
import Container from 'components/Container'
import Day from './Day'
import Placeholder from './Placeholder'

const className = 'mb-10'

interface IProps {
  weather: any
}

export default function Forecast({ weather }: IProps) {
  const { days } = weather

  if (weather.geoPosition.error && !days) {
    return (
      <Container
        className={classNames(
          'min-h-[40vh]',
          'flex',
          'items-center',
          'text-center',
          className
        )}
      >
        <div className="px-4 mt-6">
          <p className="text-2xl font-bold">
            Ops... det gick inte att hitta din plats.
          </p>
          <p className="mt-4 text-xl">
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
  } else if (weather.status.loading && weather.status.type === 'placeholder') {
    return (
      <Container className={className}>
        {[0, 1, 2, 4, 5, 6, 7, 8, 9].map((placeholderIndex: number) => (
          <Placeholder
            key={placeholderIndex}
            className="mt-6 first:mt-0 md:first:mt-4"
          />
        ))}
      </Container>
    )
  } else if (days) {
    return (
      <Container className={className}>
        {days.map((day: any) => (
          <Day day={day} key={day[0].time} />
        ))}
      </Container>
    )
  }

  return null
}
