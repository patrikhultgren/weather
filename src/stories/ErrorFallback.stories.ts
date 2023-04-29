import type { Meta, StoryObj } from '@storybook/react'
import ErrorFallback from 'components/Error/Fallback'

const meta = {
  title: 'Components/Error/Fallback',
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
