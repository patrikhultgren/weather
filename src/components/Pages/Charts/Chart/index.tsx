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

export default function Forecast({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        for (const hour of day) {
          hours.push({
            airTemperature: hour.data.instant.details.air_temperature,
            hour: format(hour.time, 'HH'),
          })
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
    <div className="md:ml-10 md:mr-20 md:my-10 md:mb-20">
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="airTemperature" stroke="#dc2626" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
