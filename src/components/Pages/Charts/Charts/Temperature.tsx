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
import PartlyCloudyNight from 'components/Icon/Weather/PartlyCloudyNight'
import Snow from 'components/Icon/Weather/Snow'
import Sleet from 'components/Icon/Weather/Sleet'
import Rain from 'components/Icon/Weather/Rain'
import {
  ClearSkyDay,
  ClearSkyNight,
  Cloudy,
  FairDay,
  FairNight,
  Fog,
  LightSleet,
  LightSnow,
  PartlyCloudyDay,
} from '@patrikhultgren/react-weather-icons'

const ICON_SIZE = 30

const icons: { [key: string]: any } = {
  partlycloudy_night: PartlyCloudyNight,
  fair_night: FairNight,
  clearsky_night: ClearSkyNight,
  clearsky_day: ClearSkyDay,
  partlycloudy_day: PartlyCloudyDay,
  cloudy: Cloudy,
  lightsnow: LightSnow,
  snow: Snow,
  fog: Fog,
  lightsleet: LightSleet,
  fair_day: FairDay,
  sleet: Sleet,
  rain: Rain,
}

const CustomizedLabel = (props: any) => {
  const { x, y, value, index, data } = props
  const temperature = Math.round(value)
  const Icon = icons[data?.[index]?.symbolCode]

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
      {index % 2 !== 0 && Icon && (
        <Icon
          x={x + -15}
          y={y < TOP + ICON_SIZE + 5 ? y + 10 : y - 60}
          size={ICON_SIZE}
        />
      )}
    </>
  )
}

const TOP = 25

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
            top: TOP,
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
