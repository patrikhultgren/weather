import { describe, expect, it } from 'vitest'
import type { IApp } from 'types'
import { renderWithProviders, screen } from 'test/render'
import NoForecast from './NoForecast'

const buildApp = (overrides: Partial<IApp> = {}): IApp =>
  ({
    city: '',
    days: null,
    updated_at: null,
    error: null,
    geoPosition: {
      error: null,
      loading: false,
      finished: true,
      userHasApprovedToShareLocation: false,
    },
    positions: [],
    weatherChange: null,
    showUseMyLocation: false,
    activateMyLocation: () => undefined,
    setPositions: () => undefined,
    status: {
      online: true,
      isFullscreen: false,
      loading: false,
      finished: true,
    },
    ...overrides,
  }) as IApp

describe('NoForecast', () => {
  it('points at the search when the location could not be found', () => {
    const app = buildApp({
      geoPosition: {
        error: { name: 'Error', message: 'User denied Geolocation' },
        loading: false,
        finished: true,
        userHasApprovedToShareLocation: false,
      },
    })

    renderWithProviders(<NoForecast app={app} activeMenuItem="tables" />)

    expect(
      screen.getByRole('heading', { name: /location could not be found/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /the search/i })).toHaveAttribute(
      'href',
      '/weather/search'
    )
  })

  // Offline, the geolocation lookup fails too, but "you are offline" is the
  // useful explanation and it is the cause of the other failure.
  it('explains being offline rather than blaming the location lookup', () => {
    const app = buildApp({
      status: { online: false, isFullscreen: false, loading: false, finished: true },
      geoPosition: {
        error: { name: 'Error', message: 'Position unavailable' },
        loading: false,
        finished: true,
        userHasApprovedToShareLocation: true,
      },
      error: { name: 'Error', message: 'Failed to fetch' },
    })

    renderWithProviders(<NoForecast app={app} activeMenuItem="tables" />)

    expect(screen.getByRole('heading', { name: /lost connection/i })).toBeInTheDocument()
  })

  it('reports a failed request', () => {
    const app = buildApp({
      error: { name: 'StatusError', message: 'Status error: 500' },
    })

    renderWithProviders(<NoForecast app={app} activeMenuItem="tables" />)

    expect(
      screen.getByRole('heading', { name: /an error occurred/i })
    ).toBeInTheDocument()
  })

  it('shows placeholders while loading', () => {
    const app = buildApp({
      status: {
        online: true,
        isFullscreen: false,
        loading: true,
        finished: false,
      },
    })

    const { container } = renderWithProviders(
      <NoForecast app={app} activeMenuItem="tables" />
    )

    expect(
      container.querySelectorAll('.placeholder-shimmer').length
    ).toBeGreaterThan(0)
  })

  it('explains that nothing is saved offline', () => {
    const app = buildApp({
      status: {
        online: false,
        isFullscreen: false,
        loading: false,
        finished: true,
      },
    })

    renderWithProviders(<NoForecast app={app} activeMenuItem="tables" />)

    expect(
      screen.getByRole('heading', { name: /lost connection/i })
    ).toBeInTheDocument()
  })

  it('invites a first search once everything has settled', () => {
    renderWithProviders(<NoForecast app={buildApp()} activeMenuItem="tables" />)

    expect(
      screen.getByRole('heading', { name: /weather forecasts/i })
    ).toBeInTheDocument()
  })

  it('renders nothing while still waiting on the first result', () => {
    const app = buildApp({
      status: {
        online: true,
        isFullscreen: false,
        loading: false,
        finished: false,
      },
    })

    const { container } = renderWithProviders(
      <NoForecast app={app} activeMenuItem="tables" />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
