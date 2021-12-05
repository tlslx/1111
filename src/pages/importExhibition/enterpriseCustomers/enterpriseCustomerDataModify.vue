<template>
  <el-page class="enterpriseCustomerDataModify">
    <template slot="body">
      <div class="top-content">
        <el-form ref="form" :model="form" label-width="150px">
          <el-row type="flex" style="font-size: 18px;text-align: left;font-weight: bold;">企业重要信息</el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="企业名称" prop="labId" :span="8">
              <el-input v-model="form.enterpriseName" placeholder="C000001" readonly></el-input>
            </el-form-col>
            <el-form-col label-width="150px" label="统一社会信用代码" prop="labId" :span="8">
              <el-input v-model="form.unifiedSocialCreditCode" placeholder="C000001" readonly></el-input>
            </el-form-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="联系人姓名" prop="labId" :span="8">
              <el-input v-model="form.contactName" placeholder="C000001" readonly></el-input>
            </el-form-col>
            <el-form-col label-width="150px" label="联系人身份证号码" prop="labId" :span="8">
              <el-input v-model="form.contactIdNumber" placeholder="C000001" readonly></el-input>
            </el-form-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="状态" prop="labId" :span="8">
              <el-select v-model="form.address">
                <el-option
                  v-for="item in amountUnitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-col>
            <el-form-col :span="8"></el-form-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="营业执照复印件" prop="labId" :span="8">
              <el-upload class="avatar-uploader" action="/api/infoIfiEnterpriseUser/updateFile">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
            <el-form-col label-width="150px" label="联系人身份证扫描件" prop="labId" :span="8">
              <el-upload class="avatar-uploader" action="/api/infoIfiEnterpriseUser/updateFile">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="营业执照复印件" prop="labId" :span="8">
              <el-upload class="avatar-uploader" action="/api/infoIfiEnterpriseUser/updateFile">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
            <el-form-col :span="8"></el-form-col>
          </el-row>

          <el-row type="flex" justify="center">
            注意：以上信息不能自行修改，如有必要修改，请点击《
            <a @click="linkView" href="###">重要信息修改申请</a>》，提交后等待或通知交易团审核。
          </el-row>
          <el-row
            type="flex"
            style="font-size: 18px;text-align: left;font-weight: bold;margin-top:30px;"
          >企业重要信息</el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="企业编号" prop="labId" :span="8">
              <el-input v-model="form.enterpriseId" placeholder="C000001" readonly></el-input>
            </el-form-col>
            <el-form-col label-width="150px" label="地区" prop="labId" :span="8">
              <el-input v-model="form.address" placeholder="C000001"></el-input>
            </el-form-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="网址" prop="labId" :span="8">
              <el-input v-model="form.homesite" placeholder="C000001"></el-input>
            </el-form-col>
            <el-form-col label-width="150px" label="单位类型" prop="labId" :span="8">
              <el-input v-model="form.enterpriseId" placeholder="C000001"></el-input>
            </el-form-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="营业执照有效期" prop="labId" :span="8">
              <el-input v-model="form.businessLicenseValidity" placeholder="C000001"></el-input>
            </el-form-col>
            <el-form-col label-width="150px" :span="8"></el-form-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-form-col :span="10">
              <el-button type="primary" @click="submitForm">修改</el-button>
              <el-button>取消</el-button>
            </el-form-col>
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
        enterpriseId: "",
        enterpriseName: "",
        contactName: "",
        unifiedSocialCreditCode: "",
        contactIdNumber: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        age: "",
        checkPass: "",
        pass: "",
        homesite: "",
        address: 0,
        businessLicenseValidity: 0
      },
      json: "1",
      imageUrl: "",
      amountUnitOptions: [
        { value: 0, label: "待审核" },
        { value: 1, label: "已审核" }
      ]
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    linkView() {
      this.$router.push({
        path: "/enterpriseCustomerImportantData",
        query: this.form
      });
    },
    submitForm() {
      var _this = this;
      //然后通过下面的方式把内容通过axios来传到后台
      //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      this.$http
        .post(
          "/api/infoIfiEnterpriseUser/updateEnterpriseInformation",
          this.form
        )
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
    },
    loadData() {
      let _this = this;
      this.$http
        .post("/api/infoIfiEnterpriseUser/getEnterpriseInformationById", {
          enterpriseId: "C000001"
        })
        .then(function(result) {
          _this.form = result.data;
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
