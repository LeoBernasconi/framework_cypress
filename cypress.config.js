//Default information is stored in Runner/Settings/Project settings / Resolved configuration --> information may be overrided
const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs'); 

module.exports = defineConfig({
  //Timeout defined for waiting for elements/actions (could be overwrite on the spec)
  defaultCommandTimeout: 6000,
  //For generating mochawesome reports --> set html or json as true
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: true,
    html: false,
    json: false,
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
    async setupNodeEvents(on, config) {
      //Plugin to handle Cucumber 
      //Need to install "npm install @badeball/cypress-cucumber-preprocessor" and do some configuration on package.json. 
      //Extension "Visual studio cucumber bdd" is welcome
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", browserify.default(config));
      //DB connection data
      config.db = {
        userName: "userName",
        password: "password",
        server: "serverName",
        options: {
            database: "databaseName",
            encrypt: true,
            rowCollectionOnRequestCompletion : true
        }
    }
      //Pluging to handle SQL database connection
      tasks = sqlServer.loadDBPlugin(config.db);
      on('task', tasks);
      //Node task to handle Excel files
      on('task',{
        excepToJsonConverter(filePath){
            const result = excelToJson({
            source: fs.readFileSync(fileName)
          });
          return result
        }
      })

    },
    //Indicates what Cypress will look for tests
    specPattern:'cypress/integration/*/*.js'//For classic tests inside js files
    //specPattern:'cypress/integration/BDD/*.feature'//For BDD approach 
  },
});
