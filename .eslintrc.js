module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "no-undef": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-escape": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  }
}
