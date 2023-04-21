import Container from 'components/Container'

export default function Credit() {
  return (
    <footer className="my-10 mb-[90px] border-t border-slate-300 pt-6">
      <Container className="text-sm text-slate-900">
        <div className="px-4 [&>p]:mt-4 first:[&>p]:mt-0">
          <p>Denna app är till för att se väderprognoser.</p>
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
            .
          </p>
          <p>Inget ansvar tas kring innehållet.</p>
          <p>
            Appen är byggd av{' '}
            <a className="underline" href="mailto:patrik.hult@gmail.com">
              Patrik Hultgren.
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
