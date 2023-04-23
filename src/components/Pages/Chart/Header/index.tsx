import { useMemo } from 'react'
import classNames from 'classnames'
import { IApp } from 'utils/types'

interface IProps {
  app: IApp
  className?: string
}

export default function Header({ app, className }: IProps) {
  const { city } = app

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
