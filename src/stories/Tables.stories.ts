import type { Meta, StoryObj } from '@storybook/react'
import forecastFinished from '__fixtures__/app/forecast/finished'
import forecastUserDeniedGeo from '__fixtures__/app/forecast/userDeniedGeo'
import forecastLoading from '__fixtures__/app/forecast/loading'
import offline from '__fixtures__/app/forecast/offline'
import fallback from '__fixtures__/app/forecast/fallback'
import error from '__fixtures__/app/forecast/error'
import Tables from 'pages/Tables'

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
