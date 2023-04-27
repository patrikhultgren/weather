import { useEffect, useState } from 'react'
import Container from 'components/Container'
import ErrorBoundary from 'components/ErrorBoundary'
import { IApp } from 'utils/types'
import Day from './Day'

const className = 'mb-10'

interface IProps {
  app: IApp
}

export default function Forecast({ app }: IProps) {
  const { days } = app
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (hasScrolled) {
      return
    }

    const onScroll = () => {
      setHasScrolled(true)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasScrolled])

  return days ? (
    <Container className={className}>
      {days
        .filter((_day, index) => hasScrolled || index < 5)
        .map((day) => (
          <ErrorBoundary key={day[0].time}>
            <Day day={day} />
          </ErrorBoundary>
        ))}
    </Container>
  ) : null
}
