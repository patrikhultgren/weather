import { useMemo } from 'react'
import { IApp } from 'utils/types'
import { format } from 'utils/date'

import Temperature from './Temperature'
import Precipitation from './Precipitation'

interface IProps {
  app: IApp
}

export default function Charts({ app }: IProps) {
  const data = useMemo(() => {
    let hours = []

    if (app.days) {
      let currentDay = 0

      for (const day of app.days) {
        let hourIndex = 0

        for (const hour of day) {
          hours.push({
            airTemperature: hour.data.instant.details.air_temperature,
            hour: format(hour.time, hourIndex === 0 ? 'dMMMMM' : 'HH'),
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
      <Temperature app={app} />
      <Precipitation app={app} />
    </div>
  )
}
