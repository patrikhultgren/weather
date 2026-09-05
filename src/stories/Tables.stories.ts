import type { Meta, StoryObj } from '@storybook/react'
import forecastFinished from 'test/fixtures/forecast/finished'
import forecastUserDeniedGeo from 'test/fixtures/forecast/userDeniedGeo'
import forecastLoading from 'test/fixtures/forecast/loading'
import offline from 'test/fixtures/forecast/offline'
import fallback from 'test/fixtures/forecast/fallback'
import error from 'test/fixtures/forecast/error'
import Tables from 'pages/Tables/TablesPage'

const meta = {
  title: 'Pages/Tables',
  component: Tables,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Tables>

export default meta
type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: {
    app: forecastLoading,
  },
}

export const Finished: Story = {
  args: {
    app: forecastFinished,
  },
}

export const UseMyLocation: Story = {
  args: {
    app: { ...forecastFinished, showUseMyLocation: true },
  },
}

export const Offline: Story = {
  args: {
    app: offline,
  },
}

export const Fallback: Story = {
  args: {
    app: fallback,
  },
}

export const Error: Story = {
  args: {
    app: error,
  },
}

export const UserDeniedPosition: Story = {
  args: {
    app: forecastUserDeniedGeo,
  },
}
