interface Props {
  size?: number
}

const Gps = ({ size = 24 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="rotate-45"
  >
    <polygon points="12 2 19 21 12 17 5 21 12 2" />
  </svg>
)

export default Gps
