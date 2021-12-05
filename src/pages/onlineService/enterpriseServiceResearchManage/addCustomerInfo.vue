/**
 * @file 添加客户信息
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="添加客户信息" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
        label-width="140px" class="demo-ruleForm">
        <el-form-item label="公司名称：" prop="companyName">
          <el-input v-model="ruleForm.companyName" @blur="checkName" placeholder="请输入" clearable maxlength="48"></el-input>
        </el-form-item>
         <el-form-item label="国别地区：" prop="country">
          <el-select v-model="ruleForm.country" placeholder="请选择" clearable>
            <el-option v-for="item in dicContory" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="ruleForm.email" @blur="checkMail" placeholder="请输入" clearable maxlength="48"></el-input>
        </el-form-item>
        <el-form-item label="采购商名：" prop="purchaser">
          <el-input v-model="ruleForm.purchaser" placeholder="请输入" clearable maxlength="48"></el-input>
        </el-form-item>
        <el-form-item label="城市：" prop="city">
          <el-input v-model="ruleForm.city" placeholder="请输入" clearable maxlength="48"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="ruleForm.address" placeholder="请输入" clearable maxlength="48"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="传真：" prop="fax">
          <el-input v-model="ruleForm.fax" placeholder="请输入" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="consentNotice">
          <el-checkbox label="请仔细阅读隐私条款后确认并提交" v-model="conNotice" @change="change"></el-checkbox>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button type="danger" :disabled="disabled" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
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
    //正则邮箱
    let validateMail = (rule, value, callback) => {
      let str = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!str.test(value)) {
        return callback(new Error('请输入正确邮箱格式'));
      } else {
        return callback();
      }
    };
    return {
      // tab
      activeName: "first",
      // form提交loading
      fullscreenLoading: false,
      isExist: false,
      // 国家字典
      dicContory: [],
      // 禁用
      disabled: true,
      // 表单
      ruleForm: {
        // 公司名称
        companyName: "",
        // 国家/地区
        country: "",
        // 邮箱
        email: "",
        // 采购商
        purchaser: "",
        // 城市
        city: "",
        // 地址
        address: "",
        // 电话
        phone: "",
        // 传真
        fax: "",
        // 是否同意
        consentNotice: ""
      },
      conNotice: false,
      rules: {
        companyName: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        country: [
          { required: true, message: "请选择国家/地区", trigger: "change" }
        ],
        email: [
          { required: true, message: "请填写邮箱", trigger: "blur", validator: validateMail }
        ],
        purchaser: [
          { required: true, message: "请填写采购商", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('enterprisesInviteCustomers', ['addcustomer', 'updatecustomer'])
  },
  created() {
    // 由编辑进入时，将前一页面数据带入并赋值
    if (this.$route.query.customerId) {
      this.getCustomerDetailInfo(this.$route.query.customerId).then(res => {
        this.ruleForm = res;
      });
    } else {
      this.ruleForm = {};
    }
    //获取字典数据
    let dicData = JSON.parse(localStorage.getItem('dictData'));
    this.dicContory = dicData.countryDic.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));
  },
  methods: {
    ...mapActions('enterprisesInviteCustomers', ['addCustomerInfo', 'getCustomerEmailInfo', 'updateCustomerInfo', 'getCustomerDetailInfo']),
    checkName() {
      let searchParams = {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "values": [localStorage.getItem("getComPanyId")]
          },
          {
            "name": "companyName",
            "findType": "EQ",
            "joinType": "And",
            "values": [this.ruleForm.companyName]
          }
        ]
      };
      this.getCustomerEmailInfo(searchParams).then(res => {
        if (res === 0) {
          this.isExist = true;
          this.$message({
            type: 'error',
            message: '该公司名称已存在,请重新输入！'
          });
        } else {
          this.isExist = false;
        }
      });
    },
    checkMail() {
      let searchParams = {
        "orderModelField": [
          {
            "orderByField": "",
            "asc": false
          }
        ],
        "customQueryParams": [
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "values": [localStorage.getItem("getComPanyId")]
          },
          {
            "name": "email",
            "findType": "EQ",
            "joinType": "And",
            "values": [this.ruleForm.email]
          }
        ]
      };
      this.getCustomerEmailInfo(searchParams).then(res => {
        if (res === 0) {
          this.isExist = true;
          this.$message({
            type: 'error',
            message: '该邮箱已存在,请重新输入！'
          });
        } else {
          this.isExist = false;
        }
      });
    },
    // checkbox
    change(val) {
      if (val) {
        this.ruleForm.consentNotice = "1";
        this.disabled = false;
      } else {
        this.ruleForm.consentNotice = "0";
        this.disabled = true;
      }
    },
    // 确认
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isExist) {
            this.$message({
              type: 'error',
              message: '该邮箱或公司名称已存在,请重新输入！'
            });
          } else {
            this.fullscreenLoading = true;
            this.changeData();
          }
          // 判断新增或编辑调不同接口
        } else {
          this.$message.error("提交失败");
          return false;
        }
      });
    },
     // 判断新增或编辑调不同接口方法
    changeData() {
      // 编辑
      if (this.$route.query.customerId) {
        let updtateParam = {
          "customerInfo": {
            "companyId": localStorage.getItem("getComPanyId"),
            "companyName": this.ruleForm.companyName,
            "country": this.ruleForm.country,
            "email": this.ruleForm.email,
            "purchaser": this.ruleForm.purchaser,
            "city": this.ruleForm.city,
            "address": this.ruleForm.address,
            "phone": this.ruleForm.phone,
            "fax": this.ruleForm.fax,
            "consentNotice": this.ruleForm.consentNotice,
            "creatorId": this.$store.getters.userInfo.userId,
            "creatorName": this.$store.getters.userInfo.userName,
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName,
            "customerId": this.$route.query.customerId
          }
        };
        // 编辑更新
        this.updateCustomerInfo(updtateParam).then(res => {
          this.fullscreenLoading = false;
          this.$router.push("/maintainCustomerInfo");
        });
      } else {
        // 新增
        let param = {
          "customerInfo": {
            "companyId": localStorage.getItem("getComPanyId"),
            "companyName": this.ruleForm.companyName,
            "country": this.ruleForm.country,
            "email": this.ruleForm.email,
            "purchaser": this.ruleForm.purchaser,
            "city": this.ruleForm.city,
            "address": this.ruleForm.address,
            "phone": this.ruleForm.phone,
            "fax": this.ruleForm.fax,
            "consentNotice": this.ruleForm.consentNotice,
            "creatorId": this.$store.getters.userInfo.userId,
            "creatorName": this.$store.getters.userInfo.userName,
            "modifierId": this.$store.getters.userInfo.userId,
            "modifierName": this.$store.getters.userInfo.userName
          }
        };
        // 新增插入
        this.addCustomerInfo(param).then(res => {
          this.fullscreenLoading = false;
          this.$router.push("/maintainCustomerInfo");
        });
      }
    },
    // 取消
    resetForm() {
      this.$router.back();
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
.el-form-item-btn {
  position: relative;
  left: 25%;
  margin-top: 50px;
}

</style>


