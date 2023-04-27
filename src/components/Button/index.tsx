import { ReactNode, MouseEventHandler } from 'react'
import classNames from 'classnames'

interface IProps {
  className?: string
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ className, children, onClick }: IProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        'flex',
        'items-center',
        'py-2',
        'px-4',
        'bg-slate-50',
        'rounded',
        'hover:bg-slate-600',
        'border',
        'border-slate-300',
        'shadow',
        'hover:text-white',
        className
      )}
    >
      {children}
    </button>
  )
}
