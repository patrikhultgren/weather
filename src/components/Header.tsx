import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'i18n/context'

/** Long place names need to stay on one line on small screens. */
const LONG_CITY_NAME = 40

interface IProps {
  city: string
  className?: string
}

export default function Header({ city, className }: IProps) {
  const { t } = useTranslation()

  return (
    <header
      className={classNames(
        'flex justify-center bg-slate-600 px-4 py-2 text-white',
        city.length > LONG_CITY_NAME ? 'text-2xl' : 'text-2xl md:text-3xl',
        className
      )}
    >
      <h1 className="max-w-[700px] truncate">
        <Link to="/weather/">
          <span className="font-bold">{t('the-weather-in')}</span>{' '}
          {city || '...'}
        </Link>
      </h1>
    </header>
  )
}
