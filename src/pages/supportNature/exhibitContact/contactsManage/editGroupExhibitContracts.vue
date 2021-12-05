/**
 * @components 编辑组展单位联系人
 * @date:2019/5/8
 */
<template>
  <!-- 新增组展单位联系人 -->
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="新增组展单位联系人" name="first">
        <el-form :inline="true" :model="editCroupForm" ref="editCroupForm" :rules="rules">
          <div>
            <el-form-item label="单位全称" prop="workUnitName">
              <el-select placeholder="请输入" v-model="editCroupForm.workUnitName">
                <el-option v-for="item in this.userDeptInfoData" :key="item.value" :label="item.label"
                  :value="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有无委托" prop="">
              <!-- <el-select placeholder="请选择" clearable>
                <el-option label="有" value="0"></el-option>
                <el-option label="无" value="1"></el-option>
              </el-select> -->
            </el-form-item>
          </div>
          <div>
            <span>处级联系人</span><hr>
            <el-form-item label="姓名" prop="departmentalContact">
              <el-input placeholder="请输入" v-model="editCroupForm.departmentalContact" clearable></el-input>
            </el-form-item>
            <el-form-item label="行政职务" prop="departmentalPosition">
              <el-input placeholder="请输入" v-model="editCroupForm.departmentalPosition" clearable></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="departmentalFixedTelephone">
              <el-input placeholder="请输入" v-model="editCroupForm.departAreaNum" maxlength="4" style="width: 60px"></el-input> -
              <el-input placeholder="请输入" v-model="editCroupForm.departTelNum" maxlength="8" style="width: 180px"></el-input>
            </el-form-item>
          </div>
          <div>
            <span>第一联系人</span><hr>
            <el-form-item label="姓名" prop="firstContact">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContact" clearable></el-input>
            </el-form-item>
            <el-form-item label="行政职务" prop="firstContactPosition">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactPosition" clearable></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="firstContactFixedTelephone">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactFixedTelephoneA" maxlength="4"
                style="width: 60px"></el-input> -
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactFixedTelephoneB" maxlength="8"
                style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="firstContactPhoneNumber">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactPhoneNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="传真号码" prop="firstContactFaxNumber">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactFaxNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱地址" prop="firstContactMailingAddress">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactMailingAddress" clearable></el-input>
            </el-form-item>
            <el-form-item label="QQ号（选填）" prop="firstContactQq">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactQq" clearable></el-input>
            </el-form-item>
            <el-form-item label="微信号（选填）" prop="firstContactWechat">
              <el-input placeholder="请输入" v-model="editCroupForm.firstContactWechat" clearable></el-input>
            </el-form-item>
          </div>
          <div>
            <span>第二联系人</span><hr>
            <div>（商务主管部门人员，选填）</div>
            <el-form-item label="姓名" prop="secondContact">
              <el-input placeholder="请输入" v-model="editCroupForm.secondContact" clearable></el-input>
            </el-form-item>
            <el-form-item label="行政职务" prop="secondContactPosition">
              <el-input placeholder="请输入" v-model="editCroupForm.secondContactPosition" clearable></el-input>
            </el-form-item>
            <el-form-item label="固定电话" prop="secondContactFixedTelephone">
              <el-input placeholder="请输入" v-model="editCroupForm.secondContactFixedTelephoneA" maxlength="4"
              style="width: 60px"></el-input> -
              <el-input placeholder="请输入" v-model="editCroupForm.secondContactFixedTelephoneB" maxlength="8"
              style="width: 180px"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="secondContactPhoneNumber">
              <el-input placeholder="请输入" v-model="editCroupForm.secondContactPhoneNumber" clearable></el-input>
            </el-form-item>
          </div>
        </el-form>
        <el-button type="primary" size="medium" @click="submitEdit('editCroupForm')">确定</el-button>
        <el-button type="info" size="medium" @click="cancelEdit">取消</el-button>
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
    let email = (rule, value, callback) => {
      let phoneTest = this.$store.state.common.CHECK_CONST_DATA.email;
      if (!phoneTest.test(value)) {
        return callback(new Error("请输入正确格式的邮箱"));
      }
      return callback();
    };
    return {
      activeName: 'first',
      editCroupForm: {
        workUnitName: '', departmentalContact: '', departmentalPosition: '', departAreaNum: '',
        departTelNum: '', firstContact: '', firstContactPosition: '', firstContactFixedTelephoneA: '',
        firstContactFixedTelephoneB: '', firstContactPhoneNumber: '', firstContactFaxNumber: '',
        firstContactMailingAddress: '', firstContactQq: '', firstContactWechat: '',
        secondContact: '', secondContactPosition: '', secondContactFixedTelephoneA: '',
        secondContactFixedTelephoneB: '', secondContactPhoneNumber: ''
      },
      rules: {
        // { required: true, message: '请输入', trigger: 'blur' },
        firstContactPhoneNumber: [{ validator: telephone, trigger: "blur" }],
        secondContactPhoneNumber: [{ validator: telephone, trigger: "blur" }],
        firstContactMailingAddress: [{ validator: email, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['userDeptInfoData']),
    editParams() {
      let obj = this.editCroupForm;
      obj.departmentalFixedTelephone = obj.departAreaNum + '-' + obj.departTelNum;
      delete obj.departAreaNum;
      delete obj.departTelNum;
      obj.firstContactFixedTelephone = obj.firstContactFixedTelephoneA + '-' + obj.firstContactFixedTelephoneB;
      delete obj.firstContactFixedTelephoneA;
      delete obj.firstContactFixedTelephoneB;
      obj.secondContactFixedTelephone = obj.secondContactFixedTelephoneA + '-' + obj.secondContactFixedTelephoneB;
      delete obj.secondContactFixedTelephoneA;
      delete obj.secondContactFixedTelephoneB;
      return obj;
    }
  },
  created() {
    this.getUserDeptData();
    this.editCroupForm = this.$route.query.row;
    this.editCroupForm.firstContactFixedTelephoneA = this.editCroupForm.firstContactFixedTelephone.split('-')[0];
    this.editCroupForm.firstContactFixedTelephoneB = this.editCroupForm.firstContactFixedTelephone.split('-')[1];
    this.editCroupForm.secondContactFixedTelephoneA = this.editCroupForm.secondContactFixedTelephone.split('-')[0];
    this.editCroupForm.secondContactFixedTelephoneB = this.editCroupForm.secondContactFixedTelephone.split('-')[1];
  },
  methods: {
    ...mapActions('exhibitContact', ['postEditGroupExhibitContracts', 'getUserDeptData']),
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postEditGroupExhibitContracts(this.editParams).then(res => {
            this.$message.success('编辑成功');
            this.clearParams();
            // this.$router.push({ path: 'businessContacts' });
            this.$router.go(-1);
          });
        } else {
          this.$message.error('请将表单写完整');
        }
      });
    },
    cancelEdit() {
      this.$message.success('已取消编辑');
      this.clearParams();
      // this.$router.push({ path: 'businessContacts' });
      this.$router.go(-1);
    },
    clearParams() {
      for (const key in this.editCroupForm) {
        this.editCroupForm[key] = '';
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
