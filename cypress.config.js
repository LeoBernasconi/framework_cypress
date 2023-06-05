//Default information is stored in Runner/Settings/Project settings / Resolved configuration --> information may be overrided
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern:'cypress/integration/intro/*.js'
  },
});
