import { useMemo } from 'react'
import { IApp } from 'utils/types'
import { format } from 'utils/date'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface IProps {
  app: IApp
}

export default function Wind({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        let hourIndex = 0

        for (const hour of day) {
          hours.push({
            x: format(hour.time, hourIndex === 0 ? 'dMMMMM' : 'HH'),
            y: hour.data.instant.details.wind_speed,
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
    <div className="">
      <h2 className="font-bold ml-4 md:text-2xl md:text-center">Vind</h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Vind" dataKey="y" stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
