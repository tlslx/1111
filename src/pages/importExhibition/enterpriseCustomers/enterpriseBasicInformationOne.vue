<template>
  <el-page class="enterpriseBasicInformationOne">
    <template slot="body">
      <el-form :model="form" :rules="rules" :ref="form" label-width="150px" width="100%">
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-steps align-center :active="current" finish-status="success">
              <el-step title="选择类型"></el-step>
              <el-step title="基本信息"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
        </el-row>

        <!-- 第一页 -->
        <div v-show="current === 0" style="width:40%;margin:10px auto;">
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <img src="/static/importExhibitionImg/u30.png" width="100px" height="100px">
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <img
                  src="/static/importExhibitionImg/u28.png"
                  width="100px"
                  height="100px"
                  @click="current = 1"
                >
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 第二页 -->
        <div v-show="current === 1" style="width:40%;margin:10px auto;">
          <el-row>
            <el-col :span="20">
              <el-form-item label="企业编码" prop="enterpriseId">
                <el-input v-model="form.enterpriseId" placeholder="C000001" readonly="true" style="color:#666666;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="设置密码" prop="menuName">
                <el-input v-model="form.menuName" placeholder="设置密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="确认密码" prop="oldMenuName">
                <el-input placeholder="确认密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="邀请码" prop>
                <el-input placeholder="请输入邀请"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="企业名称" prop="enterpriseName">
                <el-input v-model="form.enterpriseName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系人姓名" prop="contactName">
                <el-input v-model="form.contactName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="联系人手机号码" prop="contactPhonenumber">
                <el-input v-model="form.contactPhonenumber" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label-width="1px">
                <el-button>发送验证码</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="验证码" prop="phonenumber">
                <el-input v-model="form.phonenumber" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系人身份证" prop="contactIdNumber">
                <el-input v-model="form.contactIdNumber" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="联系人邮箱" prop="contactMail">
                <el-input v-model="form.contactMail" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item label="地区" prop="address">
                <el-select v-model="form.address" placeholder="请选择省">
                  <el-option label="湖北" value="shanghai"></el-option>
                  <el-option label="广州" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="1px" prop="address">
                <el-select v-model="form.address" placeholder="请选择市">
                  <el-option label="武汉" value="shanghai"></el-option>
                  <el-option label="天河" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="网址" prop="homesite">
                <el-input v-model="form.homesite" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="单位类型" prop="region">
                <el-select v-model="form.region" placeholder="请选择">
                  <el-option label="国企" value="shanghai"></el-option>
                  <el-option label="民营" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
                <el-input v-model="form.unifiedSocialCreditCode" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="营业执照有效期" prop="businessLicenseValidity">
                <el-input v-model="form.businessLicenseValidity" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="营业执照复印件" prop="imageUrl">
                <el-upload
                  class="avatar-uploader"
                  action="/api/infoIfiEnterpriseUser/updateFile"
                  :show-file-list="true"
                  :on-success="handleSuccess"
                  :before-upload="handleBeforeUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  格式为JPG，大小不超过500K
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
                <el-button @click="current = current - 1">上一步</el-button>
                <el-button type="primary" @click="current = current + 1">下一步</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 第三页 -->
        <div v-show="current == 2" style="width:40%;margin:10px auto;">
          <el-checkbox-group v-model="form.type">
            <el-row>
              <el-col :span="13">
                <el-form-item label="展会信息来源" label-width="165px">
                  <el-checkbox label="网络新闻" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="网络广告" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="网络搜索引擎" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="1px;">
                  <el-checkbox label="主办方微信公众号" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="主办方短信邀请" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="1px;">
                  <el-checkbox label="主办方邮件邀请" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="主办方电话邀请" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="1px;">
                  <el-checkbox label="主办方官网" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="行业杂志" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="1px;">
                  <el-checkbox label="交易团推荐" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="行业协会推荐" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="1px;">
                  <el-checkbox label="同行或朋友介绍" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="其他展会" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label-width="1px;">
                  <el-checkbox label="其他" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <!-- 第二个复选框 -->
          <el-checkbox-group v-model="form.type">
            <el-row>
              <el-col :span="14">
                <el-form-item label="观展目的" label-width="165px">
                  <el-checkbox label="与现有供应商会面" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="寻找新的供应商" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="寻找新产品/新的投资机会" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="8" :span="6">
                <el-form-item label-width="1px;">
                  <el-checkbox label="市场调研" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="了解行业最新动向" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="参加展会论坛活动" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="考察展会以评估下次是否参展" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="其他" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <!-- 第三个复选框 -->
          <el-checkbox-group v-model="form.type">
            <el-row>
              <el-col :span="11">
                <el-form-item label="主要进口地区" label-width="165px">
                  <el-checkbox label="亚洲" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="1px;">
                  <el-checkbox label="欧洲" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="1px;">
                  <el-checkbox label="美洲" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="1px;">
                  <el-checkbox label="大洋洲" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="3" :offset="8">
                <el-form-item label-width="1px;">
                  <el-checkbox label="非洲" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="1px;">
                  <el-checkbox label="欧盟" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="1px;">
                  <el-checkbox label="其他" name="type"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-checkbox-group>
          <el-row>
            <el-col :span="20">
              <el-form-item label="企业其他图片资料名称" label-width="165px">
                <el-input v-model="form.enterpriseName" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="企业其他图片资料图片" label-width="165px">
                <el-upload
                  ref="upload"
                  :action="url"
                  :before-upload="handleBeforeUpload"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-exceed="handleExceed"
                  :disabled="isView"
                  :on-preview="handlePreview"
                >
                  <el-button size="small" type="primary">上传</el-button>
                  <div slot="tip" class="el-upload__tip">格式为JPG，大小不超过500K</div>
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button @click="current = current - 1">上一步</el-button>
                <el-button type="primary" @click="submitForm">完成</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 第三页 -->
        <div v-show="current == 3" style="width:50%;margin:10px auto;">
          <el-row>
            <el-col :span="20" :offset="6">
              <div>
                我们已向您的企业联系人手机
                <span style="color:red;">15524855555</span>发送了
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top:15px;">
            <el-col :span="20" :offset="7">
              <div>账号激活连接，点击连接完成账号激活</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:30px;">
            <el-col :span="20" :offset="7">
              <el-button type="danger" style="width:300px;height:50px;">我知道了</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="20" :offset="6">请注意查收激活连接，并按短信提示操作，完成安全认证。</el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="20" :offset="6">
              没有收到？
              <a href="###">重新发送</a>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </template>
  </el-page>
