# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Project

Playwright + TypeScript test framework for the Conduit app. API and UI tests, page objects, modular fixtures.

## Test Agents (Playwright)

This repo uses Playwright Test Agents: planner, generator, healer. Agent definitions: `.claude/agents/`. MCP config: `.mcp.json`.

Commands:
- `npx playwright init-agents --loop claude` (regenerate after Playwright updates)

Workflow:
1. Planner -> `specs/` markdown plans (use `tests/seed.spec.ts`).
2. Generator -> tests under `tests/`.
3. Healer -> repair failing tests.

## Commands

- `npm test` (chromium)
- `npm run test:ui`
- `npm run test:smoke` / `test:sanity` / `test:regression` / `test:api`

## Conventions

- Imports use `@/` alias (tsconfig paths).
- Page objects in `pages/`, services in `services/`, tests in `tests/client` or `tests/api`.
- Fixtures from `@/fixtures` (merged POM + API).
- Storage state at `.auth/userSession.json` via `client-setup` project.

## Environment

Loads `env/.env.dev`. Required: URL, API_URL, USER_NAME, EMAIL, PASSWORD.

