import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import Container from 'common/Container'
import TablePlaceholder from 'common/Placeholder/Table'
import ChartPlaceholder from 'common/Placeholder/Chart'
import { IApp } from 'utils/types'
import Heading from './Heading'
import { useTranslation } from 'context/TranslationProvider'

const className = 'mb-10'

interface IProps {
  app: IApp
  activeMenuItem: 'tables' | 'charts'
}

export default function NoForecast({ app, activeMenuItem }: IProps) {
  const { t } = useTranslation()
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
          <Heading>{t('your-location-could-not-be-found')}</Heading>
          <p className="mt-4 text-xl">
            {t('use')}{' '}
            <Link
              to="/weather/search"
              className="underline py-2"
              state={{ from: location.pathname }}
            >
              {t('the-search')}
            </Link>{' '}
            {t('instead')}
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
          <Heading>{t('an-error-occurred')}</Heading>
          <p className="mt-4 text-xl">{t('please-feel-free-to-try-again')}</p>
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
          <Heading>{t('lost-connection')}</Heading>
          <p className="mt-4 text-xl">{t('not-saved-offline')}</p>
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
          <Heading>{t('weather-forecasts')}</Heading>
          <p className="mt-4 text-xl">
            {t('wiew-weather-forecasts-using')}{' '}
            <Link
              to="/weather/search"
              className="underline py-2"
              state={{ from: location.pathname }}
            >
              {t('the-search')}
            </Link>
            . {t('search-for-any-location')}
          </p>
        </div>
      </Container>
    )
  }

  return null
}
