import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import forecastLoaded from '__fixtures__/app/forecast/loaded'
import forecastUserDeniedGeo from '__fixtures__/app/forecast/userDeniedGeo'
import Charts from 'components/Pages/Charts'

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

export const Loaded: Story = {
  args: {
    app: forecastLoaded,
  },
}

export const UserDeniedPosition: Story = {
  args: {
    app: forecastUserDeniedGeo,
  },
}
