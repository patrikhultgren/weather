import classNames from 'classnames'
import Hour from './Hour'

interface IProps {
  hours: any
}

export default function Hours({ hours }: IProps) {
  return hours.map((hour: any, index: number) => (
    <tr
      key={hour.time}
      className={classNames({ 'bg-slate-50': index % 2 === 0 })}
    >
      <Hour hour={hour} />
    </tr>
  ))
}
