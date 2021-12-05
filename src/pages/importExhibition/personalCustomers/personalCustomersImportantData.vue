<template>
  <el-page class="personanImportData">
    <template slot="header">
      <el-tabs>
        <el-tab-pane label="个人信息 > 资料修改 > 个人重要信息申请"></el-tab-pane>
      </el-tabs>
    </template>
    <template slot="body">
      <div class="top-content">
        <el-form ref="form" :model="form">
          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="新的姓名" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="新的身份证" prop="idCardNo">
                <el-input v-model="form.idCardNo"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center" class="top-one">
            <el-button type="danger" @click="submitForm">确定</el-button>
            <el-button>取消</el-button>
          </el-row>
        </el-form>
      </div>
    </template>
  </el-page>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        idCardNo: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$confirm(
        "姓名和身份证号码需与身份证件完全一致，如需修改，请提交重要信息修改申请，经大会审核后生效，确定是否修改?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "已提交申请!"
          });
          this.$http
            .post("/api/infoIfiModifyRecord/addCustomerModifyRecord", this.form)
            .then(function (result) { });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style scoped>
.personanImportData {
  height: 400px;
}
.top-content {
  width: 80%;
  margin: 0 auto;
  margin-top: 1cm;
}
.top-one {
  margin-top: 0.5cm;
}
</style>
