import Spinner from 'components/Icon/Spinner'
import Error from 'components/Error'
import { IError, IAppStatus } from 'utils/types'

export interface IProps {
  error?: IError
  status: IAppStatus
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
