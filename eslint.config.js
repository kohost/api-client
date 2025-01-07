import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/", "tests/", "dist/"],
  },
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: 2024,
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
  },
];
