import { defineConfig, mergeConfig } from 'vitest/config'

// The forecast is grouped into local days, so the suite pins the timezone.
process.env.TZ = 'UTC'
import viteConfig from './vite.config.ts'

export default defineConfig((configEnv) =>
  mergeConfig(viteConfig(configEnv), {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      restoreMocks: true,
      env: { TZ: 'UTC' },
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.stories.*',
          'src/**/*.test.*',
          'src/test/**',
          'src/types/**',
          'src/main.tsx',
          'src/sw.ts',
          'src/vite-env.d.ts',
        ],
      },
    },
  })
)
