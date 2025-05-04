import type { Meta, StoryObj } from '@storybook/react'
import ErrorBoundaryFallback from 'common/Error/Boundary/Fallback'

const meta = {
  title: 'common/ErrorBoundaryFallback',
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
