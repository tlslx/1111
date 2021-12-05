/**
 * @file 施工企业注册
*/
<style scoped>
</style>
<template>
  <!-- v-model: -->
  <el-tabs v-model="activeName">
    <el-tab-pane :label="module" name="first">
      <!-- ref类似于jsp的id -->
      <!--  rules是规则下面写校验-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="220px" class="demo-ruleForm">
        <el-form-item label="用户名" maxlength="30">
          <el-input v-model="ruleForm.companyAccount"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="请再次输入密码">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="公司中文名称">
          <el-input v-model="ruleForm.companyNameCn"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="ruleForm.contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input v-model="ruleForm.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="" class="operate-container">
          <el-checkbox v-model="checked" @change="selectPrivacy" label="我已阅知并愿意遵守" name="type"></el-checkbox>
          <a href="#" @click="showPrivacy">《隐私条款》</a>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {

    let checkCompanyAccount = (rule, value, callback) => {
      if (value === 0 || value === '0') {
        return callback(new Error('输入不能为零'));
      } else {
        return callback();
      }
    };

    return {
      module: '注册-填写公司信息',
      activeName: "first",
      companyAccount: "",
      password: "",
      companyNameCn: "",
      contacts: "",
      contactsPhone: "",
      email: "",
      // 表单对象
      ruleForm:
      {
        companyAccount: '',
        password: '',
        companyNameCn: '',
        contacts: '',
        contactsPhone: '',
        email: ''
      },
      // 校验规则
      rules: {
        companyAccount: [
          { required: true, message: '请填写展品刀具数量', trigger: 'blur' },
          { validator: checkCompanyAccount, trigger: 'blur' }
        ]
      }
    };
  },
  //字典
  async created() {
    this.dicCert = await kindo.dictionary.get('exhibitCert'); // 行业认证
  },
  mounted() {

  },
  computed: {
    // 计算属性
    ...mapGetters('registerConstructionCompany', ['registerData'])
  },
  methods: {
    // 转到指定的js里去找
    ...mapActions('registerConstructionCompany', ['registerConstructionCompany'])
    // onSubmit()

  },
  // 监听数据
  watch: {

  }
};
</script>
