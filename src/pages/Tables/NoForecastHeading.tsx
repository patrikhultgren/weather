import type { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function NoForecastHeading({ children }: IProps) {
  return <h2 className="text-2xl font-bold md:text-3xl">{children}</h2>
}
