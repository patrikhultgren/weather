import { describe, expect, it } from 'vitest'
import { renderWithProviders, screen } from 'test/render'
import { buildHour } from 'features/forecast/testHelpers'
import Hour from './Hour'

const renderHour = (options: Parameters<typeof buildHour>[0]) =>
  renderWithProviders(
    <table>
      <tbody>
        <tr>
          <Hour hour={buildHour(options)} />
        </tr>
      </tbody>
    </table>
  )

/** The row renders time, weather, temperature, wind and precipitation. */
const cell = (index: number) => screen.getAllByRole('cell')[index]

describe('Hour', () => {
  // 'HH a' produced nonsense like "14 PM"; English uses a 12 hour clock.
  it('shows a 12 hour clock in english and a 24 hour clock elsewhere', async () => {
    const { unmount } = renderHour({ time: '2023-04-05T14:00:00Z' })
    expect(await screen.findAllByRole('cell'))
    expect(cell(0)).toHaveTextContent('2 PM')
    unmount()

    renderWithProviders(
      <table>
        <tbody>
          <tr>
            <Hour hour={buildHour({ time: '2023-04-05T14:00:00Z' })} />
          </tr>
        </tbody>
      </table>,
      { language: 'sv' }
    )
    await screen.findAllByRole('cell')
    expect(cell(0)).toHaveTextContent('14')
  })

  it('rounds the temperature', async () => {
    renderHour({ time: '2023-04-05T07:00:00Z', airTemperature: -0.8 })

    expect(await screen.findByText('-1 °')).toBeInTheDocument()
  })

  it('colours a temperature above zero red and below zero blue', async () => {
    const { unmount } = renderHour({
      time: '2023-04-05T07:00:00Z',
      airTemperature: 5,
    })
    expect(await screen.findByText('5 °')).toHaveClass('text-red-700')
    unmount()

    renderHour({ time: '2023-04-05T07:00:00Z', airTemperature: -5 })
    expect(await screen.findByText('-5 °')).toHaveClass('text-blue-700')
  })

  // Math.round(0) is falsy, which used to blank the whole wind column.
  it('shows a wind speed of zero rather than nothing', async () => {
    renderHour({ time: '2023-04-05T07:00:00Z', windSpeed: 0 })

    await screen.findAllByRole('cell')
    expect(cell(3)).toHaveTextContent('0')
  })

  it('shows the gust in brackets when there is one', async () => {
    renderHour({
      time: '2023-04-05T07:00:00Z',
      windSpeed: 3.4,
      windSpeedOfGust: 7.2,
    })

    await screen.findAllByRole('cell')
    expect(cell(3)).toHaveTextContent('3 (7)')
  })

  it('omits the brackets without a gust', async () => {
    renderHour({ time: '2023-04-05T07:00:00Z', windSpeed: 3.4 })

    await screen.findAllByRole('cell')
    expect(cell(3)).not.toHaveTextContent('(')
  })

  it('labels the wind direction arrow', async () => {
    renderHour({ time: '2023-04-05T07:00:00Z', windFromDirection: 11 })

    expect(
      await screen.findByTitle('Wind direction 11 degrees')
    ).toBeInTheDocument()
  })

  it('shows precipitation only when there is some', async () => {
    const { unmount } = renderHour({
      time: '2023-04-05T07:00:00Z',
      precipitationAmount: 1.4,
    })
    expect(await screen.findByText('1.4 mm')).toBeInTheDocument()
    unmount()

    renderHour({ time: '2023-04-05T07:00:00Z', precipitationAmount: 0 })
    await screen.findAllByRole('cell')
    expect(screen.queryByText(/mm/)).not.toBeInTheDocument()
  })

  // The weather icons are code split, so the title only appears once loaded.
  it('translates the weather symbol', async () => {
    renderHour({ time: '2023-04-05T07:00:00Z', symbolCode: 'clearsky_day' })

    expect(await screen.findByTitle('Sunny')).toBeInTheDocument()
  })
})
