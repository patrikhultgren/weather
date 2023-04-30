import { format } from 'utils/date'

const AxisTickHour = ({ x, y, stroke, payload, index, data }: any) => {
  const markThisVisually = Boolean(
    index === 0 ||
      (data &&
        format(data[index].time, 'd') !== format(data[index - 1].time, 'd'))
  )

  const markNextVisually = Boolean(
    index + 1 < data.length &&
      data &&
      format(data[index].time, 'd') !== format(data[index + 1].time, 'd')
  )

  const markCurrentVisually = markThisVisually && !markNextVisually

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
        fontWeight={markCurrentVisually ? 'bold' : ''}
      >
        <tspan x="0" dy="18">
          {payload.value}
        </tspan>
        {markCurrentVisually && (
          <tspan x="0" dy="22">
            {format(data[index * 1].time, 'd MMM')}
          </tspan>
        )}
      </text>
    </g>
  )
}

export default AxisTickHour
