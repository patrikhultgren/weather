import Spinner from 'components/Icon/Spinner'
import ErrorAlert from 'components/Error/Alert'
import type { IError } from 'types'

interface IProps {
  error?: IError | null
  loading: boolean
}

const Loading = ({ error, loading }: IProps) => {
  if (error) {
    return <ErrorAlert key={error.message} error={error} />
  }

  if (loading) {
    return <Spinner />
  }

  return null
}

export default Loading
