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

export default function Precipitation({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        let hourIndex = 0

        for (const hour of day) {
          hours.push({
            x: format(hour.time, hourIndex === 0 ? 'dMMMMM' : 'HH'),
            y: hour.data?.next_1_hours?.details?.precipitation_amount,
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
    <div className="md:ml-10 md:mr-20 md:my-10 md:mb-20">
      <ResponsiveContainer width="100%" aspect={6}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Nederbörd" dataKey="y" stroke="#0369a1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
