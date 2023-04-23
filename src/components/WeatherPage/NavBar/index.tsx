import { Link } from 'react-router-dom'
import classNames from 'classnames'
import SearchIcon from 'components/Icon/Search'
import { IWeather } from 'utils/types'
import useScrollDirection from 'hooks/useScrollDirection'

interface IProps {
  weather: IWeather
}

export default function NavBar({ weather }: IProps) {
  const scrollDirection = useScrollDirection()

  const {
    searchHandler,
    status: { isFullscreen },
  } = weather

  return (
    <nav
      className={classNames(
        'fixed md:static left-0 bg-gray-300 w-full z-10 bg-opacity-50 transition-all ease-in-out duration-300',
        scrollDirection === 'down' ? '-bottom-36' : 'bottom-0'
      )}
    >
      <Link
        to="sok"
        className={classNames(
          'mx-auto z-10 shadow-md rounded md:rounded-none md:shadow-none bg-slate-600 md:bg-gray-100 md:hover:bg-white text-white md:text-black h-12 w-12 md:w-auto md:px-4 flex items-center justify-center',
          { 'mb-6': isFullscreen }
        )}
        onClick={searchHandler.openSearch}
      >
        <SearchIcon className="md:mr-2" />
        <span className="hidden md:inline">Sök efter plats</span>
      </Link>
    </nav>
  )
}
