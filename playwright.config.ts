import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// Determine which environment file to load
const environmentPath = process.env.ENVIRONMENT
  ? path.resolve(__dirname, `./env/.env.${process.env.ENVIRONMENT}`)
  : path.resolve(__dirname, "./env/.env.dev");

dotenv.config({ path: environmentPath });

import { STORAGE_PATH } from "./types/constants";

// Load env variables, then require env exports so they read from process.env.
// Use runtime require to avoid static import hoisting which can run `env/index.ts`
// before dotenv has populated process.env.
/* eslint-disable @typescript-eslint/no-var-requires */
const { URL } = require("./env");

export default defineConfig({
  globalSetup: require.resolve("./global"),
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: URL,
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: STORAGE_PATH,
        viewport: { width: 1366, height: 768 },
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
