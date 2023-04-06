import classNames from 'classnames'
import Hour from './Hour'

interface IProps {
  day: any
  showAll: boolean
}

export default function Hours({ day, showAll }: IProps) {
  return day.map((hour: any, index: number) => (
    <tr
      key={hour.time}
      className={classNames({ 'bg-slate-50': index % 2 === 0 })}
    >
      <Hour timeSerie={hour} showAll={showAll} />
    </tr>
  ))
}
