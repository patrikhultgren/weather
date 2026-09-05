import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { IApp } from 'types'
import { renderWithProviders, screen, waitFor } from 'test/render'
import SearchPage from './SearchPage'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

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
    setPositions: vi.fn(),
    status: {
      online: true,
      isFullscreen: false,
      loading: false,
      finished: true,
    },
    ...overrides,
  }) as IApp

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('SearchPage', () => {
  it('shows the search field', () => {
    renderWithProviders(<SearchPage app={buildApp()} />)

    expect(
      screen.getByRole('textbox', { name: 'Search for a location' })
    ).toBeInTheDocument()
  })

  it('finds and picks a place', async () => {
    const user = userEvent.setup()
    const setPositions = vi.fn()

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          json([
            {
              place_id: '1',
              lat: '59.33',
              lon: '18.07',
              display_name: 'Stockholm',
            },
          ])
        )
    )

    renderWithProviders(<SearchPage app={buildApp({ setPositions })} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Search for a location' }),
      'Stockholm'
    )
    await user.click(screen.getByRole('button', { name: 'Search' }))

    const result = await screen.findByRole('button', { name: 'Stockholm' })
    await user.click(result)

    expect(setPositions).toHaveBeenCalled()
  })

  it('says so when a search finds nothing', async () => {
    const user = userEvent.setup()

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json([])))

    renderWithProviders(<SearchPage app={buildApp()} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Search for a location' }),
      'Nowhere'
    )
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(
      await screen.findByText(/Your search returned no results/)
    ).toBeInTheDocument()
  })

  // A 404 from the search API just means nothing matched.
  it('does not treat a 404 as an error', async () => {
    const user = userEvent.setup()

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({}, 404)))

    renderWithProviders(<SearchPage app={buildApp()} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Search for a location' }),
      'Nowhere'
    )
    await user.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() =>
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    )
  })

  it('reports a real failure', async () => {
    const user = userEvent.setup()

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json({}, 500)))

    renderWithProviders(<SearchPage app={buildApp()} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Search for a location' }),
      'Stockholm'
    )
    await user.click(screen.getByRole('button', { name: 'Search' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('500')
  })

  it('offers previously visited places before anything is typed', () => {
    const app = buildApp({
      positions: [
        {
          latitude: 59.33,
          longitude: 18.07,
          city: 'Stockholm',
          status: 'foundBySearch',
        },
        {
          latitude: 59.86,
          longitude: 17.64,
          city: 'Uppsala',
          status: 'foundBySearch',
        },
      ],
    })

    renderWithProviders(<SearchPage app={app} />)

    expect(screen.getByRole('button', { name: 'Uppsala' })).toBeInTheDocument()
    // The first position is already on screen behind the search.
    expect(
      screen.queryByRole('button', { name: 'Stockholm' })
    ).not.toBeInTheDocument()
  })
})
