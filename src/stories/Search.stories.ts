import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import searchHandlerWaitingForInput from '__fixtures__/searchHandler/history'
import searchHandlerSearchResults from '__fixtures__/searchHandler/searchResults'
import searchHandlerNoSearchResults from '__fixtures__/searchHandler/noSearchResults'
import waitingForInputSearchResults from '__fixtures__/searchHandler/waitingForInput'
import loadingSearchResults from '__fixtures__/searchHandler/loadingSearchResults'
import loadingWithSearchResults from '__fixtures__/searchHandler/loadingWithSearchResults'
import SearchHandler from 'pages/Search/Handler'

const meta = {
  title: 'Pages/Search',
  component: SearchHandler,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SearchHandler>

export default meta
type Story = StoryObj<typeof meta>

export const WaitingForInput: Story = {
  args: {
    searchHandler: waitingForInputSearchResults,
  },
}

export const LoadingSearchResults: Story = {
  args: {
    searchHandler: loadingSearchResults,
  },
}

export const LoadingWithSearchResults: Story = {
  args: {
    searchHandler: loadingWithSearchResults,
  },
}

export const History: Story = {
  args: {
    searchHandler: searchHandlerWaitingForInput,
  },
}

export const SearchResults: Story = {
  args: {
    searchHandler: searchHandlerSearchResults,
  },
}

export const NoSearchResults: Story = {
  args: {
    searchHandler: searchHandlerNoSearchResults,
  },
}
