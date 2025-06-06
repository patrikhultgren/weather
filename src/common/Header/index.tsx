import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  city: string
  className?: string
}

export default function Header({ city, className }: IProps) {
  const { t } = useTranslation()

  const textSize = useMemo(
    () => (city.length > 40 ? 'text-2xl' : 'text-2xl md:text-3xl'),
    [city]
  )

  return (
    <header
      className={classNames(
        'flex',
        'justify-center',
        'px-4',
        'py-2',
        'bg-slate-600',
        'text-white',
        textSize,
        className
      )}
    >
      <h1 className="truncate max-w-[700px]">
        <Link to="/weather/">
          <span className="font-bold">{t('the-weather-in')}</span>{' '}
          {city ? city : '...'}
        </Link>
      </h1>
    </header>
  )
}
