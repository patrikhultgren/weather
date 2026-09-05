import { useCallback, useMemo, useState } from 'react'
import { isToday, isTomorrow } from 'date-fns'
import Arrow from 'components/Icon/Arrow'
import Button from 'components/Button'
import ErrorBoundary from 'components/Error/Boundary'
import { useTranslation } from 'i18n/context'
import { format } from 'lib/date'
import type { ITimeSerie } from 'types'
import Hours from './Hours'

/** How many hours a collapsed day shows. */
const SUMMARY_HOURS = 4

const headerCell = 'border-y border-slate-300 px-2 py-1 text-center'

/** Evenly spaced sample of the day, used until the user expands it. */
const summarize = (day: Array<ITimeSerie>): Array<ITimeSerie> => {
  const step = Math.floor(day.length / SUMMARY_HOURS)

  return day.filter(
    (_hour, index) => index % step === 0 && index / step < SUMMARY_HOURS
  )
}

interface IProps {
  day: Array<ITimeSerie>
}

export default function Day({ day }: IProps) {
  const { t, language } = useTranslation()
  const [showAll, setShowAll] = useState<boolean>(false)

  const toggle = useCallback(() => setShowAll((prev) => !prev), [])

  const canExpand = day.length > SUMMARY_HOURS

  const hours = useMemo(
    () => (showAll || !canExpand ? day : summarize(day)),
    [day, showAll, canExpand]
  )

  const time = day[0].time
  const date = useMemo(() => new Date(time), [time])

  return (
    <div>
      <table className="w-full table-fixed border-collapse border border-slate-300 text-lg duration-700">
        <caption className="border-t border-slate-300 bg-slate-200 py-2 text-xl font-bold">
          <span className="flex">
            <span className="px-3 text-xl font-bold">
              <span className="capitalize">
                {format(time, 'EEEE', language)}
              </span>{' '}
              {format(time, 'd MMMM', language)}
            </span>
            {(isToday(date) || isTomorrow(date)) && (
              <span className="ml-auto basis-1/4 border-l border-slate-300 px-3 text-center">
                {isToday(date) ? t('today') : t('tomorrow')}
              </span>
            )}
          </span>
        </caption>
        <thead>
          <tr>
            <th scope="col" className={headerCell}>
              {t('time')}
            </th>
            <th scope="col" className={headerCell}>
              {t('weather')}
            </th>
            <th scope="col" className={headerCell}>
              {t('temperature')}
            </th>
            <th scope="col" className={headerCell}>
              {t('wind')}
            </th>
            <th scope="col" className={`${headerCell} hidden md:table-cell`}>
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
      {canExpand && (
        <Button onClick={toggle} ariaPressed={showAll} className="mx-auto mt-6">
          <span className="mr-1">
            {showAll ? t('show-less-hours') : t('show-all-hours')}
          </span>
          <Arrow direction={showAll ? 'up' : 'down'} />
        </Button>
      )}
    </div>
  )
}
