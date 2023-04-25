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
import LongArrow from 'components/Icon/LongArrow'

const CustomizedLabel = (props: any) => {
  const { x, y, value, index, data } = props
  const windSpeed = Math.round(value)
  const windDirection = data?.[index]?.windDirection

  return (
    <>
      <text
        x={x}
        y={y - 8}
        dy={-4}
        fill="#000"
        fontSize="0.9rem"
        fontWeight="bold"
        textAnchor="middle"
      >
        {windSpeed}
      </text>
      {typeof windDirection !== 'undefined' && (
        <LongArrow
          degress={windDirection}
          title=""
          x={x - 8}
          y={y - 46}
          size={15}
        />
      )}
    </>
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
            x: format(hour.time, 'HH'),
            y: hour.data.instant.details.wind_speed,
            windDirection: hour.data.instant.details.wind_from_direction,
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
    <div className="mt-4 border-t pt-4 border-slate-300">
      <h2 className="font-bold ml-4 text-xl md:text-2xl">Vind (m/s)</h2>
      <ResponsiveContainer width="100%" aspect={8}>
        <LineChart
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
          <Tooltip wrapperClassName="hidden md:block" />
          <Line
            isAnimationActive={false}
            type="monotone"
            name="Vind"
            dataKey="y"
            stroke="#c026d3"
            strokeWidth={2}
            label={<CustomizedLabel data={data} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
