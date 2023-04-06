/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable  @typescript-eslint/no-explicit-any */
const path = require('path');
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
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
    node: true
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars":"off",
    "@typescript-eslint/no-non-null-asserted-optional-chain":"off",
    "@typescript-eslint/no-empty-interface": "off",
    "react/jsx-key": "off",
    "@typescript-eslint/no-empty-function": "off"
  }
}
