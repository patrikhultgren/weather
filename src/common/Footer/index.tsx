import { useState, useCallback, useRef, useEffect, useId } from 'react'
import Container from 'common/Container'
import Arrow from 'common/Icon/Arrow'
import Button from 'common/Button'
import { useTranslation } from 'context/TranslationProvider'

export default function Footer() {
  const { t } = useTranslation()
  const buttonId = useId()
  const messageId = useId()
  const messageRef = useRef<null | HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  const onClick = useCallback(() => {
    setShow((prev) => !prev)
  }, [])

  useEffect(() => {
    if (show && messageRef?.current) {
      messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [show, messageRef])

  return (
    <footer className="my-10 mb-[90px] md:mb-10 border-t border-slate-300 pt-10">
      <Container className="text-sm text-slate-900">
        <Button
          id={buttonId}
          onClick={onClick}
          ariaExpanded={show}
          ariaControls={show ? messageId : undefined}
          className="mx-auto"
        >
          <span className="mr-1">{t('about')}</span>
          <Arrow direction={show ? 'up' : 'down'} />
        </Button>
        {show && (
          <div
            id={messageId}
            ref={messageRef}
            aria-labelledby={buttonId}
            className="px-4 [&>p]:mt-4 first:[&>p]:mt-0 mt-8"
          >
            <h2 className="text-lg">{t('footer-header')}</h2>
            <p>
              {t('footer-body-1-1')}{' '}
              <a className="underline" href="https://data.norge.no/nlod/en/2.0">
                Norwegian Licence for Open Government Data (NLOD) 2.0
              </a>{' '}
              {t('footer-body-1-2')}{' '}
              <a
                className="underline"
                href="https://creativecommons.org/licenses/by/4.0/"
              >
                Creative Commons 4.0 BY International
              </a>
              . {t('footer-body-1-3')}{' '}
              <a href="https://www.yr.no" className="underline">
                Yr
              </a>{' '}
              {t('footer-body-1-4')} "Yr weather symbols © 2015 by Yr/NRK is
              licensed under Attribution 4.0 International".
            </p>
            <p>
              {t('footer-body-2-1')}{' '}
              <a className="underline" href="https://locationiq.com/">
                LoqationIQ
              </a>{' '}
              {t('footer-body-2-2')}
            </p>
            <p>
              {t('footer-body-3-1')}{' '}
              <a className="underline" href="https://www.bigdatacloud.com">
                Big Data Cloud
              </a>{' '}
              {t('footer-body-3-2')}
            </p>
            <p>{t('footer-body-4-1')}</p>
            <p>{t('footer-body-5-1')}</p>
            <p>
              {t('footer-body-6-1')}{' '}
              <a className="underline" href="mailto:info@patrikhultgren.se">
                Patrik Hultgren.
              </a>
              .
            </p>
          </div>
        )}
      </Container>
    </footer>
  )
}
