const { defineConfig } = require("cypress")
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      loginUsername: process.env.LOGIN_USERNAME,
      loginPassword: process.env.LOGIN_PASSWORD
    }
  },
});
