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
        'bg-slate-100',
        'text-black',
        'flex',
        'px-4',
        'py-2',
        'flex',
        'justify-center',
        'text-3xl',
        'border-b',
        'border-slate-300',
        className
      )}
    >
      {position && <h1>Vädret i {position.city}</h1>}
    </header>
  )
}
