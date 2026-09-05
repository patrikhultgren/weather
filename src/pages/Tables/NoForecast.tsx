import { Link, useLocation } from 'react-router-dom'
import Container from 'components/Container'
import ChartPlaceholder from 'components/Placeholder/Chart'
import TablePlaceholder from 'components/Placeholder/Table'
import { useTranslation } from 'i18n/context'
import type { IApp } from 'types'
import Heading from './NoForecastHeading'

const TABLE_PLACEHOLDERS = 9
const CHART_PLACEHOLDERS = 3

interface IMessageProps {
  heading: string
  children: React.ReactNode
}

const Message = ({ heading, children }: IMessageProps) => (
  <Container className="mb-10 flex min-h-[65vh] items-center text-center">
    <div className="mx-auto mt-6 w-full px-4">
      <Heading>{heading}</Heading>
      <p className="mt-4 text-xl">{children}</p>
    </div>
  </Container>
)

const SearchLink = () => {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <Link
      to="/weather/search"
      className="py-2 underline"
      state={{ from: location.pathname }}
    >
      {t('the-search')}
    </Link>
  )
}

interface IProps {
  app: IApp
  activeMenuItem: 'tables' | 'charts'
}

/** Everything the tables page shows when there is no forecast to show. */
export default function NoForecast({ app, activeMenuItem }: IProps) {
  const { t } = useTranslation()

  if (app.geoPosition.error && !app.days) {
    return (
      <Message heading={t('your-location-could-not-be-found')}>
        {t('use')} <SearchLink /> {t('instead')}
      </Message>
    )
  }

  if (app.error) {
    return (
      <Message heading={t('an-error-occurred')}>
        {t('please-feel-free-to-try-again')}
      </Message>
    )
  }

  if (app.status.loading) {
    return activeMenuItem === 'tables' ? (
      <div className="mb-10 grid grid-cols-1 gap-4 lg:mx-4 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: TABLE_PLACEHOLDERS }, (_, index) => (
          <TablePlaceholder
            key={index}
            className="mt-4 first:mt-0 md:first:mt-4"
          />
        ))}
      </div>
    ) : (
      <div className="mb-10">
        {Array.from({ length: CHART_PLACEHOLDERS }, (_, index) => (
          <ChartPlaceholder key={index} className="mt-4" />
        ))}
      </div>
    )
  }

  if (!app.status.online) {
    return (
      <Message heading={t('lost-connection')}>{t('not-saved-offline')}</Message>
    )
  }

  if (app.status.finished) {
    return (
      <Message heading={t('weather-forecasts')}>
        {t('wiew-weather-forecasts-using')} <SearchLink />.{' '}
        {t('search-for-any-location')}
      </Message>
    )
  }

  return null
}
