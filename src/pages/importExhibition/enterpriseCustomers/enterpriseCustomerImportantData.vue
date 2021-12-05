<template>
  <el-page class="enterpriseCustomerDataModify">
    <template slot="body">
      <div class="top-content">
        <el-form ref="form" :model="form" label-width="150px">
          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="企业名称" prop="enterpriseId">
                <el-input v-model="form.enterpriseName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="统一社会信用代码" prop="enterpriseId">
                <el-input v-model="form.unifiedSocialCreditCode" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="营业执照复印件" prop="enterpriseId">
                <el-upload
                  class="avatar-uploader"
                  action="/api/infoIfiEnterpriseUser/updateFile"
                  :show-file-list="true"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="联系人姓名" prop="enterpriseId">
                <el-input v-model="form.contactName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="联系人身份证号码" prop="enterpriseId">
                <el-input v-model="form.contactIdNumber" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" :offset="4">
              <el-form-item label="联系人身份证扫描件" prop="enterpriseId">
                <el-upload
                  class="avatar-uploader"
                  action="/api/infoIfiEnterpriseUser/updateFile"
                  :show-file-list="true"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item prop="enterpriseId" label-width="100px">
                <el-upload
                  class="avatar-uploader"
                  action="/api/infoIfiEnterpriseUser/updateFile"
                  :show-file-list="true"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="4">
              <el-form-item label="联系人名片" prop="enterpriseId">
                <el-upload
                  class="avatar-uploader"
                  action="/api/infoIfiEnterpriseUser/updateFile"
                  :show-file-list="true"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10" :offset="4" label-width="1px">
              <el-form-item prop="enterpriseId">
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-col>
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
      imageUrl: "",
      enterpriseId: "",
      form: {
        enterpriseName: "",
        contactName: "",
        unifiedSocialCreditCode: "",
        contactIdNumber: "",
        businessLicenseCopy: "",
        contactIdScanned: "",
        contactBusinessCard: ""
      },
      oldForm: {}
    };
  },
  beforeMount: function() {
    this.form.enterpriseName = this.$route.query.enterpriseName;
    this.form.contactName = this.$route.query.contactName;
    this.form.unifiedSocialCreditCode = this.$route.query.unifiedSocialCreditCode;
    this.form.contactIdNumber = this.$route.query.contactIdNumber;
    this.form.businessLicenseCopy = this.$route.query.businessLicenseCopy;
    this.form.contactIdScanned = this.$route.query.contactIdScanned;
    this.form.contactBusinessCard = this.$route.query.contactBusinessCard;
    this.oldForm = JSON.stringify(this.form);
    this.enterpriseId = this.$route.query.enterpriseId;
  },
  methods: {
    submitForm() {
      var _this = this;
      if (
        JSON.stringify(this.form) === this.oldForm
      ) {
        return;
      }
      this.$http
        .post("/api/infoIfiModifyRecord/addCustomerModifyRecord", {
          form: JSON.stringify(this.form),
          oldForm: JSON.stringify(this.oldForm),
          enterpriseId: JSON.stringify(this.enterpriseId)
        })
        .then(function(result) {
          if (result.flag === "1") {
            _this.$message({
              showClose: true,
              message: result.message,
              type: "success"
            });
          } else {
            _this.$message({
              showClose: true,
              message: result.message,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.enterpriseCustomerDataModify {
  overflow-y: auto;
}
.top-content {
  width: 80%;
  margin: 0 auto;
}
.main-content {
  width: 80%;
  margin: 0 auto;
}
</style>
