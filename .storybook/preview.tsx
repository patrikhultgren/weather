import React from 'react'
import type { Preview } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { TranslationProvider } from '../src/i18n/TranslationProvider'
import '../src/css/style.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <TranslationProvider language="en">
          <Story />
        </TranslationProvider>
      </MemoryRouter>
    ),
  ],
}

export default preview
