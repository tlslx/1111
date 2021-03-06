// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "vue"
  ],
  "plugins": [
    "html"
  ],
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      { "SwitchCase": 1 }
    ],
    // "linebreak-style": ["error", "unix"],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars":"warn",
    "no-undef":"off",


    "no-bitwise": 0,//禁止使用按位运算符
    "no-catch-shadow": 2,//禁止catch子句参数与外部作用域变量同名
    "no-class-assign": 2,//禁止给类赋值
    "no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
    "no-const-assign": 2,//禁止修改const声明的变量
    "no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
    "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-dupe-args": 2,//函数参数不能重复
    "no-duplicate-case": 2,//switch中的case标签不能重复
    "no-empty": "warn",
    "no-empty-character-class": 2,//正则表达式中的[]内容不能为空
    "no-eq-null": "off",//禁止对null使用==或!=运算符
    "no-eval": 1,//禁止使用eval
    "no-floating-decimal": 2,//禁止省略浮点数中的0 .5 3.
    "no-func-assign": 2,//禁止重复的函数声明
    "no-implied-eval": 2,//禁止使用隐式eval
    "no-inline-comments": 0,//禁止行内备注
    "no-invalid-regexp": 2,//禁止无效的正则表达式
    "no-irregular-whitespace": 2,//不能有不规则的空格
    "no-label-var": 2,//label名不能与var声明的变量名相同
    "no-lonely-if": 2,//禁止else语句内只有if语句
    "no-loop-func": 1,//禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    "no-mixed-spaces-and-tabs": [2, false],//禁止混用tab和空格
    "no-multi-spaces": 1,//不能用多余的空格
    "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "no-native-reassign": 2,//不能重写native对象
    "no-negated-in-lhs": 2,//in 操作符的左边不能有!
    "no-nested-ternary": 0,//禁止使用嵌套的三目运算
    "no-obj-calls": 2,//不能调用内置的全局对象，比如Math() JSON()
    "no-octal": 2,//禁止使用八进制数字
    "no-param-reassign": 2,//禁止给参数重新赋值
    "no-redeclare": 2,//禁止重复声明变量
    "no-regex-spaces": 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
    "no-return-assign": 1,//return 语句中不能有赋值表达式
    "no-script-url": 0,//禁止使用javascript:void(0)
    "no-self-compare": 2,//不能比较自身
    "no-sequences": 0,//禁止使用逗号运算符
    "no-shadow": 2,//外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    "no-spaced-func": 2,//函数调用时 函数名与()之间不能有空格
    "no-sparse-arrays": 2,//禁止稀疏数组， [1,,2]
    "no-trailing-spaces": "off",
    "no-this-before-super": 0,//在调用super()之前不能使用this或super
    "no-throw-literal": 2,//禁止抛出字面量错误 throw "error";
    "no-undef-init": 2,//变量初始化时不能直接给它赋值为undefined
    "no-unexpected-multiline": 2,//避免多行表达式
    "no-unneeded-ternary": 2,//禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    "no-unreachable": 2,//不能有无法执行的代码
    //"no-unused-expressions": 2,//禁止无用的表达式
    "no-use-before-define": 2,//未定义前不能使用
    "no-useless-call": 2,//禁止不必要的call和apply
    "no-var": 0,//禁用var，用let和const代替
    "brace-style": [1, "1tbs"],//大括号风格
    "callback-return": 1,//避免多次调用回调什么的
    "camelcase": 2,//制驼峰法命名
    "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
    "complexity": [0, 11],//if判断代码块数量
    "consistent-this": [2, "_this"],//this别名
    "curly": [2, "all"],//必须使用 if(){} 中的{}
    "default-case": 2,//switch语句最后必须有default
    "eqeqeq": ["error", "always", {"null": "never"}],//必须使用全等
    "id-length": 0,//变量名长度
    "init-declarations": 0,//声明时必须赋初值
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "max-depth": [0, 4],//嵌套块深度
    "max-len": [0, 80, 4],//字符串最大长度
    "max-nested-callbacks": [0, 2],//回调嵌套深度
    "new-cap": 2,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    "new-parens": 2,//new时必须加小括号
    "operator-linebreak": ["error", "before"],//换行时运算符在行尾还是行首
    "padded-blocks": 0,//块语句内行首行尾是否要空行
    "space-after-keywords": [0, "always"],//关键字后面是否要空一格
    "space-unary-ops": [2, { 
      "words": true, 
      "nonwords": false
    }],//一元运算符的前/后要不要加空格
    "spaced-comment": 0,//注释风格要不要有空格什么的
    "use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": false,
        "ClassDeclaration": false,
        "ArrowFunctionExpression": false
      }
    }],
    "valid-jsdoc": ["error", {
      "requireReturn": false,
      "requireParamDescription": false,
      "requireReturnDescription": true
    }],//jsdoc规则
    "valid-typeof": 2,//必须使用合法的typeof的值
    "vars-on-top": 2,//var必须放在作用域顶部
    "wrap-iife": [2, "inside"],//立即执行函数表达式的小括号风格
    "quotes":"off",
    "prefer-const":"off",
    "space-before-function-paren":"off",
    "handle-callback-err":"off",

    "no-alert": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-debugger": process.env.NODE_ENV === 'production' ? 1 : 0,
    "no-warning-comments": ["warn", { "terms": ["todo", "fixme", "xxx"], "location": "start" }]//不能有警告备注
  }
}
