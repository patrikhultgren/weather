import { useMemo } from 'react'
import classNames from 'classnames'
import { IWeather } from 'utils/types'

interface IProps {
  weather: IWeather
  className?: string
}

export default function Header({ weather, className }: IProps) {
  const { city } = weather

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
        'border-b-4',
        'border-b-slate-400',
        'text-white',
        textSize,
        className
      )}
    >
      <h1 className="truncate">
        <span className="font-bold">Vädret i</span> {city ? city : '...'}
      </h1>
    </header>
  )
}
