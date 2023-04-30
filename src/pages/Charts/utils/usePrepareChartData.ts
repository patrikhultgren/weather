import { useMemo } from 'react'
import { ITimeSerie } from 'utils/types'

interface IProps {
  days: Array<Array<ITimeSerie>> | null
  prepare: (hour: ITimeSerie) => any
}

const usePrepareChartData = ({ days, prepare }: IProps): Array<any> =>
  useMemo(() => {
    let data = []

    if (days) {
      let currentDay = 0

      for (const day of days) {
        for (const hour of day) {
          data.push(prepare(hour))
        }

        if (currentDay === 2) {
          break
        }

        currentDay++
      }
    }

    return data
  }, [days, prepare])

export default usePrepareChartData
