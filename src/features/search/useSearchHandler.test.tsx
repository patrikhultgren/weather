import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { IPosition } from 'types'
import { ProviderWrapper } from 'test/render'
import useSearchHandler from './useSearchHandler'

const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })

const hits = [
  { place_id: '1', lat: '59.33', lon: '18.07', display_name: 'Stockholm' },
  { place_id: '2', lat: '59.86', lon: '17.64', display_name: 'Uppsala' },
  { place_id: '3', lat: '57.71', lon: '11.97', display_name: 'Göteborg' },
]

const history: Array<IPosition> = [
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
  {
    latitude: 57.71,
    longitude: 11.97,
    city: 'Göteborg',
    status: 'foundBySearch',
  },
]

const renderSearchHandler = (positions: Array<IPosition> = []) => {
  const setPositions = vi.fn()

  const { result } = renderHook(
    () => useSearchHandler({ positions, setPositions }),
    { wrapper: ProviderWrapper }
  )

  return { result, setPositions }
}

const keyDown = (key: string) =>
  ({
    key,
    preventDefault: () => undefined,
  }) as React.KeyboardEvent<HTMLInputElement>

const type = (
  result: { current: ReturnType<typeof useSearchHandler> },
  value: string
) =>
  act(() =>
    result.current.onChangeSearchTerm({
      target: { value },
    } as React.ChangeEvent<HTMLInputElement>)
  )

const submit = (result: { current: ReturnType<typeof useSearchHandler> }) =>
  act(() =>
    result.current.onSubmitSearch({
      preventDefault: () => undefined,
    } as React.SyntheticEvent)
  )

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useSearchHandler', () => {
  it('lists previously visited places when nothing has been typed', () => {
    const { result } = renderSearchHandler(history)

    // The first position is the one already on screen.
    expect(result.current.searchResults.response).toEqual({
      type: 'history',
      positions: history.slice(1),
    })
  })

  it('does not search until the form is submitted', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(hits))
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderSearchHandler()

    type(result, 'Stockholm')

    expect(fetchMock).not.toHaveBeenCalled()

    submit(result)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
  })

  it('does not search for an empty term', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderSearchHandler()

    submit(result)

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('exposes the hits as positions', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json(hits)))

    const { result } = renderSearchHandler()

    type(result, 'Stockholm')
    submit(result)

    await waitFor(() =>
      expect(result.current.searchResults.response).toMatchObject({
        type: 'searchResults',
        positions: [
          { city: 'Stockholm' },
          { city: 'Uppsala' },
          { city: 'Göteborg' },
        ],
      })
    )
  })

  describe('keyboard navigation', () => {
    it('selects the first entry on arrow down', () => {
      const { result } = renderSearchHandler(history)

      act(() => result.current.onKeyDown(keyDown('ArrowDown')))

      expect(result.current.selectedIndex).toBe(0)
    })

    it('selects the last entry on arrow up', () => {
      const { result } = renderSearchHandler(history)

      act(() => result.current.onKeyDown(keyDown('ArrowUp')))

      expect(result.current.selectedIndex).toBe(1)
    })

    it('wraps around at both ends', () => {
      const { result } = renderSearchHandler(history)

      act(() => result.current.onKeyDown(keyDown('ArrowDown')))
      act(() => result.current.onKeyDown(keyDown('ArrowDown')))
      expect(result.current.selectedIndex).toBe(1)

      act(() => result.current.onKeyDown(keyDown('ArrowDown')))
      expect(result.current.selectedIndex).toBe(0)

      act(() => result.current.onKeyDown(keyDown('ArrowUp')))
      expect(result.current.selectedIndex).toBe(1)
    })

    it('does nothing when there is nothing to select', () => {
      const { result } = renderSearchHandler()

      act(() => result.current.onKeyDown(keyDown('ArrowDown')))

      expect(result.current.selectedIndex).toBeNull()
    })

    it('picks the selected entry on enter', () => {
      const { result, setPositions } = renderSearchHandler(history)

      act(() => result.current.onKeyDown(keyDown('ArrowDown')))
      act(() => result.current.onKeyDown(keyDown('Enter')))

      expect(setPositions).toHaveBeenCalledTimes(1)
    })

    it('ignores enter with nothing selected', () => {
      const { result, setPositions } = renderSearchHandler(history)

      act(() => result.current.onKeyDown(keyDown('Enter')))

      expect(setPositions).not.toHaveBeenCalled()
    })

    it('clears the selection when typing resumes', () => {
      const { result } = renderSearchHandler(history)

      act(() => result.current.onKeyDown(keyDown('ArrowDown')))
      act(() => result.current.onKeyDown(keyDown('a')))

      expect(result.current.selectedIndex).toBeNull()
    })
  })

  it('adds the chosen place to the positions', () => {
    const { result, setPositions } = renderSearchHandler()

    act(() => result.current.onSelectSearchResult(history[0]))

    const update = setPositions.mock.calls[0][0] as (
      positions: Array<IPosition>
    ) => Array<IPosition>

    expect(update([])).toEqual([history[0]])
  })

  it('clears the term without leaving the search', () => {
    const { result } = renderSearchHandler()

    type(result, 'Stockholm')
    act(() => result.current.resetSearchTerm())

    expect(result.current.searchTerm).toBe('')
  })

  it('clears the term and the selection when the search closes', () => {
    const { result } = renderSearchHandler(history)

    type(result, 'Stockholm')
    act(() => result.current.onKeyDown(keyDown('ArrowDown')))
    act(() => result.current.closeSearch())

    expect(result.current.searchTerm).toBe('')
    expect(result.current.selectedIndex).toBeNull()
  })

  it('does not search when focus moves to the close button', () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderSearchHandler()

    type(result, 'Stockholm')

    act(() =>
      result.current.onSubmitSearch({
        preventDefault: () => undefined,
        relatedTarget: { dataset: { ref: 'close-search' } },
      } as unknown as React.SyntheticEvent)
    )

    expect(fetchMock).not.toHaveBeenCalled()
  })
})
