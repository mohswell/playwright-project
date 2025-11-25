# Playwright Project

This repository is a Playwright + TypeScript example test framework for the Conduit app. It contains API and UI tests, page objects, fixtures, and helpers to make writing reliable end-to-end tests easier.

## Status
- The repository contains both API and UI tests. Some tests rely on environment variables and storageState produced by setup projects.
- Use the `client-setup` (login) project to create an authenticated storage state before running browser tests.

## Prerequisites
- Node.js (LTS) and npm installed and available on your PATH.
- A copy of the environment file: `env/.env.dev` (or set the environment vars listed below).

Required environment variables (from `env/.env.dev`):
- `URL` — base URL of the app under test
- `API_URL` — API base URL
- `USER_NAME`, `EMAIL`, `PASSWORD` — default test user credentials
- `API_TOKEN` — optional, used by some API fixtures (not required for pure UI tests)

## Install
Clone and install dependencies:

```pwsh
git clone https://github.com/mohswell/playwright-project.git
cd playwright_project
npm install
```

## Useful npm scripts
- `npm run test` — run Playwright with the `chromium` project (default browser suite)
- `npm run test:ci` — run tests with CI-friendly settings
- `npm run test:ui` — open Playwright Test UI
- `npm run test:smoke` — run smoke tests (tagged `@Smoke`)
- `npm run test:api` — run API tests under `tests/api`

Run a specific project or test file with Playwright directly:

```pwsh
npx playwright test --project=client-setup -v
npx playwright test --project=navigation -v
npx playwright test tests/api/articles/articles.api.spec.ts -v
```

## Test flow and storageState
- The repository uses a `client-setup` project that logs in (via UI) and writes a Playwright `storageState` file to `.auth/userSession.json`.
- Browser projects (navigation/profile/chromium) reuse that `storageState` so tests run with an authenticated session.
- If you change login credentials, re-run the `client-setup` project to regenerate the storage state.

## Fixtures and helpers
- `fixtures/api/api.core.ts` provides API fixtures: `api`, `auth`, `articles`, `comments`, `tags`, and a `createdArticle` fixture that creates a fresh article for tests.
- `fixtures/pom/pom.core.ts` provides page object fixtures used by UI tests.
- `helpers/faker.ts` and `helpers/article-generator.ts` generate test data.

## Writing reliable like/favorite assertions
- Prefer checking a class toggle (e.g. `.btn-primary` vs `.btn-outline-primary`) to determine if an article is liked.
- If you assert the numeric counter, trim whitespace and prefer a regex tolerant assertion like `toHaveText(/^\s*1\s*$/)`.

## Troubleshooting
- "No tests found": confirm your test path or grep; use `npx playwright test --list` to see discovered tests.
- "Missing environment variable": ensure `.env.dev` is present or export required vars before running tests. `playwright.config.ts` loads `env/.env.dev` by default.

## Contributing
- Follow existing patterns: put page objects in `pages/`, services in `services/`, and tests under `tests/client` or `tests/api`.
- Run lint and format before committing:

```pwsh
npx eslint . --ext .ts --fix
npx prettier --write "**/*.{ts,tsx,js,jsx,json,md}"
```

## Contact
If you need help with failing tests or extending fixtures, open an issue or create a PR with a reproducible failing test and I’ll help debug.

---
