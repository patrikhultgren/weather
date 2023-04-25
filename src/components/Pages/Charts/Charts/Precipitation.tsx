import { useMemo } from 'react'
import {
  CartesianGrid,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IApp } from 'utils/types'
import { format } from 'utils/date'
import AxisTickHour from 'components/AxisTickHour'

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
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        for (const hour of day) {
          hours.push({
            time: hour.time,
            x: format(hour.time, 'HH'),
            y: hour.data?.next_1_hours?.details?.precipitation_amount,
          })
        }

        if (currentDay === 2) {
          break
        }

        currentDay++
      }
    }

    return hours
  }, [app])

  return (
    <div className="mt-4">
      <h2 className="font-bold ml-4 text-xl md:text-2xl">Nederbörd (mm)</h2>
      <ResponsiveContainer width="100%" aspect={8}>
        <AreaChart
          data={data}
          margin={{
            top: 30,
            right: 10,
            left: -30,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={0} dataKey="x" tick={<AxisTickHour data={data} />} />
          <YAxis />
          <Tooltip wrapperClassName="hidden md:block" />
          <Area
            isAnimationActive={false}
            type="monotone"
            name="Nederbörd"
            dataKey="y"
            stroke="#075985"
            strokeWidth={1}
            label={CustomizedLabel}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
