import { ReactNode } from 'react'
import classNames from 'classnames'

interface IProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className }: IProps) {
  return (
    <div
      className={classNames(
        'md:px-0 relative max-w-[450px] mx-auto',
        className
      )}
    >
      {children}
    </div>
  )
}
