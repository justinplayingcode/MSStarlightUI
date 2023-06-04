const path = require('path');
module.exports = {
  extends: [
    // 'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    // 'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json')
      }
    }
  },
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  parser: "@typescript-eslint/parser",
  rules: {
    'react/react-in-jsx-scope': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain":"off",
    "@typescript-eslint/no-empty-interface": "off",
    "react/jsx-key": "off",
    "@typescript-eslint/no-empty-function": "off",
    "no-unsafe-optional-chaining": "off",
    "no-const-assign": "off",
    "@typescript-eslint/no-var-requires": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
  },
}
