//Default information is stored in Runner/Settings/Project settings / Resolved configuration --> information may be overrided
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //Timeout defined for waiting for elements/actions (could be overwrite on the spec)
  defaultCommandTimeout: 6000,
  //
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true,
  },
  //Values to be taken when executing the tests
  env:{
    url: "https://rahulshettyacademy.com"
  },
  //Integration with the Cypress dashboard. For running, the key is also need (both values are provided by Cypress dashboard)
  projectId: "cjicum",
  //Prevent framework to record videos
  video: false,
  //Indicates the number of times a failed test will be executed again
  retries: {
    runMode: 1,//when executing from the console
    openMode: 0,//When executing from the Cypress UI
    },
  e2e: {
    setupNodeEvents(on, config) {
    },
    //Indicates what Cypress will look for tests
    specPattern:'cypress/integration/intro/*.js'
  },
});
