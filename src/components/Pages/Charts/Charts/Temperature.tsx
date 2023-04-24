import { useMemo } from 'react'
import {
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
import PartlyCloudyDay from 'components/Icon/Weather/PartlyCloudyDay'

const CustomizedLabel = (props: {
  x: number
  y: number
  stroke: string
  value: number
  index: number
}) => {
  const { x, y, value, index } = props

  return (
    <>
      <text
        x={x}
        y={y - 8}
        dy={-4}
        fill={value > 0 ? '#b91c1c' : '#1d4ed8'}
        fontSize={12}
        fontWeight="bold"
        textAnchor="middle"
      >
        {value.toLocaleString()}
      </text>
      {index % 2 !== 0 && <PartlyCloudyDay x={x + -15} y={y - 50} size={30} />}
    </>
  )
}

interface IProps {
  app: IApp
}

export default function Temperature({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        for (const hour of day) {
          hours.push({
            x: format(hour.time, 'd MMM HH').replace('.', ' kl '),
            y: hour.data.instant.details.air_temperature,
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
    <div>
      <h2 className="font-bold ml-4 md:text-2xl md:text-center">
        Temperatur (grader)
      </h2>
      <ResponsiveContainer width="100%" aspect={4}>
        <LineChart
          data={data}
          margin={{
            top: 70,
            right: 10,
            left: 0,
            bottom: 35,
          }}
        >
          <XAxis interval={1} dataKey="x" tick={<AxisTickHour />} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            name="Temperatur"
            dataKey="y"
            stroke="#dc2626"
            strokeWidth={2}
            label={CustomizedLabel}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
