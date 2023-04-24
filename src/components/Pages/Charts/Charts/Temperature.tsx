import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { IApp } from 'utils/types'
import { format } from 'utils/date'
import AxisTickHour from 'components/AxisTickHour'

interface IProps {
  app: IApp
}

export default function Temperature({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        let hourIndex = 0

        for (const hour of day) {
          hours.push({
            x: format(hour.time, 'd MMM HH').replace('.', ' kl '),
            y: hour.data.instant.details.air_temperature,
          })

          hourIndex++
        }

        if (currentDay == 2) {
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
            top: 10,
            right: 10,
            left: 0,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis interval={1} dataKey="x" tick={<AxisTickHour />} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            name="Temperatur"
            dataKey="y"
            stroke="#dc2626"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
