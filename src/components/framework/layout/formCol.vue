<template>
  <el-col :span="span" :offset="offset">
    <el-tooltip :disabled="!validateMessage()" :content="validateMessage()">
      <el-form-item ref="formItem" :label="label" :prop="prop" :label-width="labelWidth" :required="required" :show-message="false" :rules="rules">
        <slot></slot>
      </el-form-item>
    </el-tooltip>
  </el-col>
</template>

<script>
export default {
  name: 'ElFormCol',
  props: {
    prop: {},
    span: { type: Number, default: 12 },
    offset: { type: Number, default: 0 },
    label: String,
    labelWidth: String,
    trigger: { type: String },
    required: Boolean,
    array: Boolean,
    validator: Function,
    max: { type: Number },
    min: { type: Number },
    email: Boolean,
    number: Boolean,
    date: Boolean,
    name: Boolean,
    password: Boolean,
    account: Boolean,
    mobile: Boolean,
    globalMobile: Boolean,
    message: { type: String, default: kindo.cache.get('language') === 'zh' ? '该字段为必填项' : 'This field is required' }
  },
  data() {
    return {
      rules: [],
      language: {
        commonLang: ''
      }
    };
  },
  methods: {
    nameValidator(rule, value, callback) {
      if (value && kindo.validate.containSpecialChars(value)) {
        // 不能包含特殊字符
        callback(new Error(this.language.commonLang.nameValidator));
        return;
      } else {
        callback();
        return;
      }
    },
    accountValidator(rule, value, callback) {
      if (value && !(kindo.validate.pattern.isPassword.test(value) || kindo.validate.pattern.email.test(value))) {
        //由英文字母、数字以及_组成，并且不能以_开头
        callback(new Error(this.language.commonLang.accountValidator));
        return;
      } else {
        callback();
        return;
      }
    },
    passwordValidator(rule, value, callback) {
      if (value && !kindo.validate.pattern.isPassword.test(value)) {
        //由英文字母、数字以及_组成，并且不能以_开头
        callback(new Error(this.language.commonLang.passwordValidator));
        return;
      } else {
        callback();
        return;
      }
    },
    mobileValidator(rule, value, callback) {
      if (value && !kindo.validate.pattern.mobile.test(value)) {
        //请输入正确的电话号码
        callback(new Error(this.language.commonLang.mobileValidator));
        return;
      } else {
        callback();
        return;
      }
    },
    globalMobileValidator(rule, value, callback) {
      if (value && !kindo.validate.pattern.globalMobile.test(value)) {
        //请输入正确的国内手机号码或国际号码
        callback(new Error(this.language.commonLang.globalMobileValidator));
        return;
      } else {
        callback();
        return;
      }
    },
    requiredValidator(rule, value, callback) {
      if (!String.isNullOrEmpty(value)) {
        return callback();
      } else {
        return callback(new Error(this.message));
      }
    },
    numberValidator(rule, value, callback) {
      if (isNaN(value)) {
        //请输入有效的数字值
        return callback(new Error(this.language.commonLang.numberValidator));
      } else {
        return callback();
      }
    },
    validateMessage() {
      if (this.$refs['formItem']) {
        return this.$refs['formItem'].validateMessage;
      } else {
        return null;
      }
    }
  },
  created() {
    //获取国际化
    const commonLang = kindo.util.getLanguage('CommonLang');
    this.language.commonLang = commonLang;
    // 必填验证
    if (this.required && this.date) {
      this.rules.push({ type: 'date', required: true, message: this.message, trigger: this.trigger });
    } else if (this.required && this.array) {
      //请至少选择一项
      this.rules.push({ type: 'array', required: true, message: commonLang.selectOneLeast, trigger: this.trigger });
    } else if (this.required) {
      // this.rules.push({ required: true, message: this.message, trigger: this.trigger })
      // 自带的required验证，value必须为String，不是String的会有bug
      this.rules.push({ validator: this.requiredValidator, trigger: this.trigger });
    }
    // 长度验证
    if (typeof this.max !== 'undefined' && typeof this.min !== 'undefined') {
      //长度在
      this.rules.push({ max: this.max, min: this.min, message: (commonLang.lengthIn + ' ' + this.min + ' ' + commonLang.between + ' ' + this.max + ' ' + commonLang.character) });
    } else if (typeof this.min !== 'undefined') {
      //长度必须要大于
      this.rules.push({ min: this.min, message: (commonLang.lengthMustGt + ' ' + this.min + ' ' + commonLang.character) });
    } else if (typeof this.max !== 'undefined') {
      //长度必须要小于
      this.rules.push({ max: this.max, message: (commonLang.lengthMustLt + ' ' + this.max + ' ' + commonLang.character) });
    }
    // 邮箱验证
    if (this.email) {
      //请按xx@xx.xx格式输入正确邮箱地址
      this.rules.push({ type: 'email', message: commonLang.emailValidator });
    }
    if (this.account) {
      this.rules.push({ validator: this.accountValidator, trigger: this.trigger });
    }
    // 数字验证
    if (this.number) {
      this.rules.push({ validator: this.numberValidator, trigger: this.trigger });
    }
    //名称校验
    if (this.name) {
      this.rules.push({ validator: this.nameValidator, trigger: this.trigger });
    }
    //通过密码格式验证
    if (this.password) {
      this.rules.push({ validator: this.passwordValidator, trigger: this.trigger });
    }
    //手机号验证
    if (this.mobile) {
      this.rules.push({ validator: this.mobileValidator, trigger: this.trigger });
    }
    //通用手机号码验证
    if (this.globalMobile) {
      this.rules.push({ validator: this.globalMobileValidator, trigger: this.trigger });
    }
    // 自定义验证
    if (this.validator) {
      this.rules.push({ validator: this.validator, trigger: this.trigger });
    }
  }
};
</script>
