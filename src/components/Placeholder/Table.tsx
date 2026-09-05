interface IProps {
  className?: string
}

export default function TablePlaceholder({ className }: IProps) {
  return (
    <div className={className}>
      <div className="placeholder-block h-[230px]">
        <div className="placeholder-shimmer h-[230px]" />
      </div>
      <div className="placeholder-block mx-auto h-[42px] w-[174px]">
        <div className="placeholder-shimmer h-[44px]" />
      </div>
    </div>
  )
}
