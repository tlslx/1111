/**
 * @file 申请海关商品编码对应展区调整（前台）
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="申请海关商品编码对应展区调整" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item style="margin:30px 0px 22px 0px" label="企业名称：" prop="companyName">
          <el-input v-model="ruleForm.companyName" placeholder="" disabled="disabled" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="企业广交会编码：" prop="enterpriseGjhCode">
          <el-input v-model="ruleForm.enterpriseGjhCode" placeholder="" disabled="disabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="交易团：" prop="tradeGroup">
          <el-input v-model="ruleForm.tradeGroup" placeholder="" disabled="disabled" clearable></el-input>
        </el-form-item>
        <el-form-item label="商协会：" prop="businessAssociation">
          <el-input v-model="ruleForm.businessAssociation" placeholder="请输入" :disabled="disabled" clearable maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="海关商品编码：" prop="hsCode">
          <el-input v-model="ruleForm.hsCode" placeholder="请输入" :disabled="disabled" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="对应商品名称：" prop="exhibitsName">
          <el-input v-model="ruleForm.exhibitsName" placeholder="请输入" :disabled="disabled" clearable maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="建议增加展区：" prop="propertyType">
          <el-input v-model="ruleForm.propertyType" placeholder="请输入" :disabled="disabled" clearable maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="建议原因：" prop="addExhibitionArea">
          <el-input :rows="4" type="textarea" v-model="ruleForm.addExhibitionArea" :disabled="disabled" clearable maxlength="100"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btnOne" @click="editForm('ruleForm')" v-if="isOp == '1'" v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
          <el-button class="btnes" @click="submitForm('ruleForm')" v-if="isOp == '2'" v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
          <el-button class="btned" @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        activeName: "first",
        // 表单禁用变量
        disabled: false,
        // 确认按钮只在0的时候不显示{0:查看；1：编辑；2：新增}
        isOp: "0",
        // 确认按钮加载前后是否禁用
        fullscreenLoading: false,
        ruleForm: {
          companyId: this.$store.state.userInfo.companyId, //公司ID （现如今写入固定值）
          adjustId: "", //数据唯一标识ID
          companyName: "",
          enterpriseGjhCode: "",
          tradeGroup: "",
          businessAssociation: "",
          hsCode: "",
          exhibitsName: "",
          propertyType: "",
          addExhibitionArea: ""
        },
        rules: {
          companyName: [
            { required: true, message: "请输入公司名称", trigger: "blur" }
          ],
          enterpriseGjhCode: [
            { required: true, message: "请输入企业广交会编码", trigger: "blur" }
          ],
          tradeGroup: [
            { required: true, message: "请输入交易团名称", trigger: "blur" }
          ],
          businessAssociation: [
            { required: true, message: "请输入", trigger: "blur" }
          ],
          hsCode: [
            { required: true, message: "请输入", trigger: "blur" }
          ],
          propertyType: [
            { required: true, message: "请输入", trigger: "blur" }
          ],
          addExhibitionArea: [
            { required: true, message: "请输入", trigger: "blur" }
          ]
        }
      };
    },
    created() {
      // 确定按钮是否显示
      this.isOp = this.$route.query.isOp;
      // 确定按钮不显示时为查看页面，所有输入框禁用
      if (this.isOp === "0") {
        this.disabled = true;
        let row = this.$route.query.row;
        this.ruleForm.businessAssociation = row.businessAssociation;
        this.ruleForm.hsCode = row.hsCode;
        this.ruleForm.propertyType = row.propertyType;
        this.ruleForm.addExhibitionArea = row.addExhibitionArea;
        this.ruleForm.exhibitsName = row.exhibitsName;
      } else if (this.isOp === "1") {
        let row = this.$route.query.row;
        this.ruleForm.businessAssociation = row.businessAssociation;
        this.ruleForm.hsCode = row.hsCode;
        this.ruleForm.approveStatus = '0';
        this.ruleForm.propertyType = row.propertyType;
        this.ruleForm.addExhibitionArea = row.addExhibitionArea;
        this.ruleForm.exhibitsName = row.exhibitsName;
        this.ruleForm.adjustId = row.adjustId;
      }
    },
    mounted() {
      this.getBasicInfo(this.ruleForm.companyId).then(res => {
        let ruleForMsg = JSON.parse(JSON.stringify(res));
        this.ruleForm.tradeGroup = ruleForMsg.businessDelegationId;
        this.ruleForm.companyName = ruleForMsg.companyName;
        this.ruleForm.enterpriseGjhCode = ruleForMsg.cantonCode;
      });
    },
    computed: {
      ...mapGetters('companyInfomation', ['customsGoods', 'updataCustomsGoods'])
    },
    methods: {
      ...mapActions('companyInfomation', [
        'postSubmitCustomsApply',
        'postEditCustomsApply'
      ]),
      ...mapActions('corpDataManagement', [
        'getBasicInfo'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = this.ruleForm;
            this.postSubmitCustomsApply(param).then(res => {
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 1000);
              this.$message.success("提交成功");
              this.$router.go(-1);
            });
          } else {
            this.$message.error("提交失败");
            return false;
          }
        });
      },
      editForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = this.ruleForm;
            this.postEditCustomsApply(param).then(res => {
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 1000);
              this.$message.success("提交成功");
              this.$router.go(-1);
            });
          } else {
            this.$message.error("提交失败");
            return false;
          }
        });
      },
      resetForm() {
        this.$router.back();
      }
    }
  };
</script>
<style scoped>
.el-form-item {
  width: 600px;
  position: relative;
  left: 20%;
  margin-bottom: 22px;
}
.el-form-item-btn {
  position: relative;
  left: 30%;
  margin-top: 50px;
}
.btnOne, .btnes {
  background-color: red;
  width: 120px;
  height: 40px;
  color: white;
}
.btned {
  background-color: white;
  width: 120px;
  height: 40px;
}
</style>


