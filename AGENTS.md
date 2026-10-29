# Playwright Test Agents

This project is set up for [Playwright Test Agents](https://playwright.dev/docs/test-agents): **planner**, **generator**, and **healer**.

## Setup (already done)

Agent definitions are for all supported loops:

- VS Code: `.github/agents/`
- Claude Code: `.claude/agents/`
- OpenCode: `.opencode/prompts/`

MCP server config:

- `.vscode/mcp.json`
- `.mcp.json`
- `opencode.json`

Seed test: `tests/seed.spec.ts`

## Workflow

1. **Planner** — explore the app and produce a Markdown test plan in `specs/`.
   - Prompt example: "Generate a plan for guest checkout. Use seed.spec.ts."
2. **Generator** — transform a plan in `specs/` into Playwright tests under `tests/`.
   - Prompt example: "Generate tests from specs/basic-operations.md."
3. **Healer** — run the suite and repair failing tests.

## Conventions

- Specs live in `specs/` (human-readable plans).
- Generated tests live in `tests/`.
- Seed test `tests/seed.spec.ts` bootstraps environment/fixtures.
- Regenerate agents after Playwright updates:
  `npx playwright init-agents --loop <vscode|claude|opencode>`

## Running tests

- `npm test` — chromium
- `npm run test:ui` — UI mode
- `npm run test:debug` — debug
- `npm run test:smoke` / `test:sanity` / `test:regression`

## Notes

- MCP server command: `npx playwright run-test-mcp-server`
- Keep `seed.spec.ts` aligned with your custom fixtures in `./fixtures`.

