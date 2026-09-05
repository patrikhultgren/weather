import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { buildDay } from 'features/forecast/testHelpers'
import { renderWithProviders, screen } from 'test/render'
import Day from './Day'

describe('Day', () => {
  it('shows a sample of four hours for a full day', async () => {
    renderWithProviders(<Day day={buildDay('2023-04-05', 24)} />)

    expect(await screen.findAllByRole('row')).toHaveLength(1 + 4)
  })

  it('expands to every hour and back again', async () => {
    const user = userEvent.setup()

    renderWithProviders(<Day day={buildDay('2023-04-05', 24)} />)

    await user.click(screen.getByRole('button', { name: /show all hours/i }))

    expect(await screen.findAllByRole('row')).toHaveLength(1 + 24)
    expect(
      screen.getByRole('button', { name: /show less hours/i })
    ).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: /show less hours/i }))

    expect(await screen.findAllByRole('row')).toHaveLength(1 + 4)
  })

  it('shows every hour without a toggle when the day is nearly over', async () => {
    renderWithProviders(<Day day={buildDay('2023-04-05', 3)} />)

    expect(await screen.findAllByRole('row')).toHaveLength(1 + 3)
    expect(
      screen.queryByRole('button', { name: /hours/i })
    ).not.toBeInTheDocument()
  })

  it('captions the day with its weekday and date', async () => {
    renderWithProviders(<Day day={buildDay('2023-04-05', 24)} />)

    expect(await screen.findByRole('table')).toHaveAccessibleName(
      /Wednesday 5 April/
    )
  })
})
