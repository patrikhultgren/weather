import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders, screen } from 'test/render'
import ErrorAlert from './Alert'

describe('ErrorAlert', () => {
  it('shows what the server said', () => {
    renderWithProviders(
      <ErrorAlert
        error={{
          name: 'StatusError',
          message: 'Status error: 500',
          status: 500,
        }}
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Status error: 500')
  })

  it('falls back to a generic message when there is none', () => {
    renderWithProviders(<ErrorAlert error={{ name: 'Error', message: '' }} />)

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
  })

  // Workbox and fetch produce messages like "FetchEvent.respondWith received
  // an error: no-response :: [{...}]", which no user should ever be shown.
  it('does not surface an internal message from a failed request', () => {
    renderWithProviders(
      <ErrorAlert
        error={{
          name: 'Error',
          message:
            'FetchEvent.respondWith received an error: no-response :: [{"url":"https://api.met.no/..."}]',
        }}
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong')
    expect(screen.getByRole('alert')).not.toHaveTextContent('FetchEvent')
  })

  it('can be dismissed', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <ErrorAlert error={{ name: 'Error', message: 'Boom' }} />
    )

    await user.click(screen.getByRole('button'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  // Callers key the alert on the error, so a new one mounts freshly visible
  // even after the previous one was dismissed.
  it('comes back for a new error', async () => {
    const user = userEvent.setup()

    const alert = (message: string) => (
      <ErrorAlert
        key={message}
        error={{ name: 'StatusError', message, status: 500 }}
      />
    )

    const { rerender } = renderWithProviders(alert('Boom'))

    await user.click(screen.getByRole('button'))
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    rerender(alert('Another'))

    expect(screen.getByRole('alert')).toHaveTextContent('Another')
  })

  it('stays dismissed while the same error persists', async () => {
    const user = userEvent.setup()

    const error = { name: 'StatusError', message: 'Boom', status: 500 }
    const { rerender } = renderWithProviders(
      <ErrorAlert key={error.message} error={error} />
    )

    await user.click(screen.getByRole('button'))
    rerender(<ErrorAlert key={error.message} error={error} />)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
