import Container from 'components/Container'

export default function Credit() {
  return (
    <footer className="my-10">
      <Container className="text-sm text-slate-900">
        <div className="px-4">
          <p>
            Denna sida är byggd som ett hobbyprojekt av{' '}
            <a className="underline" href="mailto:patrik.hult@gmail.com">
              Patrik Hultgren.
            </a>
          </p>
          <p>Inget ansvar tas kring innehållet då det kan vara felaktigt.</p>
          <p className="mt-4">
            Aktuell stad hämtas med hjälp av Big Data Cloud via tjänsten
            Client-side Reverse Geocoding API.
          </p>
          <p className="mt-4">
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
            .
          </p>
        </div>
      </Container>
    </footer>
  )
}
