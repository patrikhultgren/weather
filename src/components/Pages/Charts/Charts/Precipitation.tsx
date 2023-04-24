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

export default function Precipitation({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        for (const hour of day) {
          hours.push({
            x: format(hour.time, 'd MMM HH').replace('.', ' kl '),
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
      <h2 className="font-bold ml-4 md:text-2xl md:text-center">
        Nederbörd (mm)
      </h2>
      <ResponsiveContainer width="100%" aspect={6}>
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
            name="Nederbörd"
            dataKey="y"
            stroke="#0284c7"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
