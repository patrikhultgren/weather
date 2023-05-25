import { ReactNode } from 'react'
import ErrorBoundary from 'components/Error/Boundary'

interface IProps {
  children: Array<ReactNode>
}

const ErrorBoundaryEveryChild = ({ children }: IProps) => (
  <>
    {children.map((child, index) => (
      <ErrorBoundary key={index}>{child}</ErrorBoundary>
    ))}
  </>
)

export default ErrorBoundaryEveryChild