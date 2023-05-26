type IProps = React.SVGProps<SVGSVGElement> & {
  degress: number
  title: string
  size?: number
  x?: string | number
  y?: string | number
}

const LongArrow = ({
  degress,
  title,
  x = 0,
  y = 0,
  size = 18,
  ...rest
}: IProps) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="0"
    viewBox="0 0 15 15"
    x={x}
    y={y}
    height={size}
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    {title && <title>{title}</title>}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      className="origin-center"
      transform={`rotate(${degress}) translate(0,0)`}
      d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z"
      fill="currentColor"
    ></path>
  </svg>
)

export default LongArrow
