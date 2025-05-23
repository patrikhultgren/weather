import { useState, useCallback, useRef, useEffect, useId } from 'react'
import Container from 'common/Container'
import Arrow from 'common/Icon/Arrow'
import Button from 'common/Button'

export default function Footer() {
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
          <span className="mr-1">Om sajten</span>
          <Arrow direction={show ? 'up' : 'down'} />
        </Button>
        {show && (
          <div
            id={messageId}
            ref={messageRef}
            aria-labelledby={buttonId}
            className="px-4 [&>p]:mt-4 first:[&>p]:mt-0 mt-8"
          >
            <h2 className="text-lg">
              Denna sajt är till för att enkelt kunna se väderprognoser
            </h2>
            <p>
              Prognosdatan tillhandahålls av MET Norge och är licenserad under{' '}
              <a className="underline" href="https://data.norge.no/nlod/en/2.0">
                Norwegian Licence for Open Government Data (NLOD) 2.0
              </a>{' '}
              och{' '}
              <a
                className="underline"
                href="https://creativecommons.org/licenses/by/4.0/"
              >
                Creative Commons 4.0 BY International
              </a>
              . Väderikonerna är skapade av{' '}
              <a href="https://www.yr.no" className="underline">
                Yr
              </a>{' '}
              och är licensierade under MIT.
            </p>
            <p>
              Tjänsten{' '}
              <a className="underline" href="https://locationiq.com/">
                LoqationIQ
              </a>{' '}
              anropas vid sökningar.
            </p>
            <p>
              Om du tillåter att dela din position så anropas{' '}
              <a className="underline" href="https://www.bigdatacloud.com">
                Big Data Cloud
              </a>{' '}
              för att ta fram aktuell adress. Latitud och longitud avrundas till
              två decimaler för att inte exakt ange din position.
            </p>
            <p>Inga kakor används på sajten.</p>
            <p>
              Innehållet kan vara felaktigt. Inget ansvar tas kring innehållet.
            </p>
            <p>
              Sidan är byggd av mig{' '}
              <a className="underline" href="mailto:patrik.hult@gmail.com">
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
