module.exports = {
  env: {
    "jest/globals": true,
  },
  plugins: ["jest"],
  extends: ["@kohost"],
  parserOptions: {
    ecmaVersion: 2023,
  },
  ignorePatterns: ["dist/**"],
};
