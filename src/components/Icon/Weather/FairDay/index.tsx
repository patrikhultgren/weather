import { useId } from 'react'

interface IProps {
  className?: string
  size?: string
  title?: string
}

const FairDay = ({ className, size = '2.5rem', title }: IProps) => {
  const cloud = useId()
  const cloudMask = useId()
  const sun = useId()
  const sunGlowGrad = useId()
  const s02d = useId()

  return (
    <svg
      x="0"
      y="0"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={size}
      height={size}
      className={className}
    >
      {title && <title>{title}</title>}
      <symbol id={cloud}>
        <path d="M55.7,5A23.94,23.94,0,0,0,34.37,18.05a9.9,9.9,0,0,0-12.78,5.56,15,15,0,0,0-1.71-.1A14.81,14.81,0,0,0,9.2,28,14.63,14.63,0,0,0,5,38.17v.21A14.83,14.83,0,0,0,19.88,53.06H75.59a14.3,14.3,0,0,0,3.67-28.14A23.93,23.93,0,0,0,55.7,5Z"></path>
        <image
          x="5"
          y="14"
          width="85"
          height="43"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAkCAMAAAAkYj0PAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURSgoKExpcaCgoFBQUG5ublBQUISEhI1fsT0AAAAHdFJOUxsACBsPFRpGXuFgAAABWElEQVRIx7XV25bDIAgF0BMu/v8nF/E+iWlqHNKVN3cpIMXxL4GFM3SQfTazkUyxk63oLYwlVSy2silXkS/wUrZS2a3ZCn1zsdSw7UUYijuHsTa1IvfwWrbSXLkc4N9r27JViwmM1UtWXA3hohQ41m6vl8FQZi7wu2z7KXPW4uRiZS+2AmdXN7DdQEQWQHYHlt6z0dXBBa2xeeVktiZc1jDoF5eGkI4d4MjKc7cNbZ3bqjocLLx5oPDYTaIftcfvAvcs2GFxVsJTOP1wO1jGdUSLaz/DWA1Tl45+Tkqul2ArcPzayGq8JafOUffP3TUp6JQs+Rptc6vtmtBkUw+dv0NzWG0PYf8O7Ym09+ITXyXOPZqEX95aFe3PKxRsL2XV3HR+ZALirPSF0ceHp6F51WBv1A22VaW2GHWzWvat8LOAPf4CrjrA+neNK7+PQBf/DmmLrId09/QDWyESBsibwBUAAAAASUVORK5CYII="
        ></image>
      </symbol>
      <symbol id={sun}>
        <path
          className="sun-glow"
          fill={`url(#${sunGlowGrad})`}
          d="M66.64,47.86,82,41,66.64,34.12l9.84-13.66L59.76,22.22,61.46,5.47l-13.6,9.89L41,0,34.12,15.36,20.46,5.52l1.76,16.72L5.47,20.54l9.89,13.6L0,41l15.36,6.83L5.52,61.54l16.72-1.76L20.54,76.53l13.6-9.89L41,82l6.83-15.36,13.66,9.84L59.78,59.76l16.75,1.69Z"
        ></path>
        <path
          className="sun-outer"
          fill="#ffd348"
          d="M19.28,53.5a25,25,0,1,0,9.15-34.16A25,25,0,0,0,19.28,53.5Z"
        ></path>
        <path
          className="sun-inner"
          fill="url(#sun-inner-grad)"
          d="M22.74,51.5a21,21,0,1,0,7.69-28.69A21,21,0,0,0,22.74,51.5Z"
        ></path>
      </symbol>
      <defs>
        <mask id={cloudMask}>
          <rect x="0" y="0" width="100" height="100" fill="white"></rect>
          <use
            xlinkHref={`#${cloud}`}
            fill="black"
            stroke="black"
            strokeLinejoin="round"
            strokeWidth="10"
            x="0"
            y="0"
            width="100"
            height="100"
            transform="translate(43,37) scale(0.63,0.63)"
          ></use>
        </mask>
        <radialGradient
          id={sunGlowGrad}
          cx="41"
          cy="41"
          r="41"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="54%" stopColor="#d6b849" />
          <stop offset="67%" stopColor="#ffce47" />
          <stop offset="100%" stopColor="#ffdb73" />
        </radialGradient>
        <linearGradient id="sun-inner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffaf22" />
          <stop offset="100%" stopColor="#f09900" />
        </linearGradient>
      </defs>
      <symbol id={s02d}>
        <g mask={`url(#${cloudMask})`}>
          <use
            xlinkHref={`#${sun}`}
            x="0"
            y="0"
            width="100"
            height="100"
            transform="translate(4,9) scale(1,1)"
          ></use>
        </g>
        <use
          xlinkHref={`#${cloud}`}
          fill="#dddddd"
          x="0"
          y="0"
          width="100"
          height="100"
          transform="translate(43,37) scale(0.63,0.63)"
        ></use>
      </symbol>
      <use xlinkHref={`#${s02d}`} x="0" y="0" width="100" height="100"></use>
    </svg>
  )
}

export default FairDay
