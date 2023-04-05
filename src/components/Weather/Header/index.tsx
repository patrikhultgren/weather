import classNames from 'classnames'

interface IProps {
  weather: any
  className?: string
}

export default function Header({ weather, className }: IProps) {
  const { position } = weather.response

  return (
    <header
      className={classNames(
        'flex',
        'justify-center',
        'px-4',
        'py-2',
        'bg-slate-600',
        'text-3xl',
        'text-white',
        className
      )}
    >
      {position && <h1>Vädret i {position.city}</h1>}
    </header>
  )
}
