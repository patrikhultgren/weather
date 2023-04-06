import classNames from 'classnames'
import Hour from './Hour'

interface IProps {
  hours: any
  showAll: boolean
}

export default function Hours({ hours, showAll }: IProps) {
  return hours.map((hour: any, index: number) => (
    <tr
      key={hour.time}
      className={classNames({ 'bg-slate-50': index % 2 === 0 })}
    >
      <Hour hour={hour} showAll={showAll} />
    </tr>
  ))
}
