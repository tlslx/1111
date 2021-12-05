
/**
* @file 申请开具增值税发票信息
* @author:fanglinshuai
* @date:2019/3/18
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="申请开具增值税发票信息" name="first">
      <span class="remarke">是否开具增值税发票需经主办方中国对外贸易中心财务部门审核企业相关汇款信息后确认。</span>
      <el-form :rules="formRules" :model="registForm" ref="registForm" label-width="120px">
        <el-form-item label="发票类型:" class="inline-item" prop="invoiceType" size="small" >
          <el-input v-model="registForm.invoiceType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="公司编号:" class="inline-item" size="small" prop="companyNo">
          <el-input v-model="registForm.companyNo"></el-input>
        </el-form-item>
        <el-form-item label="公司名称:" class="inline-item" size="small" prop="companyName" >
          <el-input v-model="registForm.companyName"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号:" class="inline-item" size="small" prop="taxpayerId">
         <el-input v-model="registForm.taxpayerId"></el-input>
        </el-form-item>
        <el-form-item label="注册地址:" class="inline-item" size="small" prop="regAddress" >
          <el-input v-model="registForm.regAddress"></el-input>
        </el-form-item>
        <el-form-item label="电话:" class="inline-item" size="small" prop="telephone" >
          <el-input v-model="registForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="开户银行:" class="inline-item" size="small" prop="openBank" >
          <el-select v-model="registForm.openBank" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户账号:" class="inline-item" size="small" prop="openAccount" >
          <el-input v-model="registForm.openAccount"></el-input>
        </el-form-item>
        <el-form-item label="增值税率:" class="inline-item" size="small" prop="rate" >
          <el-input v-model="registForm.rate"></el-input>
        </el-form-item>
        <el-form-item  class="inline-item" size="small" >
          <el-button type="danger" @click="submitForm('registForm')">提交</el-button>
          <el-button type="info" class="submitBtn" @click="cancelForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapActions } from "vuex";
export default {
  mixins: [tableMixIn, listPageBase],
  data() {
    let checkLength = (rule, value, callback) => {
      let errors = [];
      if (value.length > rule.length) {
        errors.push(new Error("长度超过限制" + rule.length));
      }
      callback(errors);
    };
    return {
      activeName: "first",
      options: [
        {
          label: "123",
          value: "123"
        },
        {
          label: "456",
          value: "456"
        }

      ],
      registForm: {
        rate: "",
        openBank: "",
        invoiceType: "增值税",
        companyNo: "",
        companyName: "",
        taxpayerId: "",
        openAccount: "",
        regAddress: "",
        telephone: ""
      },
      formRules: {
        invoiceType: [{ required: true, message: "发票类型", trigger: "blur" }],
        companyNo: [{ required: true, message: "公司编号不能为空", trigger: "blur" },
        { length: "50", validator: checkLength }],
        companyName: [{ required: true, message: "公司名称不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }],
        taxpayerId: [{ required: true, message: "纳税人识别号不能为空", trigger: "blur" }],
        regAddress: [{ required: true, message: "注册地址不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        telephone: [{ required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的手机号"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        openBank: [{ required: true, message: "开户银行不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        openAccount: [{ required: true, message: "开户账号不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        rate: [{ required: true, message: "增值税率不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }]
      }
    };
  },
  mounted() {
    if (this.$route.query.data) {
      let addedValueTax = this.$route.query.data;

      this.registForm.rate = addedValueTax.rate;
      this.registForm.invoiceType = addedValueTax.invoiceType;
      this.registForm.openBank = addedValueTax.openBank;
      this.registForm.invoiceType = addedValueTax.invoiceType;
      this.registForm.companyNo = addedValueTax.companyNo;
      this.registForm.companyName = addedValueTax.companyName;
      this.registForm.taxpayerId = addedValueTax.taxpayerId;
      this.registForm.openAccount = addedValueTax.openAccount;
      this.registForm.regAddress = addedValueTax.regAddress;
      this.registForm.telephone = addedValueTax.telephone;
    }
  },
  methods: {
    ...mapActions('invoiceList', ['updateAddedInvoiceInfo']),   // 更新增值税发票信息

    // 清空表单信息
    resetForm(registForm) {
      this.$refs[registForm].resetFields();
    },
    // 注册提交
    submitForm(registForm) {
      this.$refs[registForm].validate(valid => {
        if (valid) {
          this.updateAddedInvoiceInfo(this.registForm).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            });

            // 清除上一次的新增记录
            let key;
            for (key in this.registForm) {
              this.registForm[key] = '';
            }
            this.$router.push('/invoiceList');

          }).catch(e => {
            this.$message.error(e.message);
          });
        }
      });
    },
    cancelForm() { // 返回付款情况列表
      this.$router.push({ path: '/invoiceList' });
    }
  }
};
</script>
<style scoped>
.searchBtn{
  margin-left: 30px;
  width: 80px;

}
.submitBtn{
  margin-left: 50px
}
.inline-item{
  display: inline-block;
  width: 23%;
  margin-left: 3%;
  margin-right: 60%;
  margin-top: 15px;
}
.p-indent{
  text-indent:2em;
}
.total{
  font-family: 'Arial Negreta', 'Arial';
  font-weight: 700;
  text-align: center;
  font-size: 18px;
  line-height: 28px;
}
.sub-style{
margin-left: 120px;
}
.remarke{
  margin-left: 40px;
  color: red;
}
.showCase{
  color: rgb(22, 155, 213);
  cursor:pointer;
}
.li-style{
list-style:none;
cursor:pointer;
}
.name-select{
  border: 1px solid rgba(228, 228, 228, 1);

}
</style>
