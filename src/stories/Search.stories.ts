import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import forecastLoaded from '__fixtures__/app/forecast/finished'
import searchHandlerWaitingForInput from '__fixtures__/searchHandler/waitingForInput'
import Search from 'components/Pages/Search'

const meta = {
  title: 'Pages/Search',
  component: Search,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const WaitingForInput: Story = {
  args: {
    app: forecastLoaded,
  },
}
