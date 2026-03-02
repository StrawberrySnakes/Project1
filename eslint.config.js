const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["eslint.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
    },
  },

  {
    files: ["client/**/*.js"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": "warn",
    },
  },
];