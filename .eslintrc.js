// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // 继承基础规则，但后续会关闭格式类规则
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // ========== 核心：关闭所有格式类强制规则 ==========
    // 1. 关闭「函数括号前空格」要求（如 data() {} / data () {} 都允许）
    'space-before-function-paren': 'off',
    // 2. 关闭「缩进」强制要求（2/4空格、tab 都允许）
    'indent': 'off',
    // 3. 关闭「括号前后空格」强制要求（如 if() / if () 都允许）
    'space-in-parens': 'off',
    // 4. 关闭「对象括号前后空格」要求（如 {a:1} / { a:1 } 都允许）
    'object-curly-spacing': 'off',
    // 5. 关闭「逗号后空格」要求（如 a,b / a, b 都允许）
    'comma-spacing': 'off',
    // 6. 关闭「运算符前后空格」要求（如 a+b / a + b 都允许）
    'space-infix-ops': 'off',
    // 7. 关闭「函数调用括号前空格」要求（如 fn() / fn () 都允许）
    'func-call-spacing': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止未定义变量（避免代码运行报错）
    'no-undef': 'error',
    // 禁止重复声明变量（避免逻辑错误）
    'no-redeclare': 'error',
    // 禁止使用未声明的变量（仅提示，不报错）
    'no-unused-vars': 'warn',
    // 关闭「强制单引号」要求（单/双引号都允许）
    'quotes': 'off',
    // 关闭「禁止分号」要求（加不加都允许）
    'semi': 'off',
    // 关闭「禁止尾逗号」要求（加不加都允许）
    'comma-dangle': 'off',
    // 关闭「禁止多个空行」要求（加不加都允许）
    'no-multiple-empty-lines': 'off',
    // 允许未使用变量
    'no-unused-vars': 'off',
    // 允许用 ==
    'eqeqeq': 'off',
  }
}