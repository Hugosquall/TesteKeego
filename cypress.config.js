const { defineConfig } = require("cypress");

require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
    },
  },
  env: {
    baseUrl: "https://advantageonlineshopping.com"
  },
});
