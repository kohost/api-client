const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-var": ["error"],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-console": 0,
    },
    ignores: ["node_modules/", "tests/*"],
  },
];
