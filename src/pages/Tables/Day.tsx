import { useCallback, useState, useMemo } from 'react'
import { format } from 'utils/date'
import Arrow from 'common/Icon/Arrow'
import ErrorBoundary from 'common/Error/Boundary'
import Button from 'common/Button'
import classNames from 'classnames'
import { isToday, isTomorrow } from 'date-fns'
import { ITimeSerie } from 'utils/types'
import Hours from './Hours'
import { useTranslation } from 'context/TranslationProvider'

interface IProps {
  day: Array<ITimeSerie>
}

export default function Day({ day }: IProps) {
  const { t, language } = useTranslation()
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
    <div key={dateStr}>
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
        <caption className="font-bold text-xl bg-slate-200 border-t border-slate-300 py-2">
          <span className="flex">
            <span className="font-bold text-xl px-3">
              <span className="capitalize">
                {format(dateStr, 'EEEE', language)}
              </span>{' '}
              {format(dateStr, 'd MMMM', language)}
            </span>
            {(isToday(date) || isTomorrow(date)) && (
              <span className="ml-auto border-l border-slate-300 px-3 basis-1/4 text-center">
                {isToday(date) ? t('today') : t('tomorrow')}
              </span>
            )}
          </span>
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="text-left border-y border-slate-300 px-2 py-1 text-center"
            >
              {t('time')}
            </th>
            <th
              scope="col"
              className="text-left border-y border-slate-300 px-2 py-1 text-center"
            >
              {t('weather')}
            </th>
            <th
              scope="col"
              className="text-left border-y border-slate-300 px-2 py-1 text-center"
            >
              {t('temperature')}
            </th>
            <th
              scope="col"
              className="text-left border-y border-slate-300 px-2 py-1 text-center"
            >
              {t('wind')}
            </th>
            <th
              scope="col"
              className="text-left border-y border-slate-300 px-2 py-1 text-center hidden md:table-cell"
            >
              {t('precipitation')}
            </th>
          </tr>
        </thead>
        <tbody>
          <ErrorBoundary>
            <Hours hours={hours} />
          </ErrorBoundary>
        </tbody>
      </table>
      {showAllEnabled && (
        <Button
          onClick={onClick}
          ariaPressed={showAll}
          className="mt-6 mx-auto"
        >
          <span className="mr-1">
            {showAll ? t('show-less-hours') : t('show-all-hours')}
          </span>
          <Arrow direction={showAll ? 'up' : 'down'} />
        </Button>
      )}
    </div>
  )
}
