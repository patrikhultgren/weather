import { useCallback, useState, useMemo } from 'react'
import { format } from 'utils/date'
import Arrow from 'components/Icon/Arrow'
import classNames from 'classnames'
import { isToday, isTomorrow } from 'date-fns'
import { ITimeSerie } from 'utils/types'
import Hours from './Hours'

interface IProps {
  day: Array<ITimeSerie>
}

export default function Day({ day }: IProps) {
  const [showAll, setShowAll] = useState<boolean>(false)

  const onClick = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  const showAllEnabled = useMemo(() => day.length > 4, [day])

  const hours = useMemo(() => {
    const hoursPerPart = Math.floor(day.length / 4)
    let countHours = 0

    return day.filter((_hour, hourIndex) => {
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

  const date = useMemo(() => new Date(day[0].time), [day])
  const dateStr = useMemo(() => day[0].time, [day])

  return (
    <article className="mt-6 first:mt-0 md:first:mt-4" key={dateStr}>
      <div className="font-bold text-xl bg-slate-200 border-t border-slate-300 flex items-center py-2">
        <h2 className="font-bold text-xl px-3">
          <span className="capitalize">{format(dateStr, 'EEEE')}</span>{' '}
          {format(dateStr, 'd MMMM')}
        </h2>
        {(isToday(date) || isTomorrow(date)) && (
          <div className="ml-auto border-l border-slate-300 px-3 basis-1/4 text-center">
            {isToday(date) ? 'Idag' : 'Imorgon'}
          </div>
        )}
      </div>
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
            <th className="text-left border-y border-slate-300 px-2 py-1 text-center hidden md:table-cell">
              Nederbörd
            </th>
          </tr>
        </thead>
        <tbody className="">
          <Hours hours={hours} />
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
