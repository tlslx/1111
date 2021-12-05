/**
 * @components 新增短信收件人
 * @date:2019/5/8
 */
<template>
  <!-- 短信收件人 -->
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="新增短信收件人" name="first">
        <el-form :inline="true" :model="addCroupForm" ref="addCroupForm" :rules="rules">
          <el-form-item label="单位全称" prop="deptName">
            <el-select placeholder="请输入" v-model="addCroupForm.deptName" clearable>
              <el-option v-for="item in this.userDeptInfoData" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="smsRecipient">
            <el-input placeholder="请输入" v-model="addCroupForm.smsRecipient" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="smsPhone">
            <el-input placeholder="请输入" v-model="addCroupForm.smsPhone" clearable></el-input>
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
      addCroupForm: { smsRecipient: '', smsPhone: '', deptName: '', deptId: '' },
      rules: {
        smsPhone: [{ validator: telephone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['userDeptInfoData'])
  },
  created() {
    this.getUserDeptData().then(() => {
      if (this.userDeptInfoData.length > 0) {
        this.addCroupForm.deptName = this.userDeptInfoData[0].label;
        this.addCroupForm.deptId = this.userDeptInfoData[0].value;
      }
    });
  },
  methods: {
    ...mapActions('exhibitContact', ['postaddSms', 'getUserDeptData']),
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postaddSms(this.addCroupForm).then(res => {
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
        this.addCroupForm.deptName = this.userDeptInfoData[0].label;
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
