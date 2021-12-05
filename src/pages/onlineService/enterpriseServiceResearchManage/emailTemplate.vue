/**
 * @file 邮件模版编辑
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="邮件模版内容编辑" name="0">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" v-loading="loading">
        <el-form-item label="邮件标题" prop="emailTopic">
          <el-input v-model="ruleForm.emailTopic" maxlength="255" clearable></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-select v-model="ruleForm.language" placeholder="请选择" clearable>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="替换字符" prop="replaceChar">
          <div v-model.number="ruleForm.replaceChar" class="replace-char">
            这里可使用的替换符号如下：
            {companyname}公司名称
            {companyintroduce}公司简介
            {linkman}联系人
            {boothon}摊位号
            {productname}产品简介
            {telephone}电话
            {fax}传真
          </div>
        </el-form-item>
        <el-form-item label="邮件格式">
          <el-select v-model="emailType" placeholder="请选择" @change="typeChange" clearable>
            <el-option v-for="item in typeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对外公布" prop="isPublic">
          <el-radio-group v-model="ruleForm.isPublic">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮件内容" prop="emailContent" v-if="isHtml">
          <el-input type="textarea" rows="5" maxlength="2000" clearable v-model="ruleForm.emailContent" placeholder="设计模式"></el-input>
        </el-form-item>
        <el-form-item label="邮件内容" prop="nextEmailContent" v-else>
          <el-input type="textarea" rows="5" maxlength="2000" clearable v-model="ruleForm.nextEmailContent" placeholder="HTML模式"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// vuex
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      // tab
      activeName: "0",
      // 表单loading
      loading: false,
      // 根据邮件格式现实对应文本框
      isHtml: true,
      // 表单对象
      ruleForm: {
        // 邮件标题
        emailTopic: "",
        // 语言
        language: "",
        // 代替内容
        replaceChar: "",
        // 是否公开
        isPublic: 0,
        // 设计模式内容
        emailContent: "",
        // html模式内容
        nextEmailContent: ""
      },
      // 邮件模式
      emailType: "01",
      // 校验
      rules: {
        emailTopic: [
          { required: true, message: '请填写邮件标题', trigger: 'blur' }
        ],
        language: [
          { required: true, message: '请选择语言', trigger: 'change' }
        ],
        emailContent: [
          { required: true, message: '请填写邮件内容', trigger: 'blur' }
        ],
        nextEmailContent: [
          { required: true, message: '请填写邮件内容', trigger: 'blur' }
        ]
      },
      // 语言数组
      options: [
        {
          label: "中文",
          value: "01"
        },
        {
          label: "English",
          value: "02"
        }
      ],
      // 邮件类型数组
      typeOption: [
        {
          label: "设计模式",
          value: "01"
        },
        {
          label: "HTML模式",
          value: "02"
        }
      ]
    };
  },
  created() {
    // 获取届数
    this.getSessionInfo();
    // 根据this.$route.query.emailModelId判断是编辑页面还是新增，存在为编辑
    if (this.$route.query.emailModelId) {
      // 编辑页面获取详情
      this.getEmailModelDetailInfo(this.$route.query.emailModelId).then(res => {
        // 获取详情对应赋值
        this.ruleForm = JSON.parse(JSON.stringify(res));
        // 是否公开由字符串转换成数字
        if (res.isPublic === "0") {
          this.ruleForm.isPublic = 0;
        } else {
          this.ruleForm.isPublic = 1;
        }
        // 判断不同模式，现实不同文本域
        if (res.nextEmailContent) {
          // 判断不同模式
          this.emailType = "02";
          // 显示不同文本域
          this.isHtml = false;
        } else {
          this.emailType = "01";
          this.isHtml = true;
        }
      });
    } else {
      // 新增页面，初始为空
      this.ruleForm = {};
    }
  },
  computed: {
    // 获取届数
    ...mapGetters('common', ['session']),
    ...mapGetters('enterprisesInviteCustomers', [])
  },
  methods: {
    // 获取届数
    ...mapActions('common', ['getSessionInfo']),
    ...mapActions('enterprisesInviteCustomers', ['updateEmailModelInfo', 'addEmailModelInfo', 'getEmailModelDetailInfo']),
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交
          this.toSubmit();
        } else {
          return false;
        }
      });
    },
    // 提交方法
    toSubmit() {
      // 暂存对象
      let data = this.ruleForm;
      data.replaceChar = "这里可使用的替换符号如下： {companyname}公司名称 {companyintroduce}公司简介 {linkman}联系人 {boothon}摊位号 {productname}产品简介 {telephone}电话 {fax}传真";
      // 转换是否公开为字符串传给后台
      if (data.isPublic === 0) {
        data.isPublic = "0";
      } else {
        data.isPublic = "1";
      }
      // 过滤对象中空属性
      for (const key in data) {              // 去除对象内多余的空值key
        if (data[key] === '') {
          delete data[key];
        }
      }
      // 届数
      data.session = this.session;
      // 编辑提交
      if (this.$route.query.emailModelId) {
        data.emailModelId = this.$route.query.emailModelId;
        // 编辑提交传参
        let param = {
          emailModelInfo: data
        };
        this.loading = true;
        this.updateEmailModelInfo(param).then(res => {
          // 编辑提交成功
          this.loading = false;
          this.$router.push("/mailTemplateMaintenance");
        });
      } else {
        // 新增提交传参
        let param = {
          emailModelInfo: data
        };
        this.loading = true;
        this.addEmailModelInfo(param).then(res => {
          // 新增提交成功
          this.loading = false;
          this.$router.push("/mailTemplateMaintenance");
        });
      }

    },
    // 取消
    resetForm() {
      this.$router.back();
    },
    // 模式改变
    typeChange(val) {
      if (val === "01") {
        this.isHtml = true;
      } else {
        this.isHtml = false;
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
  margin-bottom: 22px;
}
.replace-char{
  white-space: pre-line;
  line-height: 20px;
}
</style>
