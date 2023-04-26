import { useCallback } from 'react'

interface IProps {
  error: Error
}

const ErrorFallback = ({ error }: IProps) => {
  const onClick = useCallback(() => {
    window.location.reload()
  }, [])

  return (
    <div className="bg-red-200 p-4" role="alert">
      <div className="flex items-center justify-center">
        <div>
          <p className="text-lg">Någonting gick fel</p>
          <pre className="mt-2 text-sm">{error.message}</pre>
          <button
            className="mt-3 bg-red-700 hover:bg-red-600 px-3 py-2 text-white rounded"
            type="button"
            onClick={onClick}
          >
            Ladda om sidan
          </button>
        </div>
      </div>
    </div>
  )
}
export default ErrorFallback
