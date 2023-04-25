type IProps = React.SVGProps<SVGSVGElement> & {
  title: string
  size?: number
  x?: string | number
  y?: string | number
}

const Rain = ({
  className = 'w-10 h-10',
  x = 0,
  y = 0,
  size,
  title,
  ...rest
}: IProps) => (
  <svg
    x={x}
    y={y}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={size}
    height={size}
    className={className}
    {...rest}
  >
    {title && <title>{title}</title>}
    <symbol id="raindrop">
      <path
        fill="#0062bf"
        d="M2.5,13A2.5,2.5,0,0,1,.21,9.51l3.55-8a2.5,2.5,0,0,1,4.57,2l-3.55,8A2.5,2.5,0,0,1,2.5,13Z"
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
    <symbol id="s09">
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
        xlinkHref="#raindrop"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(32,78) scale(1,1)"
      ></use>
      <use
        xlinkHref="#raindrop"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(45,87) scale(1,1)"
      ></use>
      <use
        xlinkHref="#raindrop"
        x="0"
        y="0"
        width="100"
        height="100"
        transform="translate(60,78) scale(1,1)"
      ></use>
    </symbol>
    <use xlinkHref="#s09" x="0" y="0" width="100" height="100"></use>
  </svg>
)

export default Rain
