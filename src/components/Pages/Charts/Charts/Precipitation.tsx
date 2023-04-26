import {
  CartesianGrid,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { IApp, ITimeSerie } from 'utils/types'
import { format } from 'utils/date'
import AxisTickHour from 'components/AxisTickHour'
import usePrepareChartData from 'hooks/usePrepareChartData'

const prepareChartData = (hour: ITimeSerie) => ({
  time: hour.time,
  x: format(hour.time, 'HH'),
  y: hour.data?.next_1_hours?.details?.precipitation_amount,
})

const CustomizedLabel = (props: {
  x: number
  y: number
  stroke: string
  value: number
}) => {
  const { x, y, value } = props

  return (
    <text
      x={x}
      y={y - 8}
      dy={-4}
      fill="#000"
      fontSize="0.9rem"
      fontWeight="bold"
      textAnchor="middle"
    >
      {value && value.toLocaleString()}
    </text>
  )
}

interface IProps {
  app: IApp
}

export default function Precipitation({ app }: IProps) {
  const data = usePrepareChartData({
    days: app.days,
    prepare: prepareChartData,
  })

  return (
    <div className="mt-4 border-t pt-4 border-slate-300">
      <h2 className="font-bold ml-4 text-xl md:text-2xl">Nederbörd (mm)</h2>
      <ResponsiveContainer width="100%" aspect={8}>
        <AreaChart
          data={data}
          margin={{
            top: 30,
            right: 20,
            left: -20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={0} dataKey="x" tick={<AxisTickHour data={data} />} />
          <YAxis />
          <Area
            isAnimationActive={false}
            type="monotone"
            name="Nederbörd"
            dataKey="y"
            stroke="#0ea5e9"
            fill="#38bdf8"
            strokeWidth={1}
            label={CustomizedLabel}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
