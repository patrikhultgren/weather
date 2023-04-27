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
  id?: string
  className?: string
  children: ReactNode
  ariaControls?: string
  ariaExpanded?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: 'primary' | 'secondary'
}

export default function Button({
  id,
  className,
  children,
  ariaControls,
  ariaExpanded,
  variant = 'primary',
  onClick,
}: IProps) {
  return (
    <button
      id={id}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
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
