# Weather

A weather forecast PWA. It shows the forecast for wherever you are, or for any
place you search for, using [Yr](https://www.yr.no) for the forecast,
[BigDataCloud](https://www.bigdatacloud.com) to name your coordinates and
[LocationIQ](https://locationiq.com/) for the search.

Live at <https://patrikhultgren.github.io/weather/>.

## Getting started

Requires Node 24 or newer (see `.nvmrc`).

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3000> and answers the three APIs from
the fixtures in `public/api`, so no keys are needed to work on the UI.

### Environment

`.env` holds the development values and `.env.production` the live endpoints.
The variables keep the `REACT_APP_` prefix from before the move to Vite;
`envPrefix` in `vite.config.ts` is what makes Vite read them.

`REACT_APP_LOQATION_IQ_API_KEY` is deliberately not committed. Put it in
`.env.local` to search against the real LocationIQ API. Without it the search
returns 401 in production builds.

## Scripts

| Script                  | What it does                                 |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Dev server on port 3000                      |
| `npm run build`         | Type check, then build to `build/`           |
| `npm run preview`       | Serve the production build                   |
| `npm test`              | Run the test suite once                      |
| `npm run test:watch`    | Run the tests in watch mode                  |
| `npm run test:coverage` | Run the tests with a coverage report         |
| `npm run type-check`    | `tsc -b` across the app and the config files |
| `npm run lint`          | ESLint                                       |
| `npm run format`        | Prettier                                     |
| `npm run storybook`     | Storybook on port 6006                       |
| `npm run deploy`        | Build and publish `build/` to GitHub Pages   |

## How it is laid out

```
src/
  app/         App shell and useApp, which wires the features together
  components/  Presentational components, no data fetching
  features/    A folder per domain, each owning its hooks and its logic
    forecast/    Fetching, grouping by day, the weather change notice
    location/    The geolocation watcher, the position history, reverse geocode
    search/      The search field's state machine
  hooks/       Generic hooks with no knowledge of this app's domain
  i18n/        Translation context, provider and the message catalogues
  lib/         Pure helpers: dates, geo maths, http, storage, strings
  pages/       Route components
  services/    One module per API, building the request urls
  test/        Test setup, render helpers and fixtures
  types/       Shared types, split by domain
```

Anything pure lives in `lib/` or beside its feature so it can be tested without
React. Hooks stay thin wrappers over those functions.

### Position updates

The app watches the device location, but adopting every fix would reload the
forecast constantly while travelling. `lib/geo.ts` decides when a fix is worth
adopting: far enough from the current position, slow enough not to be in a
vehicle, and not too soon after the last update. The thresholds are in
`config/index.ts`.

## Testing

Vitest with Testing Library, in jsdom. `src/test/render.tsx` provides a render
that supplies the router and the real English messages synchronously, so tests
assert on the strings a user actually sees.

Note that `src/test/storage.ts` installs an in-memory `localStorage`: Node 24+
defines an experimental `localStorage` global that resolves to `undefined`
without `--localstorage-file`, and it shadows the one jsdom provides.
