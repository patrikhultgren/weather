import type { Meta, StoryObj } from '@storybook/react'
import ErrorBoundaryFallback from 'components/Error/BoundaryFallback'

const meta = {
  title: 'components/ErrorBoundaryFallback',
  component: ErrorBoundaryFallback,
  args: {
    error: new Error('An error did occurr'),
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ErrorBoundaryFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
