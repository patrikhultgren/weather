import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders, screen } from 'test/render'
import Footer from './Footer'
import Header from './Header'
import LastUpdated from './LastUpdated'
import Loading from './Loading'
import NavBar from './NavBar'
import UseMyLocation from './UseMyLocation'
import SkipToContent from './SkipToContent'

describe('Header', () => {
  it('shows the city', () => {
    renderWithProviders(<Header city="Stockholm" />)

    expect(screen.getByRole('heading')).toHaveTextContent(
      'The weather in Stockholm'
    )
  })

  it('shows an ellipsis before a city is known', () => {
    renderWithProviders(<Header city="" />)

    expect(screen.getByRole('heading')).toHaveTextContent('...')
  })

  it('shrinks the text for a very long place name', () => {
    const long = 'Stockholm, Vårdö, Ålands skärgård, Landskapet Åland, Finland'

    const { container } = renderWithProviders(<Header city={long} />)

    expect(container.querySelector('header')).toHaveClass('text-2xl')
    expect(container.querySelector('header')).not.toHaveClass('md:text-3xl')
  })
})

describe('LastUpdated', () => {
  it('shows the time the forecast was issued', () => {
    renderWithProviders(<LastUpdated updated_at="2023-04-05T06:30:00Z" />)

    expect(screen.getByText(/6:30 AM/)).toBeInTheDocument()
  })

  it('renders nothing without a forecast', () => {
    const { container } = renderWithProviders(<LastUpdated updated_at={null} />)

    expect(container).toBeEmptyDOMElement()
  })
})

describe('Loading', () => {
  it('prefers the error over the spinner', () => {
    renderWithProviders(
      <Loading
        loading
        error={{ name: 'StatusError', message: 'Boom', status: 500 }}
      />
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Boom')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a labelled spinner while loading', () => {
    renderWithProviders(<Loading loading />)

    expect(screen.getByRole('status')).toHaveTextContent('Loading')
  })

  it('renders nothing when idle', () => {
    const { container } = renderWithProviders(<Loading loading={false} />)

    expect(container).toBeEmptyDOMElement()
  })
})

describe('NavBar', () => {
  const props = {
    isFullscreen: false,
    showUseMyLocation: false,
    activateMyLocation: vi.fn(),
  }

  it('links to the tables and the search', () => {
    renderWithProviders(<NavBar {...props} activeMenuItem="tables" />)

    expect(screen.getByRole('link', { name: 'Tables' })).toHaveAttribute(
      'href',
      '/weather/'
    )
    expect(screen.getByRole('link', { name: 'Search' })).toHaveAttribute(
      'href',
      '/weather/search'
    )
  })

  it('hides the location button until it is useful', () => {
    renderWithProviders(<NavBar {...props} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('offers the location button once a search has taken over', async () => {
    const user = userEvent.setup()
    const activateMyLocation = vi.fn()

    renderWithProviders(
      <NavBar
        {...props}
        showUseMyLocation
        activateMyLocation={activateMyLocation}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Use my location' }))

    expect(activateMyLocation).toHaveBeenCalled()
  })
})

describe('UseMyLocation', () => {
  it('renders nothing when it is not offered', () => {
    const { container } = renderWithProviders(
      <UseMyLocation showUseMyLocation={false} activateMyLocation={vi.fn()} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('activates the location when clicked', async () => {
    const user = userEvent.setup()
    const activateMyLocation = vi.fn()

    renderWithProviders(
      <UseMyLocation
        showUseMyLocation
        activateMyLocation={activateMyLocation}
      />
    )

    await user.click(screen.getByRole('button'))

    expect(activateMyLocation).toHaveBeenCalled()
  })
})

describe('Footer', () => {
  it('keeps the attribution collapsed until asked for', async () => {
    const user = userEvent.setup()

    renderWithProviders(<Footer />)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /about/i }))

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Yr/ })).toBeInTheDocument()
  })
})

describe('SkipToContent', () => {
  it('moves focus to the main element', async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <>
        <SkipToContent />
        <main>Content</main>
      </>
    )

    await user.click(screen.getByRole('button', { name: 'Skip to content' }))

    expect(screen.getByRole('main')).toHaveFocus()
  })
})
