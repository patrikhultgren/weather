import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { IPosition, ISearchHandler } from 'types'
import { renderWithProviders, screen } from 'test/render'
import SearchResults from './SearchResults'

const positions: Array<IPosition> = [
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
]

const buildHandler = (
  overrides: Partial<ISearchHandler> = {}
): ISearchHandler =>
  ({
    searchResults: {
      loading: false,
      error: null,
      finished: true,
      response: { type: 'searchResults', positions },
    },
    searchTerm: 'sto',
    selectedIndex: null,
    onSubmitSearch: vi.fn(),
    onChangeSearchTerm: vi.fn(),
    onSelectSearchResult: vi.fn(),
    closeSearch: vi.fn(),
    resetSearchTerm: vi.fn(),
    onKeyDown: vi.fn(),
    ...overrides,
  }) as ISearchHandler

describe('SearchResults', () => {
  it('lists every hit', () => {
    renderWithProviders(
      <SearchResults searchHandler={buildHandler()} searchResultsId="results" />
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(
      screen.getByRole('button', { name: 'Stockholm' })
    ).toBeInTheDocument()
  })

  it('selects a hit when it is clicked', async () => {
    const user = userEvent.setup()
    const onSelectSearchResult = vi.fn()

    renderWithProviders(
      <SearchResults
        searchHandler={buildHandler({ onSelectSearchResult })}
        searchResultsId="results"
      />
    )

    await user.click(screen.getByRole('button', { name: 'Uppsala' }))

    expect(onSelectSearchResult).toHaveBeenCalledWith(positions[1])
  })

  it('highlights the keyboard selected hit', () => {
    renderWithProviders(
      <SearchResults
        searchHandler={buildHandler({ selectedIndex: 1 })}
        searchResultsId="results"
      />
    )

    expect(screen.getByRole('button', { name: 'Uppsala' })).toHaveClass(
      'bg-slate-900'
    )
    expect(screen.getByRole('button', { name: 'Stockholm' })).not.toHaveClass(
      'bg-slate-900'
    )
  })

  it('labels the history list differently', () => {
    const handler = buildHandler({
      searchResults: {
        loading: false,
        error: null,
        finished: true,
        response: { type: 'history', positions },
      },
    })

    renderWithProviders(
      <SearchResults searchHandler={handler} searchResultsId="results" />
    )

    expect(
      screen.getByRole('heading', { name: 'Recently viewed' })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('renders nothing when there is nothing to list', () => {
    const handler = buildHandler({
      searchResults: {
        loading: false,
        error: null,
        finished: true,
        response: { type: 'searchResults', positions: [] },
      },
    })

    const { container } = renderWithProviders(
      <SearchResults searchHandler={handler} searchResultsId="results" />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
