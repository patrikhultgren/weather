import classNames from 'classnames'

interface IProps {
  className?: string
}

export default function ChartPlaceholder({ className }: IProps) {
  return (
    <div className={className}>
      <div className={classNames('w-[1500px]', 'mx-4', 'md:mx-auto')}>
        <div className="placeholder__animated-background h-[40px] w-[18%] md:w-[22%]" />
        <div className="placeholder__animated-background h-[230px] mt-4" />
        <div className="placeholder__animated-background h-[1px] mt-4" />
      </div>
    </div>
  )
}
