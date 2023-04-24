import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import Container from 'components/Container'
import ForecastPlaceholder from 'components/ForecastPlaceholder'
import { IApp, IAppState } from 'utils/types'

const className = 'mb-10'

interface IProps {
  app: IApp
  appState: IAppState
}

export default function ForecastNotReady({ app, appState }: IProps) {
  const location = useLocation()

  if (appState === 'geo-error') {
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
            <Link
              to="/search"
              className="underline py-2"
              state={{ from: location.pathname }}
            >
              sökfunktionen
            </Link>{' '}
            istället.
          </p>
        </div>
      </Container>
    )
  } else if (app.status.loading && app.status.type === 'placeholder') {
    return (
      <Container className={className}>
        {[0, 1, 2, 4, 5, 6, 7, 8, 9].map((placeholderIndex: number) => (
          <ForecastPlaceholder
            key={placeholderIndex}
            className="mt-6 first:mt-0 md:first:mt-4"
          />
        ))}
      </Container>
    )
  } else if (!app.status.online) {
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
  } else if (!app.status.loading) {
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
            <Link
              to="/search"
              className="underline py-2"
              state={{ from: location.pathname }}
            >
              sökfunktionen
            </Link>
            .
          </p>
        </div>
      </Container>
    )
  }

  return null
}
