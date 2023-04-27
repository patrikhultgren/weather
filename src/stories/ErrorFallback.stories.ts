import type { Meta, StoryObj } from '@storybook/react'
import ErrorFallback from 'components/ErrorFallback'

const meta = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  args: {
    error: new Error('An error did occurr'),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
