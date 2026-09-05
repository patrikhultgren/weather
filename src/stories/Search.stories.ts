import type { Meta, StoryObj } from '@storybook/react'
import searchHandlerWaitingForInput from 'test/fixtures/searchHandler/history'
import searchHandlerSearchResults from 'test/fixtures/searchHandler/searchResults'
import searchHandlerNoSearchResults from 'test/fixtures/searchHandler/noSearchResults'
import waitingForInputSearchResults from 'test/fixtures/searchHandler/waitingForInput'
import loadingSearchResults from 'test/fixtures/searchHandler/loadingSearchResults'
import loadingWithSearchResults from 'test/fixtures/searchHandler/loadingWithSearchResults'
import SearchHandler from 'pages/Search/SearchLayout'

const meta = {
  title: 'Pages/Search',
  component: SearchHandler,
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
