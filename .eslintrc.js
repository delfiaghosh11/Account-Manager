/* eslint-disable */

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "unused-imports"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
