import classNames from 'classnames'

interface IProps {
  className?: string
}

export default function ChartPlaceholder({ className }: IProps) {
  return (
    <div className={className}>
      <div
        className={classNames(
          'w-[1500px]',
          'mx-auto',
          'placeholder',
          'h-[230px]'
        )}
      >
        <div className="placeholder__animated-background h-[230px]" />
      </div>
    </div>
  )
}
