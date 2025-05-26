import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import SearchIcon from 'common/Icon/Search'
import TableIcon from 'common/Icon/Table'
import useScrollDirection from 'hooks/useScrollDirection'
import Gps from 'common/Icon/Gps'
import { useTranslation } from 'context/TranslationProvider'

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
      aria-label="Huvudmeny"
      className={classNames(
        'fixed md:static left-0 w-full z-10 transition-all ease-in-out duration-300 flex justify-center gap-3 md:pt-2.5 md:bg-gray-200 md:pb-0',
        isFullscreen ? 'pb-6' : 'pb-3',
        scrollDirection === 'down' ? '-bottom-36' : 'bottom-0'
      )}
    >
      <Link
        to="/weather/"
        aria-label="Tabeller"
        className={classNames(
          'z-10 shadow border rounded md:rounded-t md:rounded-b-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center md:mb-0 md:border-0',
          activeMenuItem === 'tables'
            ? 'bg-white text-black'
            : 'bg-slate-600 text-white md:bg-gray-200 md:hover:bg-white md:text-black'
        )}
      >
        <TableIcon className="md:mr-2" title="Tabeller" />
        <span className="hidden md:inline">{t('tables')}</span>
      </Link>
      <Link
        to="/weather/search"
        aria-label="Sök"
        state={{ from: location.pathname }}
        className={classNames(
          'z-10 shadow rounded md:rounded-t md:rounded-b-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center bg-slate-600 text-white md:bg-gray-200 md:hover:bg-white md:text-black  md:mb-0'
        )}
      >
        <SearchIcon className="md:mr-2" />
        <span className="hidden md:inline">{t('search')}</span>
      </Link>
      {showUseMyLocation && (
        <button
          type="button"
          aria-label="Använd min plats"
          onClick={activateMyLocation}
          className={classNames(
            'block md:hidden z-10 shadow rounded md:rounded-t md:rounded-b-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center bg-slate-600 text-white md:bg-gray-200 md:hover:bg-white md:text-black  md:mb-0'
          )}
        >
          <Gps />
        </button>
      )}
    </nav>
  )
}
