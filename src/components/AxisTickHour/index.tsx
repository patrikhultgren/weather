import { format } from 'utils/date'

const AxisTickHour = ({ x, y, stroke, payload, index, data }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#212121"
        transform="rotate(-35)"
        fontSize="0.9rem"
        fontWeight={
          index === 0 ||
          (data &&
            index > 1 &&
            format(data[index * 2].time, 'd') !==
              format(data[index * 2 - 2].time, 'd'))
            ? 'bold'
            : ''
        }
      >
        {payload.value}
      </text>
    </g>
  )
}

export default AxisTickHour
