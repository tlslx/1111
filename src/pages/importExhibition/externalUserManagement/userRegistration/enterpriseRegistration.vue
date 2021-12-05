<template>
  <el-page ref="enterpriseRegister">
    <template slot="header">
      <kindo-box title="企业用户注册"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <div class="register-header">
          <el-row>
            <el-col>
              <span class="register-navigation" v-if="current === 0">国内采购商注册</span>
              <span class="register-navigation" v-else-if="current === 1||current ===2">填写注册基本信息</span>
              <span class="register-navigation" v-else-if="current === 3">国内采购商企业注册</span>
            </el-col>
          </el-row>
        </div>
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-steps align-center :active="current" finish-status="success">
              <el-step title="选择类型"></el-step>
              <el-step title="基本信息"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <!-- 注册类型选择 -->
        <div v-show="current === 0" class="register-selectType">
          <el-row :gutter="20">
            <el-col :span="5" :offset="5">
              <div @click="personalRegister" class="register-div">
                <div>
                  <img src="/static/img/impExbImg/u30.png" width="100px" height="100px">
                </div>
                <span class="register-span">个人用户</span>
              </div>
            </el-col>
            <el-col :span="5" :offset="5">
              <div @click="current = 1" class="register-div">
                <div>
                  <img src="/static/img/impExbImg/u28.png" width="100px" height="100px">
                </div>
                <span class="register-span">企业用户</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 第二页 -->
        <div v-show="current === 1" class="register-content">
          <el-form :model="enterpriseRegistrationForm" :rules="rules" ref="enterpriseRegistrationForm" label-width="150px" width="100%">
            <el-row>
              <el-col :span="20">
                <el-form-item label="设置密码" prop="password">
                  <el-input v-model="enterpriseRegistrationForm.password" placeholder="设置密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="确认密码" prop="pw">
                  <el-input v-model="enterpriseRegistrationForm.pw" placeholder="确认密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="企业名称" prop="enterpriseName">
                  <el-input v-model="enterpriseRegistrationForm.enterpriseName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="联系人姓名" prop="contactName">
                  <el-input v-model="enterpriseRegistrationForm.contactName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="联系人手机号码" prop="contactPhonenumber">
                  <el-input v-model="enterpriseRegistrationForm.contactPhonenumber" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="1px">
                  <el-button @click="sendVerificationCode" v-if="!timeCount.isShowTimer">发送验证码</el-button>
                  <span v-else>{{timeCount.second}}s</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="验证码" prop="verificationCode">
                  <el-input v-model="enterpriseRegistrationForm.verificationCode" @change="validCodeChange" maxlength="6" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="联系人身份证" prop="contactIdNumber">
                  <el-input v-model="enterpriseRegistrationForm.contactIdNumber" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="联系人邮箱" prop="contactMail">
                  <el-input v-model="enterpriseRegistrationForm.contactMail" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode">
                  <el-input v-model="enterpriseRegistrationForm.unifiedSocialCreditCode" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="营业执照有效期" prop="businessLicenseValidity">
                  <el-select v-model="enterpriseRegistrationForm.effectiveTime" placeholder="请选择有效期" class="register-select">
                    <el-option v-for="item in source.effectiveTimeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <el-date-picker class="register-datepicker" ref="businessLicenseValidity" v-if="enterpriseRegistrationForm.effectiveTime !== '2'" v-model="enterpriseRegistrationForm.businessLicenseValidity" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="营业执照复印件" prop="businessLicenseCopy">
                  <el-upload class="avatar-uploader" ref="businessLicenseCopy" :show-file-list="false" :action="api.uploadFile" :on-success="handleBusinessLicenseSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="handleBeforeUpload" accept="image/png,image/jpg,image/jpeg">
                    <img v-if="imageUrl.businessLicenseCopyUrl" :src="imageUrl.businessLicenseCopyUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span v-if="!imageUrl.businessLicenseCopyUrl">*格式为JPG，大小不超过500K</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col>
                <el-form-item>
                  <el-button @click="current = current - 1">上一步</el-button>
                  <el-button type="danger" @click="onNextStep">下一步</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 第三页 -->
        <div v-show="current == 2" class="register-content">
          <el-form :model="enterpriseRegistrationFormB" :rules="rulesB" ref="enterpriseRegistrationFormB" label-width="150px" width="100%">
            <el-row>
              <el-col :span="12">
                <el-form-item label="企业所在地区" label-width="165px" prop="addressProvince">
                  <el-select v-model="enterpriseRegistrationFormB.addressProvince" placeholder="请选择省">
                    <el-option v-for="item in source.provinceOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="1px">
                  <span>&nbsp;省</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="1px" prop="addressCity">
                  <el-select v-model="enterpriseRegistrationFormB.addressCity" placeholder="请选择市">
                    <el-option v-for="item in source.cityOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="1px">
                  <span>&nbsp;市</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="网址" label-width="165px" prop="homesite">
                  <el-input v-model="enterpriseRegistrationFormB.homesite" placeholder="http://"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="单位类型" label-width="165px" prop="companyCategoryId">
                  <el-select v-model="enterpriseRegistrationFormB.companyCategoryId" placeholder="请选择">
                    <el-option v-for="item in source.companyOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="展会信息来源" label-width="165px" prop="sourceId">
                  <el-checkbox-group v-model="enterpriseRegistrationFormB.sourceId">
                    <el-checkbox v-for="item in source.exhibitionInfoSourceOptions" :key="item.value" :label="item.label"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="观展目的" label-width="165px" prop="purposeId">
                  <el-checkbox-group v-model="enterpriseRegistrationFormB.purposeId">
                    <el-checkbox v-for="item in source.exhibitionPurposeOptions" :key="item.value" :label="item.label"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="主要采购地区" label-width="165px" prop="importAreaId">
                  <el-checkbox-group v-model="enterpriseRegistrationFormB.importAreaId">
                    <el-checkbox v-for="item in source.mainImportAreaOptions" :key="item.value" :label="item.label"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="主要采购类别" label-width="165px" prop="purchaseCategory">
                  <el-select v-model="enterpriseRegistrationFormB.purchaseCategory" placeholder="请选择">
                    <el-option v-for="item in source.buyerTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="企业其他图片资料图片" label-width="165px" prop="pictureSupplement">
                  <el-upload class="avatar-uploader" ref="pictureSupplement" :show-file-list="false" :action="api.uploadFile" :on-success="handlePictureSupplementSuccess" :headers="{ 'Token': store.getters.token }" :before-upload="handleBeforeUpload" accept="image/png,image/jpg,image/jpeg">
                    <img v-if="imageUrl.pictureSupplementUrl" :src="imageUrl.pictureSupplementUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span v-if="!imageUrl.pictureSupplementUrl">*格式为JPG，大小不超过500K</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col>
                <el-form-item>
                  <el-button @click="current = current - 1">上一步</el-button>
                  <el-button type="danger" @click="onSubmit">下一步</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 第三页 -->
        <div v-show="current == 3" class="register-content">
          <el-row>
            <el-col :span="20" :offset="6">
              <div class="register-finish">
                <span>我们已向您的企业联系人手机</span>
                <span class="register-cellphone">{{enterpriseRegistrationForm.contactPhonenumber}}</span>发送了
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="7">
              <div class="register-finish">
                <span>账号激活连接，点击连接完成账号 {{enterpriseRegistrationForm.enterpriseNo}} 的激活</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="7">
              <div class="register-finish">
                <el-button type="danger" @click="registerDone" class="finish-button">我知道了</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="6">
              <div class="register-finish register-footer">
                <span>请注意查收激活连接，并按短信提示操作，完成安全认证。</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="6">
              <div class="register-finish register-footer">
                <span>没有收到？</span>
                <a href="###" class="register-resend">重新发送</a>
              </div>
            </el-col>
          </el-row>
        </div>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '@/scripts/framework/store';
