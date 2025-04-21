import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import Container from 'ui/Container'
import TablePlaceholder from 'ui/Placeholder/Table'
import ChartPlaceholder from 'ui/Placeholder/Chart'
import { IApp } from 'utils/types'
import Heading from './Heading'

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
          <Heading>Ops... det gick inte att hitta din plats.</Heading>
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
  } else if (app.error) {
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
          <Heading>Ops... ett fel uppstod.</Heading>
          <p className="mt-4 text-xl">Försök gärna på nytt.</p>
        </div>
      </Container>
    )
  } else if (app.status.loading && activeMenuItem === 'tables') {
    return (
      <div
        className={classNames(
          'grid',
          'grid-cols-1',
          'lg:grid-cols-2',
          'xl:grid-cols-3',
          'gap-4',
          'lg:mx-4',
          className
        )}
      >
        {[0, 1, 2, 4, 5, 6, 7, 8, 9].map((placeholderIndex: number) => (
          <TablePlaceholder
            key={placeholderIndex}
            className="mt-4 first:mt-0 md:first:mt-4"
          />
        ))}
      </div>
    )
  } else if (app.status.loading && activeMenuItem === 'charts') {
    return (
      <div className={className}>
        {[0, 1, 2].map((placeholderIndex: number) => (
          <ChartPlaceholder key={placeholderIndex} className="mt-4" />
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
          <Heading>Tappat uppkopplingen?</Heading>
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
          <Heading>Väderprognoser</Heading>
          <p className="mt-4 text-xl">
            Se väderprognoser med hjälp av{' '}
            <Link
              to="/weather/search"
              className="underline py-2"
              state={{ from: location.pathname }}
            >
              sökfunktionen
            </Link>
            . Sök efter vilken plats som helst.
          </p>
        </div>
      </Container>
    )
  }

  return null
}
