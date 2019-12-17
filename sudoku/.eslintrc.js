module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential'
  ],
  rules: {
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      "files":["sudoku.js"],
      "rules":{
      }
    }
  ]
}
