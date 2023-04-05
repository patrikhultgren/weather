import classNames from 'classnames'

import Container from 'components/Container'
import ErrorIcon from 'components/Icon/Error'
import { IError } from 'utils/types'

interface Props {
  error: IError
  className?: string
}

const Error = ({ error, className }: Props) => (
  <div className={classNames('bg-red-100', 'p-4', className)}>
    <Container className="flex items-center">
      <ErrorIcon />
      <span className="ml-2">{error.message}</span>
    </Container>
  </div>
)

export default Error
