import { useMemo } from 'react'
import {
  CartesianGrid,
  LineChart,
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
      fontSize={12}
      fontWeight="bold"
      textAnchor="middle"
    >
      {value.toLocaleString()}
    </text>
  )
}

interface IProps {
  app: IApp
}

export default function Wind({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        for (const hour of day) {
          hours.push({
            time: hour.time,
            x: format(hour.time, 'd MMM HH').replace('.', ' kl '),
            y: hour.data.instant.details.wind_speed,
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
      <h2 className="font-bold ml-4 md:text-2xl md:text-center">Vind (m/s)</h2>
      <ResponsiveContainer width="100%" aspect={6}>
        <LineChart
          data={data}
          margin={{
            top: 25,
            right: 10,
            left: 0,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={1} dataKey="x" tick={<AxisTickHour data={data} />} />
          <YAxis />
          <Tooltip />
          <Line
            isAnimationActive={false}
            type="monotone"
            name="Vind"
            dataKey="y"
            stroke="#c026d3"
            strokeWidth={2}
            label={CustomizedLabel}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
