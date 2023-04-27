import { ReactNode, MouseEventHandler } from 'react'
import classNames from 'classnames'

const classes = {
  primary: [
    'bg-slate-50',
    'hover:bg-slate-600',
    'border-slate-300',
    'hover:text-white',
  ],
  secondary: ['bg-red-700', 'hover:bg-red-600', 'text-white'],
}

interface IProps {
  className?: string
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: 'primary' | 'secondary'
}

export default function Button({
  className,
  children,
  variant = 'primary',
  onClick,
}: IProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'flex',
        'items-center',
        'py-2',
        'px-4',
        'rounded',
        'border',
        'shadow',
        classes[variant],
        className
      )}
    >
      {children}
    </button>
  )
}
