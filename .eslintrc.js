module.exports = {
  "root": true,
  "extends": ["eslint:recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "browser": true,
    "mocha": true,
    "jquery": true,
    "es6": true,
    "node":true
  },
  "plugins": [
    "html"
  ],
  "rules": {
    "new-cap": [0, { "newIsCap": true }],
    "strict": 0,
    "no-underscore-dangle": 1,
    "no-use-before-define": "error",
    "eol-last": 1,
    "indent": ["error", 2],
    "quotes": [2, "single"],
    "linebreak-style": [0, "windows"],
    "semi": [2, "always"],
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-debugger": 2,
    "no-dupe-keys": "error",
    "no-dupe-args": "error",
    "no-invalid-regexp": 2,
    "no-duplicate-case": "error",
    "use-isnan": 2,
    "no-sparse-arrays": "error",
    "no-unreachable": "error",
    "valid-typeof": "error",
    "no-cond-assign": "error",
    "no-func-assign": "error",
    "no-obj-calls": 2,
    "no-tabs":0,
    "eqeqeq":0,
    "space-before-function-paren": "error",
    "space-infix-ops": "error",
    "one-var-declaration-per-line": 0,
    "no-undef": 2,
    "no-mixed-spaces-and-tabs": 0,
    "comma-dangle":2,
    "no-unused-vars": [1, { "args": "after-used" }],
    "comma-spacing":1
  }
};
