const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
    supportFile: 'tests/e2e/support/index.js',
    specPattern: 'tests/e2e/specs/**/*.cy.js',
    viewportWidth: 1280,
    viewportHeight: 720
  }
}); 