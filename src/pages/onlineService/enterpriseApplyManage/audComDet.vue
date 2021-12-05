/**
 * @file 审核公司资料明细
 */
<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="审核公司资料明细" name="first" @tab-click="handleClick">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm">
        <el-form-item label="企业名称：" prop="companyName">
          {{ ruleForm.companyName }}
        </el-form-item>
        <el-form-item label="修改信息名称：" prop="colname">
          {{ ruleForm.colname }}
        </el-form-item>
        <el-form-item label="修改前：" prop="oldContent">
          {{ ruleForm.oldContent }}
        </el-form-item>
        <el-form-item label="修改后:" prop="newContent">
          {{ ruleForm.newContent }}
        </el-form-item>
        <el-form-item label="附件：" prop="enclosure">
          <el-button type="warning">下载附件</el-button>
        </el-form-item>
        <el-form-item label="审核意见:" prop="auditOpinion">
          <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="auditOpinion"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn" type="primary" @click="submitForm('ruleForm')">通过</el-button>
          <el-button class="btn" @click="resetForm('ruleForm')">不通过</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      ruleForm: {
        auditOpinion: ''
      },
      rules: {
        auditOpinion: [
          { required: true, message: "", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {

    },
    submitForm() {},
    resetForm() {}
  }
};
</script>
<style scoped>
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.cb_confirm{
  position: relative;
  left: 28%;
  margin-top: 20px;
}
.btn {
  width: 120px;
  height: 40px;
}
</style>


