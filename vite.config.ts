import fs from 'node:fs/promises'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// The app is served from https://patrikhultgren.github.io/weather/ but from the
// root in development, which is what the API urls in .env assume.
const productionBase = '/weather/'

/** Storybook renders components in isolation and has no use for the PWA. */
const isStorybook = Boolean(process.env.STORYBOOK)

/**
 * GitHub Pages serves 404.html for any path it has no file for, rather than
 * falling back to index.html. Publishing a copy of the shell there is what
 * makes a deep link such as /weather/search work instead of showing GitHub's
 * own 404 page.
 */
const spaFallback = (): Plugin => {
  let outDir = 'build'

  return {
    name: 'spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    // closeBundle rather than an emitted asset: the html is written by another
    // plugin, so copying the finished file is not tied to bundler internals.
    async closeBundle() {
      const from = path.resolve(outDir, 'index.html')
      const to = path.resolve(outDir, '404.html')

      await fs.copyFile(from, to)
    },
  }
}

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
    spaFallback(),
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
          // 404.html is written after this runs, so it is not picked up
          // today; the ignore keeps it that way if the order ever changes.
          globIgnores: ['**/404.html'],
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
