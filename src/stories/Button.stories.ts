import type { Meta, StoryObj } from '@storybook/react'
import Button from 'common/Button'

const meta = {
  title: 'common/Button',
  component: Button,
  args: {
    children: 'Button Text',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = { args: { variant: 'secondary' } }
