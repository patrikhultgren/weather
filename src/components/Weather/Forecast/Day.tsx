import { useCallback, useState, useMemo } from 'react'
import { format } from 'utils/date'
import Arrow from 'components/Icon/Arrow'
import classNames from 'classnames'
import Hours from './Hours'

interface IProps {
  day: any
}

export default function Day({ day }: IProps) {
  const [showAll, setShowAll] = useState<boolean>(false)

  const onClick = useCallback(() => {
    setShowAll((prev) => !prev)
  }, [])

  const showAllEnabled = useMemo(() => day.length > 4, [day])
  const numberOfMissingHours = useMemo(() => 24 - day.length, [day])

  const filteredDay = useMemo(
    () =>
      day.filter((_hour: any, index: number) => {
        if (showAll || !showAllEnabled) {
          return true
        } else {
          if (
            [0, 6, 12, 18].includes(numberOfMissingHours + index) ||
            index === 0
          ) {
            return true
          }
        }

        return false
      }),
    [day, showAll, showAllEnabled, numberOfMissingHours]
  )

  return (
    <article className="mt-4" key={day[0].time}>
      <h2 className="font-bold text-xl py-2 bg-slate-200 px-3 py-1 border-x border-t border-slate-300">
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
            <th className="text-left border border-slate-300 px-2 py-1 text-center">
              Tid
            </th>
            <th className="text-left border border-slate-300 px-2 py-1 text-center">
              Väder
            </th>
            <th className="text-left border border-slate-300 px-2 py-1 text-center">
              Temp
            </th>
            <th className="text-left border border-slate-300 px-2 py-1 text-center">
              Vind
            </th>
          </tr>
        </thead>
        <tbody className="">
          <Hours day={filteredDay} />
        </tbody>
      </table>
      {showAllEnabled && (
        <button
          onClick={onClick}
          type="button"
          className="py-2 block bg-slate-200a flex mx-auto items-center"
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
