import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import forecastLoaded from '__fixtures__/app/forecast/finished'
import forecastUserDeniedGeo from '__fixtures__/app/forecast/userDeniedGeo'
import forecastLoading from '__fixtures__/app/forecast/loading'
import Tables from 'components/Pages/Tables'

const meta = {
  title: 'Pages/Tables',
  component: Tables,
  decorators: [withRouter],
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

export const Success: Story = {
  args: {
    app: forecastLoaded,
  },
}

export const UserDeniedPosition: Story = {
  args: {
    app: forecastUserDeniedGeo,
  },
}
