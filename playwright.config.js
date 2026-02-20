const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Enable HTML report
  reporter: [['html', { open: 'never' }]],

  use: {
    headless: false,
    slowMo: 50,
    viewport: null,                 // allow real window size
    launchOptions: {
      args: ['--start-maximized'],  // maximize browser
    },
  },

  projects: [
    {
      name: 'chromium',
    },
  ],

  testMatch: /.*\.spec\.js/,
});