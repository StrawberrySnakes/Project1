const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,

  // ✅ Treat eslint.config.js as Node
  {
    files: ["eslint.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },

  // ✅ Server (Node)
  {
    files: ["src/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
    },
  },

  // ✅ Client (Browser)
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