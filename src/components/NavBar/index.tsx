import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import ChartIcon from 'components/Icon/Chart'
import TableIcon from 'components/Icon/Table'
import { IApp } from 'utils/types'
import useScrollDirection from 'hooks/useScrollDirection'

interface IProps {
  app: IApp
}

export default function NavBar({ app }: IProps) {
  const scrollDirection = useScrollDirection()

  const {
    status: { isFullscreen },
  } = app

  return (
    <nav
      className={classNames(
        'fixed md:static left-0 bg-gray-300 w-full z-10 bg-opacity-50 transition-all ease-in-out duration-300 flex md:pt-3',
        scrollDirection === 'down' ? '-bottom-36' : 'bottom-0'
      )}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames(
            'ml-auto z-10 shadow-md rounded md:rounded-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center',
            isActive
              ? 'bg-white text-black hover:bg-slate-600 hover:text-white'
              : 'bg-slate-600 text-white md:bg-gray-100 md:hover:bg-white md:text-black',
            { 'mb-6': isFullscreen }
          )
        }
      >
        <TableIcon className="md:mr-2" title="Visa som tabeller" />
        <span className="hidden md:inline">Visa som tabeller</span>
      </NavLink>
      <NavLink
        to="/chart"
        className={({ isActive }) =>
          classNames(
            'mx-3 z-10 shadow-md rounded md:rounded-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center',
            isActive
              ? 'bg-white text-black hover:bg-slate-600 hover:text-white'
              : 'bg-slate-600 text-white md:bg-gray-100 md:hover:bg-white md:text-black',
            { 'mb-6': isFullscreen }
          )
        }
      >
        <ChartIcon className="md:mr-2" title="Visa som diagram" />
        <span className="hidden md:inline">Visa som diagram</span>
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          classNames(
            'mr-auto z-10 shadow-md rounded md:rounded-none md:shadow-none h-12 w-12 md:w-auto md:px-4 flex items-center justify-center',
            isActive
              ? 'bg-white text-black hover:bg-slate-600 hover:text-white'
              : 'bg-slate-600 text-white md:bg-gray-100 md:hover:bg-white md:text-black',
            { 'mb-6': isFullscreen }
          )
        }
      >
        <SearchIcon className="md:mr-2" />
        <span className="hidden md:inline">Sök efter plats</span>
      </NavLink>
    </nav>
  )
}
