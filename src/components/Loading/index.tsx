import Spinner from 'components/Icon/Spinner'
import Error from 'components/Error'
import { IError } from 'utils/types'

export interface IProps {
  error?: IError
  status: any
}

const Loading = ({ error, status }: IProps) => {
  if (error) {
    return <Error error={error} />
  } else if (status.loading && status.type === 'spinner') {
    return <Spinner />
  }

  return null
}

export default Loading
