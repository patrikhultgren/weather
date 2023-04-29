import Spinner from 'components/Icon/Spinner'
import ErrorAlert from 'components/Error/Alert'
import { IError } from 'utils/types'

export interface IProps {
  error?: IError
  loading: boolean
}

const Loading = ({ error, loading }: IProps) => {
  if (error) {
    return <ErrorAlert error={error} />
  } else if (loading) {
    return <Spinner />
  }

  return null
}

export default Loading
