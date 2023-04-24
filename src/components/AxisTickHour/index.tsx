import { format } from 'utils/date'

const AxisTickHour = ({ x, y, stroke, payload, index, data }: any) => {
  const markVisually = Boolean(
    index === 0 ||
      (data &&
        index > 1 &&
        format(data[index * 2].time, 'd') !==
          format(data[index * 2 - 2].time, 'd'))
  )

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={0}
        textAnchor="middle"
        fill="#212121"
        transform="rotate(0)"
        fontSize="1rem"
        fontWeight={markVisually ? 'bold' : ''}
      >
        <tspan x="0" dy="18">
          {payload.value}
        </tspan>
        {markVisually && (
          <tspan x="0" dy="22">
            {format(data[index * 2].time, 'd MMM')}
          </tspan>
        )}
      </text>
    </g>
  )
}

export default AxisTickHour
