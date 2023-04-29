import { ErrorInfo, ReactNode, useCallback } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from './Fallback'

interface IProps {
  children: ReactNode
}

const ErrorBoundary = ({ children }: IProps) => {
  const errorHandler = useCallback(
    (error: Error, componentStack: ErrorInfo) => {
      console.error({ error, stack: componentStack.componentStack })
    },
    []
  )

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={errorHandler}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary
