<template>
  <el-dialog :title="'合作机构' + this.formId" :close-on-click-modal="false" :visible.sync="dialogVisible" width="70%">
    <kindo-box>
      <el-form ref="registerForm" inline-message :rules="rules" :model="registerForm" label-width="150px" label-position="right" :disabled="formView.isFormView">
        <el-form-item label="类型：" prop="agencyTypeId">
          <el-radio-group v-model="registerForm.agencyTypeId" :disabled="formView.isEdit" @change="agencyTypeChange">
            <el-radio v-for="item in source.typeOptions" :key="item.value" :label="item.label"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合作机构名称：" prop="cooperationAgencyName">
          <el-input v-model="registerForm.cooperationAgencyName" @change="agencyNameChange" :disabled="formView.isEdit" placeholder="请输入" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="合作机构编码：" prop="cooperationAgencyCode" v-if="isShowAgencyCode">
          <el-input v-model="registerForm.cooperationAgencyCode" :disabled="true" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="类别：" prop="agencyCategoryId">
          <el-radio-group v-model="registerForm.agencyCategoryId">
            <el-radio v-for="item in source.categoryOptions" :key="item.value" :label="item.label"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="机构公章备案：" prop="officialSealPicture" ref="uploadSeal">
          <el-upload ref="officialSealPicture" :action="api.uploadFile" :headers="{ 'Token': store.getters.token }" :show-file-list="false" :on-success="handleSealPictureSuccess" :before-upload="beforeUpload" v-if="!formView.isEdit&&!formView.isFormView" accept="image/png,image/jpg,image/jpeg" class="avatar-uploader">
            <img v-if="imageUrl.officialSealPictureUrl" :src="imageUrl.officialSealPictureUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span v-if="!formView.isEdit&&!formView.isFormView">*格式为JPG，大小不超过500K</span>
          <img :src="api.getFile + registerForm.officialSealPicture" width="100" height="70" v-else>
        </el-form-item>
        <el-form-item label="机构承诺书：" prop="undertakingLetter" ref="uploadLetter">
          <el-upload class="avatar-uploader" ref="undertakingLetter" :action="api.uploadFile" :headers="{ 'Token': store.getters.token }" :show-file-list="false" :on-success="handleUndertakingLetterSuccess" :before-upload="beforeUpload" v-if="!formView.isEdit&&!formView.isFormView" accept="image/png,image/jpg,image/jpeg">
            <img v-if="imageUrl.undertakingLetterUrl" :src="imageUrl.undertakingLetterUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span v-if="!formView.isEdit&&!formView.isFormView">*格式为JPG，大小不超过500K</span>
          <img :src="api.getFile + registerForm.undertakingLetter" width="100" height="70" v-else>
        </el-form-item>
        <el-form-item label="意向企业名单图片：" prop="intentionEnterprise">
          <el-upload class="avatar-uploader" ref="intentionEnterprise" :action="api.uploadFile" :headers="{ 'Token': store.getters.token }" :show-file-list="false" :on-success="handleIntentionEnterpriseSuccess" :before-upload="beforeUpload" v-if="!formView.isEdit&&!formView.isFormView" accept="image/png,image/jpg,image/jpeg">
            <img v-if="imageUrl.intentionEnterpriseUrl" :src="imageUrl.intentionEnterpriseUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span v-if="!formView.isEdit&&!formView.isFormView">*格式为JPG，大小不超过500K</span>
          <img :src="api.getFile + registerForm.intentionEnterprise" width="100" height="70" v-else>
        </el-form-item>
        <el-form-item label="联系人姓名：" prop="contactName">
          <el-input v-model="registerForm.contactName" placeholder="请输入" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="联系人身份证：" prop="contactIdNumber">
          <el-input v-model="registerForm.contactIdNumber" placeholder="请输入" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机：" prop="contactPhonenumber">
          <el-input v-model="registerForm.contactPhonenumber" placeholder="请输入" @change="phoneChange" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="verificationCode" v-if="isShowVerifCode">
          <el-input v-model="registerForm.verificationCode" @change="validCodeChange" maxlength="6" placeholder="请输入" class="form-input"></el-input>
          <el-button @click="sendVerificationCode" v-if="!timeCount.isShowTimer">发送验证码</el-button>
          <span v-else>{{timeCount.second}}s</span>
        </el-form-item>
        <el-form-item label="联系人邮箱：" prop="contactMail">
          <el-input v-model="registerForm.contactMail" placeholder="请输入" class="form-input"></el-input>
        </el-form-item>
        <el-form-item label="联系人身份证扫描件：" prop="contactIdScanned">
          <el-upload class="avatar-uploader" ref="contactIdScanned" :action="api.uploadFile" :headers="{ 'Token': store.getters.token }" :show-file-list="false" :on-success="handleContactIdScannedSuccess" :before-upload="beforeUpload" v-if="!formView.isEdit&&!formView.isFormView" accept="image/png,image/jpg,image/jpeg">
            <img v-if="imageUrl.contactIdScannedUrl" :src="imageUrl.contactIdScannedUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span v-if="!formView.isEdit&&!formView.isFormView">*格式为JPG，大小不超过500K</span>
          <img :src="api.getFile + registerForm.contactIdScanned" width="100" height="70" v-else>
        </el-form-item>
        <el-form-item label="名片：" prop="contactBusinessCard">
          <el-upload class="avatar-uploader" ref="contactBusinessCard" :action="api.uploadFile" :headers="{ 'Token': store.getters.token }" :show-file-list="false" :on-success="handleContactBusinessCardSuccess" :before-upload="beforeUpload" v-if="!formView.isEdit&&!formView.isFormView" accept="image/png,image/jpg,image/jpeg">
            <img v-if="imageUrl.contactBusinessCardUrl" :src="imageUrl.contactBusinessCardUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span v-if="!formView.isEdit&&!formView.isFormView">*格式为JPG，大小不超过500K</span>
          <img :src="api.getFile + registerForm.contactBusinessCard" width="100" height="70" v-else>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label-width="150px">
          <el-button @click="cancel" class="form-button">取消</el-button>
          <el-button type="primary" @click="onSubmit" class="form-button" v-if="!isRegister" :disabled="formView.isFormView">确定</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>
  </el-dialog>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '@/scripts/framework/store';
