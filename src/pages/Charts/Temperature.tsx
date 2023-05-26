import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import { IApp, ITimeSerie } from 'utils/types'
import { format } from 'utils/date'
import weatherIcons from 'config/weatherIcons'
import { getAirTemperature } from 'utils/weather'
import usePrepareChartData from './utils/usePrepareChartData'
import AxisTickHour from './utils/AxisTickHour'

const LINE_CHART_TOP = 25
const ICON_SIZE = 30

const prepareChartData = (hour: ITimeSerie) => ({
  time: hour.time,
  symbolCode: hour.data?.next_1_hours?.summary?.symbol_code,
  x: format(hour.time, 'HH'),
  y: getAirTemperature(hour),
})

const CustomizedLabel = (props: any) => {
  const { x, y, value, index, data } = props
  const temperature = Math.round(value)
  const weather = weatherIcons[data?.[index]?.symbolCode]
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
  const data = usePrepareChartData({
    days: app.days,
    prepare: prepareChartData,
  })

  return (
    <article>
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
    </article>
  )
}
