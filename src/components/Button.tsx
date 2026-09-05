import type { MouseEventHandler, ReactNode } from 'react'
import classNames from 'classnames'

const variants = {
  primary: 'border-slate-300 bg-slate-50 hover:bg-slate-600 hover:text-white',
  secondary: 'border-red-800 bg-red-700 text-white hover:bg-red-600',
}

export interface IProps {
  id?: string
  className?: string
  children: ReactNode
  ariaControls?: string
  ariaExpanded?: boolean
  ariaPressed?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: keyof typeof variants
}

export default function Button({
  id,
  className,
  children,
  ariaControls,
  ariaExpanded,
  ariaPressed,
  variant = 'primary',
  onClick,
}: IProps) {
  return (
    <button
      id={id}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      onClick={onClick}
      type="button"
      className={classNames(
        'flex items-center rounded border px-4 py-2 shadow',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  )
}
