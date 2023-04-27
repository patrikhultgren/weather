import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import forecastLoaded from '__fixtures__/forecastLoaded'
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

export const ForecastLoaded: Story = {
  args: {
    app: forecastLoaded,
  },
}
