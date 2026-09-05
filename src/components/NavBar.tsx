import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'
import Gps from 'components/Icon/Gps'
import SearchIcon from 'components/Icon/Search'
import TableIcon from 'components/Icon/Table'
import useScrollDirection from 'hooks/useScrollDirection'
import { useTranslation } from 'i18n/context'

/** Shared by both links and the location button so they line up. */
const item =
  'z-10 flex h-12 w-12 items-center justify-center rounded shadow md:mb-0 md:w-auto md:rounded-t md:rounded-b-none md:px-4 md:shadow-none'

const inactive =
  'bg-slate-600 text-white md:bg-gray-200 md:text-black md:hover:bg-white'

interface IProps {
  isFullscreen: boolean
  activeMenuItem?: 'tables' | 'charts'
  showUseMyLocation: boolean
  activateMyLocation: () => void
}

export default function NavBar({
  isFullscreen,
  activeMenuItem,
  showUseMyLocation,
  activateMyLocation,
}: IProps) {
  const location = useLocation()
  const scrollDirection = useScrollDirection()
  const { t } = useTranslation()

  return (
    <nav
      aria-label={t('main-menu')}
      className={classNames(
        'fixed left-0 z-10 flex w-full justify-center gap-3 transition-all duration-300 ease-in-out md:static md:bg-gray-200 md:pt-2.5 md:pb-0',
        isFullscreen ? 'pb-6' : 'pb-3',
        scrollDirection === 'down' ? '-bottom-36' : 'bottom-0'
      )}
    >
      <Link
        to="/weather/"
        aria-label={t('tables')}
        className={classNames(
          item,
          'border md:border-0',
          activeMenuItem === 'tables' ? 'bg-white text-black' : inactive
        )}
      >
        <TableIcon className="md:mr-2" title={t('tables')} />
        <span className="hidden md:inline">{t('tables')}</span>
      </Link>
      <Link
        to="/weather/search"
        aria-label={t('search')}
        state={{ from: location.pathname }}
        className={classNames(item, inactive)}
      >
        <SearchIcon className="md:mr-2" />
        <span className="hidden md:inline">{t('search')}</span>
      </Link>
      {showUseMyLocation && (
        <button
          type="button"
          aria-label={t('use-my-location')}
          onClick={activateMyLocation}
          className={classNames(item, inactive, 'md:hidden')}
        >
          <Gps />
        </button>
      )}
    </nav>
  )
}