export default {
  name: "enterpriseRegister",
  mixins: [listPageBase],
  data() {
    var validatePassword = (rule, value, callback) => {
      if (kindo.validate.isPassword(value)) {
        return callback(new Error("只能是字母、数字、下划线，并且不能以下划线开头"));
      } else {
        return callback();
      }
    };
    var validateCheckPassword = (rule, value, callback) => {
      if (this.enterpriseRegistrationForm.pw !== this.enterpriseRegistrationForm.password) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        return callback();
      }
    };
    var validateTelephone = (rule, value, callback) => {
      if (kindo.validate.mobile(value)) {
        return callback();
      } else {
        return callback(new Error("请输入正确的电话号码"));
      }
    };
    var validateVerificationCode = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        if (!this.enterpriseRegistrationForm.isVerificationValid) {
          return callback(new Error("验证码错误"));
        } else {
          return callback();
        }
      } else {
        return callback(new Error("只能是数字"));
      }
    };
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error("不能包含特殊字符或空格"));
      } else {
        return callback();
      }
    };
    var validateIdCardNo = (rule, value, callback) => {
      if (!kindo.validate.idCard(value)) {
        return callback(new Error("请输入正确的身份证号"));
      } else {
        return callback();
      }
    };
    var validateCreditCode = (rule, value, callback) => {
      if (kindo.validate.unifiedSocialCreditCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error("只能是数字或字母"));
      }
    };
    return {
      store,
      api: {
        addEnterpriseUser: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseUser/addEnterpriseUser",
        getEntCode: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseUser/autoGenerationEnterpriseId",
        sendVerifyCode: kindo.config.api.baseUrl + "/openapi/common/sendMobileCode",
        validCode: kindo.config.api.baseUrl + "/openapi/common/validMobileVerifyCode",
        uploadFile: kindo.config.api.upms + "/api/fs/save"
      },
      pickerValue: this.value,
      current: 0,
      enterpriseRegistrationForm: {},
      imageUrl: {
        businessLicenseCopyUrl: "",
        pictureSupplementUrl: ""
      },
      enterpriseImgUrl: "",
      source: {
        language: {},
        provinceOptions: [{
          label: "湖北",
          value: "hubei"
        }],
        cityOptions: [{
          label: "武汉",
          value: "wuhan"
        }],
        buyerTypeOptions: [],
        effectiveTimeOptions: [{
          label: "有效期时间",
          value: "1"
        }, {
          label: "长期有效",
          value: "2"
        }],
        companyOptions: [],
        //展会信息来源
        exhibitionInfoSourceOptions: [],
        //观展目的
        exhibitionPurposeOptions: [],
        //主要采购地区
        mainImportAreaOptions: []
      },
      rules: {
        password: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 12, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        pw: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 12, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateCheckPassword, trigger: "blur" }
        ],
        enterpriseName: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 32, message: "长度不能超过 32个 字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: "blur" }
        ],
        contactName: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 32, message: "长度不能超过 32个 字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: "blur" }
        ],
        contactPhonenumber: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 11, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateTelephone, trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 6, message: "长度不能超过 6个 字符", trigger: "blur" },
          { validator: validateVerificationCode, trigger: "blur" }
        ],
        contactIdNumber: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 18, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateIdCardNo, trigger: "blur" }
        ],
        unifiedSocialCreditCode: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 0, max: 11, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateCreditCode, trigger: "blur" }
        ]
      },
      enterpriseRegistrationFormB: {
        sourceId: [],
        purposeId: [],
        importAreaId: []
      },
      rulesB: {},
      //倒计时
      timeCount: {
        second: 60,
        isShowTimer: false,
        timer: null
      }
    };
  },
  async created() {
    //读取数据字典 展会信息来源
    this.source.exhibitionInfoSourceOptions = await kindo.dictionary.get("ExhibitionInformationSources");
    //观展目的
    this.source.exhibitionPurposeOptions = await kindo.dictionary.get("participationGoal");
    //主要采购地区
    this.source.mainImportAreaOptions = await kindo.dictionary.get("ProcurementArea");
    //主要采购类别
    this.source.buyerTypeOptions = await kindo.dictionary.get('bigCategoryOfExhibits');
    //单位类型
    this.source.companyOptions = await kindo.dictionary.get('companyAttribute');
  },
  mounted() {
    this.$nextTick(function () {
      //机构创建企业
      this.enterpriseRegistrationForm.applyType = this.$route.query.applyType;
      this.enterpriseRegistrationForm.orgId = this.$route.query.orgId;
      //个人创建企业
      this.enterpriseRegistrationForm.ascriptionType = this.$route.query.ascriptionType;
      this.enterpriseRegistrationForm.personId = this.$route.query.personId;
      //跳转直接进入企业注册页面，不展示注册类型页
      if (this.enterpriseRegistrationForm.orgId || this.enterpriseRegistrationForm.personId) {
        this.current === 1;
      }
    });
  },
  methods: {
    personalRegister() {
      this.$router.push({
        path: '/personalRegistration',
        query: {}
      });
    },
    //发送验证码
    sendVerificationCode() {
      let params = {
        mobile: this.enterpriseRegistrationForm.contactPhonenumber
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
        mobile: this.enterpriseRegistrationForm.contactPhonenumber,
        verifyCode: val
      };
      //验证手机验证码
      this.$http.post(this.api.validCode, mobileParams).then(res => {
        this.enterpriseRegistrationForm.isVerificationValid = true;
        this.$message({
          type: "success",
          message: "验证码校验成功"
        });
      }, err => {
        this.enterpriseRegistrationForm.isVerificationValid = false;
        this.$message.error(err);
      });
    },
    //下一步
    onNextStep() {
      this.$refs.enterpriseRegistrationForm.validate(valid => {
        if (valid) {
          this.current = this.current + 1;
        } else {
          return false;
        }
      });
    },
    //下发参数转换
    parameterFormat(data, type) {
      let dataset = [];
      let dataToString = "";
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < this.source[type].length; j++) {
          if (data[i] === this.source[type][j].label) {
            dataset.push(this.source[type][j].value);
            break;
          }
        }
      }
      dataToString = dataset.join(",");
      return dataToString;
    },
    //企业注册提交
    onSubmit() {
      //展会信息来源
      let sourceIdFormat = this.parameterFormat(this.enterpriseRegistrationFormB.sourceId, "exhibitionInfoSourceOptions");
      //观展目的
      let purposeIdFormat = this.parameterFormat(this.enterpriseRegistrationFormB.purposeId, "exhibitionPurposeOptions");
      //主要采购地区
      let importAreaIdFormat = this.parameterFormat(this.enterpriseRegistrationFormB.importAreaId, "mainImportAreaOptions");
      //企业编号参数
      let entParams = {
        json: {
          customQueryParams: {
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$refs.enterpriseRegistrationFormB.validate(valid => {
        if (valid) {
          //注册成功获取企业编号
          this.$http.get(this.api.getEntCode, entParams).then(data => {
            this.enterpriseRegistrationForm.enterpriseNo = data;
            let params = {
              enterpriseNo: data,
              pw: this.enterpriseRegistrationForm.pw,
              enterpriseName: this.enterpriseRegistrationForm.enterpriseName,
              contactName: this.enterpriseRegistrationForm.contactName,
              contactPhonenumber: this.enterpriseRegistrationForm.contactPhonenumber,
              contactIdNumber: this.enterpriseRegistrationForm.contactIdNumber,
              contactMail: this.enterpriseRegistrationForm.contactMail,
              unifiedSocialCreditCode: this.enterpriseRegistrationForm.unifiedSocialCreditCode,
              businessLicenseCopy: this.enterpriseRegistrationForm.businessLicenseCopy,
              businessLicenseValidity: this.enterpriseRegistrationForm.effectiveTime === "1" ? this.enterpriseRegistrationForm.businessLicenseValidity : "9999-99-99",
              addressProvince: this.enterpriseRegistrationFormB.addressProvince,
              addressCity: this.enterpriseRegistrationFormB.addressCity,
              homesite: this.enterpriseRegistrationFormB.homesite,
              companyCategoryId: this.enterpriseRegistrationFormB.companyCategoryId,
              sourceId: sourceIdFormat,
              purposeId: purposeIdFormat,
              importAreaId: importAreaIdFormat,
              purchaseCategory: this.enterpriseRegistrationFormB.purchaseCategory,
              pictureSupplement: this.enterpriseRegistrationFormB.pictureSupplement,
              //机构创建企业额外参数
              applyType: this.enterpriseRegistrationForm.applyType,
              orgId: this.enterpriseRegistrationForm.orgId,
              //个人创建企业额外参数
              ascriptionType: this.enterpriseRegistrationForm.ascriptionType,
              personId: this.enterpriseRegistrationForm.personId
            };
            //注册
            this.$http.postJson(this.api.addEnterpriseUser, params).then(res => {
              this.current = 3;
            }, err => {
              this.$message.error(err);
            });
          });
        }
      });
    },
    registerDone() {
      this.current = 0;
    },
    handleBeforeUpload(file) {
      const isPicture = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      const isLt2M = file.size / (1024 * 1024) < 0.5;
      if (!isPicture) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JEPG 格式");
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不能超过 500K!");
      }
      return isPicture && isLt2M;
    },
    //营业执照复印件
    handleBusinessLicenseSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.businessLicenseCopyUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.enterpriseRegistrationForm.businessLicenseCopy = res.data.original ? res.data.original.fileId : "";
        this.$refs.businessLicenseCopy.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.businessLicenseCopy.clearFiles();
      }
    },
    //企业其他资料图片
    handlePictureSupplementSuccess(res, file) {
      if (res.flag === '1') {
        this.imageUrl.pictureSupplementUrl = URL.createObjectURL(file.raw);
        this.$message.success("上传成功");
        this.enterpriseRegistrationForm.pictureSupplement = res.data.original ? res.data.original.fileId : "";
        this.$refs.pictureSupplement.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.pictureSupplement.clearFiles();
      }
    }
  }
};
</script>

<style>
.register-navigation {
  font-size: 20px;
  font-weight: bold;
}
.register-header {
  width: 57%;
  margin: 60px auto 20px auto;
}
.register-selectType {
  width: 47%;
  margin: 10px auto;
}
.register-elstep {
  margin-top: 16px;
}
.register-selectType .register-div {
  cursor: pointer;
}
.register-selectType .register-div .register-span {
  width: 100px;
  display: inline-block;
  text-align: center;
}
.register-content {
  width: 40%;
  margin: 10px auto;
}
.register-select {
  width: 120px;
}
.register-datepicker {
  width: 170px;
}
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
.finish-button {
  width: 250px;
  height: 40px;
}
.register-content .register-finish {
  margin-top: 16px;
}
.register-content .register-cellphone {
  color: #e94141;
}
.register-content .register-footer {
  color: #999;
}
.register-content .register-finish .register-resend {
  color: #f90;
}
</style>
