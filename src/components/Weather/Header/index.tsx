import classNames from 'classnames'

interface IProps {
  weather: any
  className?: string
}

export default function Header({ weather, className }: IProps) {
  const { city } = weather

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
        'text-2xl',
        'md:text-3xl',
        'text-white',
        className
      )}
    >
      <h1 className="truncate">Vädret i {city ? city : '...'}</h1>
    </header>
  )
}
