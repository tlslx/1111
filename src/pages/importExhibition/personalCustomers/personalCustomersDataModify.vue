<template>
  <el-page class="personalCustomerDataModify">
    <template slot="header">
      <el-tabs>
        <el-tab-pane label="个人信息 > 资料修改"></el-tab-pane>
      </el-tabs>
    </template>
    <template slot="body" slot-scope="scope">
      <div class="top-content">
        <el-form ref="form" :model="form">
          <el-row type="flex" style="font-size: 18px;text-align: left;font-weight: bold;">个人重要信息</el-row>
          <el-row type="flex" justify="center" class="top-one">
            <el-col label-width="150px" :span="8">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="form.name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col label-width="150px" :span="8">
              <el-form-item label="身份证号码：" prop="idCardNo">
                <el-input v-model="form.idCardNo" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            注意：以上信息不能自行修改，如有必要修改，请点击《
            <a @click="linkView" href="###">重要信息修改申请</a>》，提交后等待或通知交易团审核。
          </el-row>

          <el-row
            type="flex"
            style="font-size: 18px;text-align: left;font-weight: bold;margin-top:30px;"
          >个人基本信息</el-row>

          <el-row type="flex" justify="center" class="top-two">
            <el-col :span="8">
              <el-form-item label="性别：" prop="sex">
                <el-radio v-model="form.sex" label="1" name="radios">男</el-radio>
                <el-radio v-model="form.sex" label="0" name="radios">女</el-radio>
              </el-form-item>
            </el-col>
            <el-form-col label="手机号：" prop="phonenumber" :span="8">
              <el-input v-model="form.phonenumber"></el-input>
            </el-form-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="邮箱：" prop="mail">
                <el-input v-model="form.mail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="验证码：" prop="verificationCode">
                <el-input placeholder="441000"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="职位：" prop="position">
                <el-input v-model="form.position"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="固定电话：" prop="fixedPhone">
                <el-input v-model="form.fixedPhone" placeholder="44-5201314"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="所在部门：" prop="department">
                <el-input v-model="form.department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>

          <el-row
            type="flex"
            style="font-size: 18px;text-align: left;font-weight: bold;margin-top:30px;"
          >个人办证信息</el-row>

          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="身份证正面图：" prop="labId" :span="8">
              <el-upload
                readonly="true"
                class="avatar-uploader"
                action="/api/infoIfiEnterpriseUser/updateFile"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
            <el-form-col label-width="150px" label="身份证反面图：" prop="labId" :span="8">
              <el-upload
                readonly="true"
                class="avatar-uploader"
                action="/api/infoIfiEnterpriseUser/updateFile"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-form-col label-width="150px" label="头像：" prop="labId" :span="8">
              <el-upload
                readonly="true"
                class="avatar-uploader"
                action="/api/infoIfiEnterpriseUser/updateFile"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
            <el-form-col label-width="150px" label="名片：" prop="labId" :span="8">
              <el-upload
                readonly="true"
                class="avatar-uploader"
                action="/api/infoIfiEnterpriseUser/updateFile"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-col>
          </el-row>

          <el-row type="flex" justify="center" class="top-end">
            <el-col :span="8">
              <el-button type="danger" @click="submitForm">修改</el-button>
              <el-button>取消</el-button>
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
      form: {
        name: "",
        sex: "",
        idCardNo: "",
        phonenumber: "",
        fixedPhone: "",
        mail: "",
        position: "",
        department: ""
      }
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData() {
      var _this = this;
      this.$http
        .post("/api/infoIfiPersonUser/getPersonalInformationById", {
          json: "gz00005"
        })
        .then(function(result) {
          _this.form = result.data;
          _this.form.sex = result.data.sex + "";
        });
    },
    linkView() {
      this.$router.push({
        path: "/personalCustomersImportantData"
      });
    },
    submitForm() {
      this.$http
        .postJson("/api/infoIfiPersonUser/updataPersonalInformation", this.form)
        .then(function(result) {});
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
.top-one {
  margin-top: 0.5cm;
}
.top-two {
  margin-top: 0.5cm;
}
.top-end {
  margin-top: 0.5cm;
}
</style>
