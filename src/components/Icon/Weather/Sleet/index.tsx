interface IProps {
  className?: string
  x?: string | number
  y?: string | number
  size?: string | number
}

const Sleet = ({ className = 'w-10 h-10', x, y, size }: IProps) => (
  <svg
    x={x}
    y={y}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    height={size}
    className={className}
  >
    <title>Snöblandet regn</title>
    <symbol id="raindrop">
      <path
        fill="#0062bf"
        d="M2.5,13A2.5,2.5,0,0,1,.21,9.51l3.55-8a2.5,2.5,0,0,1,4.57,2l-3.55,8A2.5,2.5,0,0,1,2.5,13Z"
      ></path>
    </symbol>
    <symbol id="snowflake">
      <path
        fill="#47c0e3"
        d="M11.68,4.47H8.85L10.27,2A1.35,1.35,0,1,0,7.93.67L6.51,3.12,5.1.67A1.35,1.35,0,0,0,3.26.18,1.35,1.35,0,0,0,2.76,2L4.18,4.47H1.35a1.35,1.35,0,1,0,0,2.7H4.18L2.76,9.62a1.35,1.35,0,0,0,.49,1.84A1.39,1.39,0,0,0,5.1,11L6.51,8.52,7.93,11a1.35,1.35,0,1,0,2.34-1.35L8.85,7.17h2.83a1.35,1.35,0,1,0,0-2.7Z"
      ></path>
    </symbol>
    <symbol id="cloud">
      <path d="M55.7,5A23.94,23.94,0,0,0,34.37,18.05a9.9,9.9,0,0,0-12.78,5.56,15,15,0,0,0-1.71-.1A14.81,14.81,0,0,0,9.2,28,14.63,14.63,0,0,0,5,38.17v.21A14.83,14.83,0,0,0,19.88,53.06H75.59a14.3,14.3,0,0,0,3.67-28.14A23.93,23.93,0,0,0,55.7,5Z"></path>
      <image
        x="5"
        y="14"
        width="85"
        height="43"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAAkCAMAAAAkYj0PAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURSgoKExpcaCgoFBQUG5ublBQUISEhI1fsT0AAAAHdFJOUxsACBsPFRpGXuFgAAABWElEQVRIx7XV25bDIAgF0BMu/v8nF/E+iWlqHNKVN3cpIMXxL4GFM3SQfTazkUyxk63oLYwlVSy2silXkS/wUrZS2a3ZCn1zsdSw7UUYijuHsTa1IvfwWrbSXLkc4N9r27JViwmM1UtWXA3hohQ41m6vl8FQZi7wu2z7KXPW4uRiZS+2AmdXN7DdQEQWQHYHlt6z0dXBBa2xeeVktiZc1jDoF5eGkI4d4MjKc7cNbZ3bqjocLLx5oPDYTaIftcfvAvcs2GFxVsJTOP1wO1jGdUSLaz/DWA1Tl45+Tkqul2ArcPzayGq8JafOUffP3TUp6JQs+Rptc6vtmtBkUw+dv0NzWG0PYf8O7Ym09+ITXyXOPZqEX95aFe3PKxRsL2XV3HR+ZALirPSF0ceHp6F51WBv1A22VaW2GHWzWvat8LOAPf4CrjrA+neNK7+PQBf/DmmLrId09/QDWyESBsibwBUAAAAASUVORK5CYII="
      ></image>
    </symbol>

    <symbol id="s12">
      <use
        xlinkHref="#cloud"
        fill="#b2b2b2"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(3,18) scale(1,1)"
      ></use>
      <use
        xlinkHref="#snowflake"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(30,79) scale(1,1)"
      ></use>
      <use
        xlinkHref="#raindrop"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(46,86) scale(1,1)"
      ></use>
      <use
        xlinkHref="#raindrop"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(60,80) scale(1,1)"
      ></use>
    </symbol>
    <use xlinkHref="#s12" x="0" y="0" width="100" height="100"></use>
  </svg>
)

export default Sleet
