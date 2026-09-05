interface IProps {
  className?: string
}

export default function ChartPlaceholder({ className }: IProps) {
  return (
    <div className={className}>
      <div className="mx-4 w-[1500px] md:mx-auto">
        <div className="placeholder-shimmer h-[40px] w-[18%] md:w-[22%]" />
        <div className="placeholder-shimmer mt-4 h-[230px]" />
        <div className="placeholder-shimmer mt-4 h-px" />
      </div>
    </div>
  )
}
