import { Children, type ReactNode } from 'react'
import ErrorBoundary from 'components/Error/Boundary'

interface IProps {
  children: ReactNode
}

/** Isolates each child so one failing section doesn't take out the others. */
const ErrorBoundaryEveryChild = ({ children }: IProps) => (
  <>
    {Children.map(children, (child, index) => (
      <ErrorBoundary key={index}>{child}</ErrorBoundary>
    ))}
  </>
)

export default ErrorBoundaryEveryChild
