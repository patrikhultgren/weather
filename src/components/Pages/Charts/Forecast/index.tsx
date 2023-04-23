import classNames from 'classnames'
import Container from 'components/Container'
import { IApp } from 'utils/types'
import Day from './Day'
import Placeholder from './Placeholder'

const className = 'mb-10'

interface IProps {
  app: IApp
}

export default function Forecast({ app }: IProps) {
  const { days, status, geoPosition, searchHandler } = app

  if (geoPosition.error && !days) {
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
              onClick={searchHandler.openSearch}
            >
              sökfunktionen
            </button>{' '}
            istället.
          </p>
        </div>
      </Container>
    )
  } else if (status.loading && status.type === 'placeholder') {
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
        {days.map((day) => (
          <Day day={day} key={day[0].time} />
        ))}
      </Container>
    )
  } else if (!status.online) {
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
        <div className="px-4 mt-6 w-full">
          <p className="text-2xl font-bold">Tappat uppkopplingen?</p>
          <p className="mt-4 text-xl">
            Väderprognosen finns tyvärr inte sparad i offline läge.
          </p>
        </div>
      </Container>
    )
  }

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
      <div className="px-4 mt-6 w-full">
        <p className="text-2xl font-bold">Se väderprognoser</p>
        <p className="mt-4 text-xl">
          Använd{' '}
          <button
            type="button"
            className="underline py-2"
            onClick={searchHandler.openSearch}
          >
            sökfunktionen
          </button>
          .
        </p>
      </div>
    </Container>
  )
}
