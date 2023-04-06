import { useCallback, useState, useMemo } from 'react'
import { format } from 'utils/date'
import Arrow from 'components/Icon/Arrow'
import classNames from 'classnames'
import Hours from './Hours'

interface IProps {
  day: any
  dayIndex: number
}

export default function Day({ day, dayIndex }: IProps) {
  const [showAll, setShowAll] = useState<boolean>(false)

  const onClick = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  const showAllEnabled = useMemo(() => day.length > 4, [day])

  const hours = useMemo(() => {
    const hoursPerPart = Math.floor(day.length / 4)
    let countHours = 0

    return day.filter((_hour: any, hourIndex: number) => {
      if (showAll || !showAllEnabled) {
        return true
      } else {
        if (hourIndex % hoursPerPart === 0 && countHours < 4) {
          countHours++
          return true
        }
      }

      return false
    })
  }, [day, showAll, showAllEnabled])

  return (
    <article className="mt-6 first:mt-0 md:first:mt-4" key={day[0].time}>
      <h2 className="font-bold text-xl py-2 bg-slate-200 px-3 py-1 border-t border-slate-300">
        <span className="capitalize">{format(day[0].time, 'EEEE')}</span>{' '}
        {format(day[0].time, 'd MMMM')}
      </h2>
      <table
        className={classNames(
          'w-full',
          'table-fixed',
          'border-collapse',
          'border',
          'border-slate-300',
          'text-lg',
          'duration-700'
        )}
      >
        <thead>
          <tr>
            <th className="text-left border-y border-slate-300 px-2 py-1 text-center">
              Tid
            </th>
            <th className="text-left border-y border-slate-300 px-2 py-1 text-center">
              Väder
            </th>
            <th className="text-left border-y border-slate-300 px-2 py-1 text-center">
              Temp
            </th>
            <th className="text-left border-y border-slate-300 px-2 py-1 text-center">
              Vind
            </th>
          </tr>
        </thead>
        <tbody className="">
          <Hours hours={hours} showAll={showAll} />
        </tbody>
      </table>
      {showAllEnabled && (
        <button
          onClick={onClick}
          type="button"
          className="py-2 block flex mx-auto items-center bg-slate-50 px-4 mt-6 rounded hover:bg-slate-600 border border-slate-300 shadow hover:text-white"
        >
          <span className="mr-1">
            {showAll ? 'Visa färre timmar' : 'Visa alla timmar'}
          </span>
          <Arrow direction={showAll ? 'up' : 'down'} />
        </button>
      )}
    </article>
  )
}
