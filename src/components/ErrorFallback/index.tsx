import { useCallback } from 'react'
import Container from 'components/Container'

interface IProps {
  error: Error
}

const ErrorFallback = ({ error }: IProps) => {
  const onClick = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="bg-akb-pink p-4" role="alert">
      <Container className="flex items-center">
        <div>
          <p className="text-lg">Någonting gick fel</p>
          <pre className="mt-2 text-sm">{error.message}</pre>
          <button className="mt-3" type="button" onClick={onClick}>
            Ladda om sidan
          </button>
        </div>
      </Container>
    </div>
  )
}
export default ErrorFallback
