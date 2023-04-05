import Spinner from 'components/Icon/Spinner'
import Error from 'components/Error'
import { IError } from 'utils/types'

export interface IProps {
  error?: IError
  loading: boolean
}

const Loading = ({ error, loading }: IProps) => {
  if (error) {
    return <Error error={error} />
  } else if (loading) {
    return <Spinner />
  }

  return null
}

export default Loading
