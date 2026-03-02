const js = require("@eslint/js");
const globals = require("globals");
// taken from https://eslint.org/docs/latest/use/configure/configuration-files#configuration-based-on-glob-patterns
//To deal with server and client side code in the same project => need to specify different globals.
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