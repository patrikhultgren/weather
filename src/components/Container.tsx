import classNames from 'classnames'
import type { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className }: IProps) {
  return (
    <div
      className={classNames(
        'relative mx-auto max-w-[600px] md:px-0',
        className
      )}
    >
      {children}
    </div>
  )
}
