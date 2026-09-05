import { describe, expect, it, vi } from 'vitest'
import type { IApp } from 'types'
import { renderWithProviders, screen } from 'test/render'
import TablesLayout from './TablesLayout'

const buildApp = (overrides: Partial<IApp> = {}): IApp =>
  ({
    city: 'Kalmar',
    days: null,
    updated_at: null,
    error: null,
    geoPosition: {
      error: null,
      loading: false,
      finished: true,
      userHasApprovedToShareLocation: true,
    },
    positions: [],
    weatherChange: null,
    showUseMyLocation: false,
    activateMyLocation: vi.fn(),
    setPositions: vi.fn(),
    status: { online: true, isFullscreen: false, loading: false, finished: true },
    ...overrides,
  }) as IApp

describe('TablesLayout', () => {
  it('reports a failed request while online', () => {
    const app = buildApp({ error: { name: 'StatusError', message: 'x', status: 500 } })

    renderWithProviders(
      <TablesLayout app={app} activeMenuItem="tables">
        <div />
      </TablesLayout>
    )

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  // Offline the request was always going to fail, and the page already says so.
  it('does not stack a request failure on top of being offline', () => {
    const app = buildApp({
      error: { name: 'Error', message: 'Failed to fetch' },
      status: { online: false, isFullscreen: false, loading: false, finished: true },
    })

    renderWithProviders(
      <TablesLayout app={app} activeMenuItem="tables">
        <div />
      </TablesLayout>
    )

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /lost connection/i })).toBeInTheDocument()
  })
})
