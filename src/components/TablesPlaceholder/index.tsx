import classNames from 'classnames'

interface IProps {
  className?: string
}

export default function TablesPlaceholder({ className }: IProps) {
  return (
    <div className={className}>
      <div className={classNames('placeholder', 'h-[230px]')}>
        <div className="placeholder__animated-background h-[230px]" />
      </div>
      <div
        className={classNames(
          'placeholder',
          'mx-auto',
          'h-[42px] w-[174px]',
          className
        )}
      >
        <div className="placeholder__animated-background h-[44px]" />
      </div>
    </div>
  )
}
