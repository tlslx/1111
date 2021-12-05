/**
 * @file激活VIP企业
 */
<style scoped>
  .active-vip-enterprise {
    margin: auto;
    margin-top: 70px;
    width: 460px;
  }
  .active-vip-enterprise-item {
    margin-bottom: 22px;
  }
</style>

<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="激活VIP企业" name="first">
      <!-- form表单 -->
      <el-form class="active-vip-enterprise" :rules="rules" :model="formValidateForm" ref="formValidateForm" label-width="180px" label-position="right">
        <el-form-item class="active-vip-enterprise-item" label="VIP业务联系人：" prop="contactMan">
          <el-input v-model="formValidateForm.contactMan" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item class="active-vip-enterprise-item" label="职务" prop="post">
          <el-select v-model="formValidateForm.post" placeholder="请选择">
            <el-option
              v-for="item in dictionary.post"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="active-vip-enterprise-item" label="联系电话：" prop="tel">
          <el-input v-model="formValidateForm.tel" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item class="active-vip-enterprise-item" label="手机：" prop="phone">
          <el-input v-model="formValidateForm.phone" placeholder="请输入内容" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item class="active-vip-enterprise-item" label="E-mail：" prop="email">
          <el-input v-model="formValidateForm.email" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item class="active-vip-enterprise-item" label="联系地址：" prop="contactAddress">
          <el-input v-model="formValidateForm.contactAddress" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submit">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      formValidateForm: {
        contactMan: '',
        post: '',
        tel: '',
        phone: '',
        email: '',
        contactAddress: ''
      },
      rules: {
        contactMan: [
          { required: true, message: '请输入VIP业务联系人', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请选择职务', trigger: 'change' }
        ],
        tel: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入E-mail', trigger: 'blur' }
        ],
        contactAddress: [
          { required: true, message: '请输入联系地址', trigger: 'blur' }
        ]
      },
      formList: [
        {
          "prop": "contactMan",
          "label": "VIP业务联系人",
          "value": "",
          "type": "input"
        },
        {
          "prop": "post",
          "label": "职务",
          "value": "",
          "type": "select"
        },
        {
          "prop": "tel",
          "label": "联系电话",
          "value": "",
          "type": "input"
        },
        {
          "prop": "phone",
          "label": "手机",
          "value": "",
          "type": "input"
        },
        {
          "prop": "email",
          "label": "E-mail",
          "value": "",
          "type": "input"
        },
        {
          "prop": "contactAddress",
          "label": "联系地址",
          "value": "",
          "type": "textarea"
        }
      ],
      dictionary: {
        "post": [
          {
            "label": "市场部经理",
            "code": "01",
            "value": "01"
          },
          {
            "label": "销售部经理",
            "code": "02",
            "value": "02"
          },
          {
            "label": "员工",
            "code": "03",
            "value": "03"
          }
        ]
      }
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters('vipEnterCertificate', ['addVipEnterInfo'])
  },
  methods: {
    ...mapActions('vipEnterCertificate', ['addVIPEnterCertificate']),
    handleClick() {
    },
    submit() {
      let _this = this;
      this.$refs['formValidateForm'].validate((valid) => {
        if (valid) {
          _this.addVIPEnterCertificate(_this.formValidateForm).then(res => {
            _this.$message({
              type: 'success',
              message: '激活成功'
            });
          }).catch(e => {
            _this.$message.error('失败');
          });
        } else {
          this.$message.error('您输入的信息有误');
        }
      });

    },
    cancel() {

    }
  }
};
</script>

