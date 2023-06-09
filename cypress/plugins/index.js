const merge = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

module.exports = (on, config) => {
  on('after:run', (results) => {
    // Merge all JSON reports into a single file
    merge()
      .then((report) => {
        // Generate an HTML report
        return generator.create(report);
      })
      .then((htmlReport) => {
        // Save the HTML report
        const reportPath = 'cypress/reports/mochawesome/mochawesome.html';
        return new Promise((resolve, reject) => {
          fs.writeFile(reportPath, htmlReport, (err) => {
            if (err) {
              console.error(err);
              return reject(err);
            }
            console.log(`HTML report generated at: ${reportPath}`);
            resolve();
          });
        });
      });
  });
};
