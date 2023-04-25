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
import { weathers } from 'config'

const LINE_CHART_TOP = 25
const ICON_SIZE = 30

const CustomizedLabel = (props: any) => {
  const { x, y, value, index, data } = props
  const temperature = Math.round(value)
  const weather = weathers[data?.[index]?.symbolCode]
  const WeatherIcon = weather?.Icon

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
        {temperature}
      </text>
      {index % 2 !== 0 && WeatherIcon && (
        <WeatherIcon
          x={x + -15}
          y={y < LINE_CHART_TOP + ICON_SIZE + 5 ? y + 10 : y - 60}
          size={ICON_SIZE}
          title={weather?.title}
        />
      )}
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
            symbolCode: hour.data?.next_1_hours?.summary?.symbol_code,
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
      <h2 className="font-bold ml-4 text-xl md:text-2xl">
        Väder och temperatur (grader)
      </h2>
      <ResponsiveContainer width="100%" aspect={6}>
        <LineChart
          data={data}
          margin={{
            top: LINE_CHART_TOP,
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
            name="Temperatur"
            dataKey="y"
            stroke="#dc2626"
            strokeWidth={2}
            label={<CustomizedLabel data={data} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
