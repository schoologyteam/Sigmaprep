import { defineConfig } from "playwright/test";
//test
export default defineConfig({
  name: "quackprep-tests",
  globalSetup: "./tests/global.setup.js",
  globalTeardown: "./tests/global.teardown.js",
  testDir: "./tests/",
  webServer: {
    reuseExistingServer: true,
    command: "npm run dev",
    url: "http://localhost:3001/",
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium thats cool",
      use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "on-first-retry",
        browserName: "chromium",
      },
    },
  ],

  outputDir: "test-results/",
  maxFailures: 1,
});
