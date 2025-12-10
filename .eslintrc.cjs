/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    env: {
      node: true,
      es2023: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      project: ["./tsconfig.json"],
    },
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "off"
    },
    ignorePatterns: [
      "dist",
      "node_modules"
    ],
  };
  