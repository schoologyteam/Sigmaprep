// playwright.config.ts
import { defineConfig } from 'playwright/test';

export default defineConfig({
  name: 'quackprep-e2e',
  testDir: './tests/e2e/',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/',
    timeout: 120000,
  },
  use: {
    baseURL: 'http://localhost:5173/',
  },
});
