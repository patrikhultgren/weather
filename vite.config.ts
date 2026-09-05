import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// The app is served from https://patrikhultgren.github.io/weather/ but from the
// root in development, which is what the API urls in .env assume.
const productionBase = '/weather/'

/** Storybook renders components in isolation and has no use for the PWA. */
const isStorybook = Boolean(process.env.STORYBOOK)

export default defineConfig(({ command }) => ({
  base: command === 'build' ? productionBase : '/',
  // The .env files predate the move to Vite and still use the REACT_APP_ prefix.
  envPrefix: ['VITE_', 'REACT_APP_'],
  resolve: {
    // Honours the baseUrl in tsconfig.app.json, so 'lib/date' resolves.
    tsconfigPaths: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    !isStorybook &&
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        injectRegister: null,
        manifest: false,
        injectManifest: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        },
        devOptions: { enabled: false },
      }),
  ],
  build: {
    // Keep the output directory that `npm run deploy` publishes to gh-pages.
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
}))
