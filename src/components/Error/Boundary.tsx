import { useCallback, type ErrorInfo, type ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import ErrorBoundaryFallback from './BoundaryFallback'

interface IProps {
  children: ReactNode
}

const ErrorBoundary = ({ children }: IProps) => {
  const onError = useCallback((error: unknown, info: ErrorInfo) => {
    console.error({ error, stack: info.componentStack })
  }, [])

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary
