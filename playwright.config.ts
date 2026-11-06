import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Determine which environment file to load
const environmentPath = process.env.ENVIRONMENT
    ? path.resolve(__dirname, `./env/.env.${process.env.ENVIRONMENT}`)
    : path.resolve(__dirname, './env/.env.dev');

dotenv.config({ path: environmentPath });

import { STORAGE_PATH } from './types/constants';

const { URL } = require('./env');

export default defineConfig({
    globalSetup: require.resolve('./global.ts'),
    testDir: './tests',
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Fail fast when too many tests break. */
    maxFailures: process.env.CI ? 5 : undefined,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI
        ? [['blob'], ['github'], ['junit', { outputFile: 'test-results/results.xml' }]]
        : 'html',
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        baseURL: URL,
        /* Capture rich artifacts on failure for debugging. */
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 15_000,
        navigationTimeout: 30_000,
    },
    expect: {
        timeout: 10_000,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'client-setup',
            testMatch: /.*\.client\.setup\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1366, height: 768 },
            },
        },
        // CLIENT TESTS
        {
            name: 'chromium',
            testMatch: /tests\/client\/.*\.spec\.ts/,
            dependencies: ['client-setup'],
            use: {
                ...devices['Desktop Chrome'],
                storageState: STORAGE_PATH,
                viewport: { width: 1366, height: 768 },
            },
        },
        {
            name: 'api-setup',
            testMatch: /.*\.api\.setup\.ts/,
        },
        // API TESTS
        {
            name: 'api',
            testMatch: /tests\/api\/.*\.spec\.ts/,
            dependencies: ['api-setup'],
        },

        // {
        //   name: "firefox",
        //   use: { ...devices["Desktop Firefox"] },
        // },

        // {
        //   name: "webkit",
        //   use: { ...devices["Desktop Safari"] },
        // },
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
