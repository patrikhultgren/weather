const AxisTickHour = ({ x, y, stroke, payload }: any) => {
  console.log('pau', payload)

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize="0.9rem"
      >
        {payload.value}
      </text>
    </g>
  )
}

export default AxisTickHour
