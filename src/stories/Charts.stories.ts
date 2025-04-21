import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import forecastFinished from '__fixtures__/app/forecast/finished'
import forecastUserDeniedGeo from '__fixtures__/app/forecast/userDeniedGeo'
import forecastLoading from '__fixtures__/app/forecast/loading'
import offline from '__fixtures__/app/forecast/offline'
import fallback from '__fixtures__/app/forecast/fallback'
import Charts from 'pages/Charts'

const meta = {
  title: 'Pages/Charts',
  component: Charts,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Charts>

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

export const UserDeniedPosition: Story = {
  args: {
    app: forecastUserDeniedGeo,
  },
}