export default {
  name: 'registerInfoDialog',
  mixins: [listPageBase],
  data() {
    var validateVerificationCode = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        if (!this.registerForm.isVerificationValid) {
          return callback(new Error("验证码错误"));
        } else {
          return callback();
        }
      } else {
        return callback(new Error("只能是数字"));
      }
    };
    return {
      pageId: "registerInfoDialog",
      store,
      api: {
        update: kindo.config.api.importExbUrl + "/api/infoIfiCooperationAgency/updateById",
        insert: kindo.config.api.importExbUrl + "/api/infoIfiCooperationAgency/addOrgUser",
        sendVerifyCode: kindo.config.api.baseUrl + "/openapi/common/sendMobileCode",
        validCode: kindo.config.api.baseUrl + "/openapi/common/validMobileVerifyCode",
        uploadFile: kindo.config.api.upms + "/api/fs/save",
        getFile: kindo.config.api.comsUrl + "/api/fs/view/",
        getAgencyCode: kindo.config.api.importExbUrl + "/api/infoIfiCooperationAgency/getAgencyCode",
        isExistAgency: kindo.config.api.importExbUrl + "/api/infoIfiCooperationAgency/isExistByOrg"
      },
      registerForm: {
        agencyTypeId: "",
        cooperationAgencyCode: "",
        cooperationAgencyName: "",
        agencyCategoryId: "",
        officialSealPicture: "",
        undertakingLetter: "",
        intentionEnterprise: "",
        contactName: "",
        contactIdNumber: "",
        contactPhonenumber: "",
        contactMail: "",
        contactIdScanned: "",
        contactBusinessCard: ""
      },
      formView: {
        isFormView: false,
        isEdit: false
      },
      formId: "",
      dialogVisible: false,
      source: {
        typeOptions: [],
        categoryOptions: []
      },
      rules: {
        agencyTypeId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cooperationAgencyName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        agencyCategoryId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        contactIdNumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        contactPhonenumber: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: validateVerificationCode, trigger: "blur" }
        ],
        contactMail: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        officialSealPicture: [
          { required: false, message: '请上传图片' }
        ],
        undertakingLetter: [
          { required: false, message: '请上传图片' }
        ],
        intentionEnterprise: [
          { required: false, message: '请上传图片' }
        ]
      },
      isShowVerifCode: true,
      currentPhoneNum: "",
      imageUrl: {
        officialSealPictureUrl: "",
        undertakingLetterUrl: "",
        intentionEnterpriseUrl: "",
        contactIdScannedUrl: "",
        contactBusinessCardUrl: ""
      },
      isShowAgencyCode: false,
      isRegister: false,
      //倒计时
      timeCount: {
        second: 60,
        isShowTimer: false,
        timer: null
      }
    };
  },
  mounted() {
    this.$root.$on("handleRegisterForm", ({ isFormView, isEdit }) => {
      this.formView = { isFormView, isEdit };
      if (this.formView.isFormView) {
        this.formId = "查看";
        this.isShowVerifCode = false;
      } else if (this.formView.isEdit) {
        this.formId = "修改";
        this.isShowVerifCode = false;
        this.$nextTick(function () {
          // this.$refs.registerForm.clearValidate();
          this.currentPhoneNum = this.registerForm.contactPhonenumber;
        });
      } else {
        this.formId = "注册";
        this.isShowVerifCode = true;
        this.$nextTick(function () {
          this.$refs.registerForm.clearValidate();
        });
      }
    });
  },
  async created() {
    // 读取数据字典
    this.source.typeOptions = await kindo.dictionary.get("agencyType");
    this.source.categoryOptions = await kindo.dictionary.get("agencyCategory");
  },
  methods: {
    beforeUpload(file) {
      const isPicture = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      const isLt2M = file.size / (1024 * 1024) < 0.5;
      if (!isPicture) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 500K!');
      }
      return isPicture && isLt2M;
    },
    //机构公章备案
    handleSealPictureSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.officialSealPictureUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.registerForm.officialSealPicture = res.data.original ? res.data.original.fileId : "";
        this.$refs.officialSealPicture.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.officialSealPicture.clearFiles();
      }
    },
    //机构承诺书
    handleUndertakingLetterSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.undertakingLetterUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.registerForm.undertakingLetter = res.data.original ? res.data.original.fileId : "";
        this.$refs.undertakingLetter.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.undertakingLetter.clearFiles();
      }
    },
    //意向企业名单图片
    handleIntentionEnterpriseSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.intentionEnterpriseUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.registerForm.intentionEnterprise = res.data.original ? res.data.original.fileId : "";
        this.$refs.intentionEnterprise.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.intentionEnterprise.clearFiles();
      }
    },
    //身份证扫描件
    handleContactIdScannedSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.contactIdScannedUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.registerForm.contactIdScanned = res.data.original ? res.data.original.fileId : "";
        this.$refs.contactIdScanned.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.contactIdScanned.clearFiles();
      }
    },
    //名片
    handleContactBusinessCardSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.contactBusinessCardUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.registerForm.contactBusinessCard = res.data.original ? res.data.original.fileId : "";
        this.$refs.contactBusinessCard.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.contactBusinessCard.clearFiles();
      }
    },
    agencyTypeChange(label) {
      this.isShowAgencyCode = false;
      if (label === "招展代理" || label === "交易团" || label === "商协会") {
        this.isShowAgencyCode = true;
      }
      this.source.typeOptions.forEach(item => {
        if (item.label === label) {
          this.registerForm.agencyTypeValue = item.value;
        }
      });
    },
    agencyNameChange(val) {
      let params = {
        json: {
          customQueryParams: {
            cooperationAgencyName: val,
            agencyTypeId: this.registerForm.agencyTypeValue
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.isRegister = false;
      this.registerForm.cooperationAgencyCode = "";
      this.$http.get(this.api.isExistAgency, params).then(res => {
        if (res && res[0]) {
          //输入机构名称，若招商系统存在，则不能注册
          if (res[0].cooperationAgencyCode) {
            this.$message({
              type: "warning",
              message: "该机构已存在"
            });
            this.registerForm.cooperationAgencyCode = res[0].cooperationAgencyCode;
            this.isRegister = true;
          } else if (!res[0].cooperationAgencyCode && res[0].deptCode) {
            //招商系统不存在，common表里存在，可以注册
            this.registerForm.cooperationAgencyCode = res[0].deptCode;
          } else if (!res[0].deptCode) {
            //类型选择合作机构和主办方，机构名称common表里不存在，可以注册
            this.registerForm.cooperationAgencyCode = res[0].cooperationAgencyCode;
          }
        }
      }, err => {
        this.$message.error(err);
      });
    },
    //机构注册
    onSubmit() {
      let agencyTypeValue = this.registerForm.agencyTypeId;
      let agencyCategoryValue = this.registerForm.agencyCategoryId;
      //机构类型
      this.source.typeOptions.forEach(item => {
        if (item.label === agencyTypeValue) {
          agencyTypeValue = item.value;
        }
      });
      //机构类别
      this.source.categoryOptions.forEach(item => {
        if (item.label === agencyCategoryValue) {
          agencyCategoryValue = item.value;
        }
      });

      let params = {
        orgId: this.registerForm.orgId,
        agencyTypeId: agencyTypeValue,
        cooperationAgencyName: this.registerForm.cooperationAgencyName,
        agencyCategoryId: agencyCategoryValue,
        officialSealPicture: this.registerForm.officialSealPicture,
        undertakingLetter: this.registerForm.undertakingLetter,
        intentionEnterprise: this.registerForm.intentionEnterprise,
        contactName: this.registerForm.contactName,
        contactIdNumber: this.registerForm.contactIdNumber,
        contactPhonenumber: this.registerForm.contactPhonenumber,
        contactMail: this.registerForm.contactMail,
        contactIdScanned: this.registerForm.contactIdScanned,
        contactBusinessCard: this.registerForm.contactBusinessCard
      };
      //新增默认启用，状态为1
      if (!this.formView.isEdit) {
        this.registerForm.status = 1;
      }
      let uri = this.formView.isEdit ? this.api.update : this.api.insert;
      let codeParams = {
        json: {
          customQueryParams: {},
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (!this.registerForm.cooperationAgencyCode) {
            //注册成功后提示页面给出机构编码
            this.$http.get(this.api.getAgencyCode, codeParams).then(response => {
              this.registerForm.cooperationAgencyCode = response;
              params.cooperationAgencyCode = response;
              //注册
              this.$http.postJson(uri, params).then(res => {
                this.$alert("恭喜您已注册成功！请使用您的机构编码登录系统：" + this.registerForm.cooperationAgencyCode, "提示", {
                  confirmButtonText: "我知道了",
                  center: true
                });
                this.dialogVisible = false;
                this.$root.$emit("refreshCptTable", true);
              }, err => {
                this.$message.error(err);
              });
            });
          } else {
            this.$http.postJson(uri, params).then(res => {
              this.dialogVisible = false;
              this.$root.$emit("refreshCptTable", true);
            }, err => {
              this.$message.error(err);
            });
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.dialogVisible = false;
    },
    //发送验证码
    sendVerificationCode() {
      let params = {
        mobile: this.registerForm.contactPhonenumber
      };
      this.$http.post(this.api.sendVerifyCode, params).then(res => {
        this.$message({
          type: "success",
          message: "发送成功"
        });
        this.timeCount.isShowTimer = true;
        let interval = setInterval(() => {
          this.timeCount.second--;
          if (this.timeCount.second <= 0) {
            this.timeCount.second = 60;
            this.timeCount.isShowTimer = false;
            this.timeCount.timer = null;
            clearInterval(interval);
          }
        }, 1000);
      });
    },
    validCodeChange(val) {
      let mobileParams = {
        mobile: this.registerForm.contactPhonenumber,
        verifyCode: val
      };
      //验证手机验证码
      this.$http.post(this.api.validCode, mobileParams).then(res => {
        this.registerForm.isVerificationValid = true;
        this.$message({
          type: "success",
          message: "验证码校验成功"
        });
      }, err => {
        this.registerForm.isVerificationValid = false;
        this.$message.error(err);
      });
    },
    phoneChange(val) {
      if (this.formView.isEdit) {
        if (this.currentPhoneNum !== val) {
          this.isShowVerifCode = true;
        } else {
          this.isShowVerifCode = false;
        }
      }
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 70px;
  line-height: 70px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 70px;
  display: block;
}
.form-button {
  width: 100px;
}
.form-input {
  width: 200px;
}
</style>
