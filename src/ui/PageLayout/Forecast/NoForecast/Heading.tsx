import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

export default function Heading({ children }: IProps) {
  return <h2 className="text-2xl md:text-3xl font-bold">{children}</h2>
}
