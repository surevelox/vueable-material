module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020
  },

  root: true,

  env: {
    node: true
  },

  extends: [
    "@vue/typescript",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
