import classNames from 'classnames'
import Hour from './Hour'

interface IProps {
  day: any
  className?: string
}

export default function Hours({ day, className }: IProps) {
  return day.map((hour: any, index: number) => (
    <tr
      key={hour.time}
      className={classNames({ 'bg-slate-50': index % 2 === 0 })}
    >
      <Hour timeSerie={hour} />
    </tr>
  ))
}
