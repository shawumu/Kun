module.exports = {
  env: {
    commonjs: true,
    es2021: true
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 13
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        trailingComma: "none"
      }
    ],
    "class-methods-use-this": "off",
    "no-unused-expressions": "off",
    "max-classes-per-file": "off"
  }
};
