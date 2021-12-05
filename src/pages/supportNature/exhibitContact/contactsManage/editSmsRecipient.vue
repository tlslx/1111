/**
 * @components 编辑短信收件人
 * @date:2019/5/8
 */
<template>
  <!-- 短信收件人 -->
  <div class="page-contain">
    <el-tabs v-model="activeName">
      <el-tab-pane label="编辑短信收件人" name="first">
        <el-form :inline="true" :model="editCroupForm" ref="editCroupForm" :rules="rules">
          <el-form-item label="公司名称" prop="deptName">
            <el-select placeholder="请输入" v-model="editCroupForm.deptName" clearable>
              <el-option v-for="item in this.userDeptInfoData" :key="item.value" :label="item.label"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名" prop="smsRecipient">
            <el-input placeholder="请输入" v-model="editCroupForm.smsRecipient" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="smsPhone">
            <el-input placeholder="请输入" v-model="editCroupForm.smsPhone" clearable></el-input>
          </el-form-item>
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
    return {
      activeName: 'first',
      editCroupForm: { },
      rules: {
        smsPhone: [{ validator: telephone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters('exhibitContact', ['userDeptInfoData'])
  },
  created() {
    this.getUserDeptData();
    this.editCroupForm = this.$route.query.row;
  },
  methods: {
    ...mapActions('exhibitContact', ['postupdateSms', 'getUserDeptData']),
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postupdateSms(this.editCroupForm).then(res => {
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