</template>

<script>
export default {
  props: {
    value: {},
    isView: false,
    baseUrl: { type: String, default: process.env.API_BASE_URL }
  },
  data() {
    return {
      url: this.baseUrl + "/api/infoIfiEnterpriseUser/updateFile",
      viewUrl: this.baseUrl + "/api/common/upload/download?mongofsId=",
      pickerValue: this.value,
      current: 0,
      form: {
        enterpriseName: "",
        contactName: "",
        contactPhonenumber: "",
        menuName: "",
        contactIdNumber: "",
        sex: "",
        phonenumber: "",
        contactMail: "",
        homesite: "",
        unifiedSocialCreditCode: "",
        delivery: true,
        type: [],
        resource: "",
        desc: "",
        address: 1,
        businessLicenseValidity: 1,
        enterpriseId: "",
        sourceId: ""
      },
      imageUrl: "",
      rules: {
        enterpriseName: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" }
        ],
        contactPhonenumber: [
          { required: true, message: "请输入联系人手机", trigger: "blur" }
        ],
        contactIdNumber: [
          { required: true, message: "请输入联系人身份证号", trigger: "blur" }
        ],
        unifiedSocialCreditCode: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        bankAccountNum: [
          { required: true, message: "请输入开户行账号", trigger: "blur" }
        ],
        companyTel: [
          { required: true, message: "请输入公司电话", trigger: "blur" }
        ],
        companyAdd: [
          { required: true, message: "请输入单位地址", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobilePhoneNum: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    getData() {
    },

    submitForm() {
      var _this = this;
      //然后通过下面的方式把内容通过axios来传到后台
      //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      this.$refs[this.form].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/infoIfiEnterpriseUser/addEnterpriseUser", this.form)
            .then(function(result) {
              if (result.flag === "1") {
                _this.$message({
                  showClose: true,
                  message: result.message,
                  type: "success"
                });
                _this.current = _this.current + 1;
              } else {
                _this.$message({
                  showClose: true,
                  message: result.message,
                  type: "error"
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    handleSuccess(response, file, fileList) {},
    handlePreview(file) {
      window.open(file.url, "_blank");
    },
    handleBeforeUpload(file) {},
    handleExceed(files, fileList) {},
    handleRemove(file, fileList) {},
    loadData() {
      var _this = this;
      this.$http
        .get("/api/infoIfiEnterpriseUser/autoGenerationEnterpriseId", {})
        .then(function(result) {
          _this.form.enterpriseId = result;
        });
    }
  }
};
</script>

<style scoped>
.enterpriseBasicInformationOne {
  overflow-y: auto;
}
</style>
