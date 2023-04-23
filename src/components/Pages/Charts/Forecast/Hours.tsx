import classNames from 'classnames'
import { ITimeSerie } from 'utils/types'
import Hour from './Hour'

interface IProps {
  hours: Array<ITimeSerie>
}

export default function Hours({ hours }: IProps) {
  return (
    <>
      {hours.map((hour, index) => (
        <tr
          key={hour.time}
          className={classNames({ 'bg-slate-50': index % 2 === 0 })}
        >
          <Hour hour={hour} />
        </tr>
      ))}
    </>
  )
}
