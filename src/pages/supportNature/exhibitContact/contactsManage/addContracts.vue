/**
 * @components 新增第三方联系人
 * @date:2019/5/8
 */
<template>
  <!-- 新增联系人 -->
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="新增第三方联系人" name="first">
        <el-form :inline="true" :model="addCroupForm" ref="addCroupForm" :rules="rules">
          <el-form-item label="单位全称" prop="thirdPartyName">
            <el-select placeholder="请输入" v-model="addCroupForm.thirdPartyName">
              <el-option v-for="item in this.userDeptInfoData" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政职务" prop="thirdPartyPosition">
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyPosition" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="thirdPartyContact">
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyContact" clearable></el-input>
          </el-form-item>
          <el-form-item label="固定电话" prop="thirdPartyTelephonNumber">
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyTelephonNumberA" maxlength="4"
            style="width: 60px"></el-input> -
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyTelephonNumberB" maxlength="8"
            style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="thirdPartyCellphoneNumber">
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyCellphoneNumber" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信号(选填)" prop="thirdPartyWeichat">
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyWeichat" clearable></el-input>
          </el-form-item>
          <el-form-item label="QQ号（选填）" prop="thirdPartyQq">
            <el-input placeholder="请输入" v-model="addCroupForm.thirdPartyQq" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" @click="submitAdd('addCroupForm')">确定</el-button>
        <el-button type="info" size="medium" @click="cancelAdd">取消</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    let telephone = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.telephone;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入正确格式的电话号码"));
      }
      return callback();
    };
    return {
      activeName: 'first',
      addCroupForm: {
        thirdPartyName: '', deptId: '', // userDeptName: '',
        thirdPartyTelephonNumberA: '', thirdPartyTelephonNumberB: '', thirdPartyContact: '', thirdPartyPosition: '',
        thirdPartyCellphoneNumber: '', thirdPartyWeichat: '', thirdPartyQq: ''
      },
      rules: {
        thirdPartyCellphoneNumber: [{ validator: telephone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['userDeptInfoData']),
    addParams() {
      let obj = this.addCroupForm;
      obj.thirdPartyTelephonNumber = obj.thirdPartyTelephonNumberA + '-' + obj.thirdPartyTelephonNumberB;
      return obj;
    }
  },
  created() {
    this.getUserDeptData().then(() => {
      if (this.userDeptInfoData.length > 0) {
        this.addCroupForm.thirdPartyName = this.userDeptInfoData[0].label;
        this.addCroupForm.deptId = this.userDeptInfoData[0].value;
      }
    });
  },
  methods: {
    ...mapActions('exhibitContact', ['postAddContracts', 'getUserDeptData']),
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postAddContracts(this.addParams).then(res => {
            this.$message.success('新增成功');
            this.clearParams();
            // this.$router.push({ path: 'businessContacts' });
            this.$router.go(-1);
          });
        } else {
          this.$message.error('请将表单写完整');
        }
      });
    },
    cancelAdd() {
      this.clearParams();
      // this.$router.push({ path: 'businessContacts' });
      this.$router.go(-1);
    },
    clearParams() {
      for (const key in this.addCroupForm) {
        this.addCroupForm[key] = '';
        this.addCroupForm.thirdPartyName = this.userDeptInfoData[0].label;
        this.addCroupForm.deptId = this.userDeptInfoData[0].value;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.page-contain {
  padding-top: 10px;
}
</style>
