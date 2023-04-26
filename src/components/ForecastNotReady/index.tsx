import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import Container from 'components/Container'
import TablePlaceholder from 'components/Placeholder/Table'
import ChartPlaceholder from 'components/Placeholder/Chart'
import { IApp } from 'utils/types'

const className = 'mb-10'

interface IProps {
  app: IApp
  activeMenuItem: 'tables' | 'charts'
}

export default function ForecastNotReady({ app, activeMenuItem }: IProps) {
  const location = useLocation()

  if (app.geoPosition.error && !app.days) {
    return (
      <Container
        className={classNames(
          'min-h-[65vh]',
          'flex',
          'items-center',
          'text-center',
          className
        )}
      >
        <div className="mx-auto px-4 mt-6">
          <p className="text-2xl font-bold">
            Ops... det gick inte att hitta din plats.
          </p>
          <p className="mt-4 text-xl">
            Använd{' '}
            <Link
              to="/weather/search"
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
  } else if (app.status.loading && activeMenuItem === 'tables') {
    return (
      <Container className={className}>
        {[0, 1, 2, 4, 5, 6, 7, 8, 9].map((placeholderIndex: number) => (
          <TablePlaceholder
            key={placeholderIndex}
            className="mt-6 first:mt-0 md:first:mt-4"
          />
        ))}
      </Container>
    )
  } else if (app.status.loading && activeMenuItem === 'charts') {
    return (
      <div className={className}>
        {[0, 1, 2].map((placeholderIndex: number) => (
          <ChartPlaceholder
            key={placeholderIndex}
            className="mt-6 first:mt-0 md:first:mt-4"
          />
        ))}
      </div>
    )
  } else if (!app.status.online) {
    return (
      <Container
        className={classNames(
          'min-h-[65vh]',
          'flex',
          'items-center',
          'text-center',
          className
        )}
      >
        <div className="mx-auto px-4 mt-6 w-full">
          <p className="text-2xl font-bold">Tappat uppkopplingen?</p>
          <p className="mt-4 text-xl">
            Väderprognosen finns tyvärr inte sparad i offline läge.
          </p>
        </div>
      </Container>
    )
  } else if (app.status.finished) {
    return (
      <Container
        className={classNames(
          'min-h-[65vh]',
          'flex',
          'items-center',
          'text-center',
          className
        )}
      >
        <div className="mx-auto px-4 mt-6 w-full">
          <p className="text-2xl font-bold">Se väderprognoser</p>
          <p className="mt-4 text-xl">
            Använd{' '}
            <Link
              to="/weather/search"
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
