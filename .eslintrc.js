module.exports = {
  plugins: ["@typescript-eslint"],
  extends: ["@kohost", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2023,
  },
  ignorePatterns: ["dist/**"],
  root: true,
};
