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
// import PartlyCloudyDay from 'components/Icon/Weather/PartlyCloudyDay'

const CustomizedLabel = (props: {
  x: number
  y: number
  stroke: string
  value: number
  index: number
}) => {
  const { x, y, value, index } = props
  const temperature = Math.round(value)

  return (
    <>
      <text
        x={x}
        y={y - 8}
        dy={-4}
        fill={temperature > 0 ? '#b91c1c' : '#1d4ed8'}
        fontSize="0.9rem"
        fontWeight="bold"
        textAnchor="middle"
      >
        {temperature.toLocaleString()}
      </text>
      {/* {index % 2 !== 0 && <PartlyCloudyDay x={x + -15} y={y - 50} size={30} />} */}
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
            time: hour.time,
            x: format(hour.time, 'HH'),
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
            left: 5,
            bottom: 38,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={1} dataKey="x" tick={<AxisTickHour data={data} />} />
          <YAxis />
          <Tooltip />
          <Line
            isAnimationActive={false}
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
