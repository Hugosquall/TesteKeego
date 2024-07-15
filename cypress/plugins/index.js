// cypress/plugins/index.js
const dotenv = require('dotenv');
const dotenvPlugin = require('cypress-dotenv');

module.exports = (on, config) => {
  config = dotenvPlugin(config);
  return config;
};