import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import ChartIcon from 'components/Icon/Chart'
import TableIcon from 'components/Icon/Table'
import { IApp } from 'utils/types'
import useScrollDirection from 'hooks/useScrollDirection'

interface IProps {
  app: IApp
  activeMenuItem?: 'tables' | 'charts'
}

export default function NavBar({ app, activeMenuItem }: IProps) {
  const location = useLocation()
  const scrollDirection = useScrollDirection()

  const {
    status: { isFullscreen },
  } = app

  return (
    <nav
      aria-label="Huvudmeny"
      className={classNames(
        'fixed md:static left-0 w-full z-10 transition-all ease-in-out duration-300 flex md:pt-3 md:bg-gray-200 md:pb-0',
        isFullscreen ? 'pb-6' : 'pb-3',
        scrollDirection === 'down' ? '-bottom-36' : 'bottom-0'
      )}
    >
      <Link
        to="/"
        className={classNames(
          'ml-auto z-10 shadow border rounded md:rounded-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center md:mb-0 md:border-0',
          activeMenuItem === 'tables'
            ? 'bg-white text-black'
            : 'bg-slate-600 text-white md:bg-gray-200 md:hover:bg-white md:text-black'
        )}
      >
        <TableIcon className="md:mr-2" title="Visa som tabeller" />
        <span className="hidden md:inline">Visa som tabeller</span>
      </Link>
      <Link
        to="/charts"
        className={classNames(
          'mx-3 z-10 shadow border rounded md:rounded-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center md:mb-0 md:border-0',
          activeMenuItem === 'charts'
            ? 'bg-white text-black'
            : 'bg-slate-600 text-white md:bg-gray-200 md:hover:bg-white md:text-black'
        )}
      >
        <ChartIcon className="md:mr-2" title="Visa som diagram" />
        <span className="hidden md:inline">Visa som diagram</span>
      </Link>
      <Link
        to="/search"
        state={{ from: location.pathname }}
        className={classNames(
          'mr-auto z-10 shadow rounded md:rounded-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center bg-slate-600 text-white md:bg-gray-200 md:hover:bg-white md:text-black  md:mb-0'
        )}
      >
        <SearchIcon className="md:mr-2" />
        <span className="hidden md:inline">Sök efter plats</span>
      </Link>
    </nav>
  )
}
