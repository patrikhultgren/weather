interface IProps {
  className?: string
}

const ClearSkyNight = ({ className = 'w-10 h-10' }: IProps) => (
  <svg
    x="0"
    y="0"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <title>Klar natt</title>
    <symbol id="moon">
      <path
        d="M28.43,0A28.44,28.44,0,0,1,32.3,14.32,28.61,28.61,0,0,1,3.69,42.93,28.71,28.71,0,0,1,0,42.66,28.59,28.59,0,1,0,28.43,0Z"
        fill="url(#moon-grad)"
      ></path>
    </symbol>
    <defs>
      <linearGradient id="moon-grad" x1="0%" y1="50%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#686e73" />
        <stop offset="100%" stopColor="#6a7075" />
      </linearGradient>
    </defs>
    <symbol id="s01n">
      <use
        xlinkHref="#moon"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(20,20) scale(1,1)"
      ></use>
    </symbol>
    <use xlinkHref="#s01n" x="0" y="0" width="100" height="100"></use>
  </svg>
)

export default ClearSkyNight