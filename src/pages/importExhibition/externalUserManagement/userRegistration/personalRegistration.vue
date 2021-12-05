<template>
  <el-page ref="personalRegister">
    <template slot="header">
      <kindo-box title="个人用户注册"></kindo-box>
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
        <!-- 个人用户注册导航页面 -->
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-steps align-center :active="current" finish-status="success">
              <el-step title="选择类型"></el-step>
              <el-step title="基本信息"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <!-- 个人用户注册基本信息页面 -->
        <el-form :model="personalRegistrationForm" :rules="personalRegistrationRules" ref="personalRegistrationForm">
          <div v-show="current === 2" class="register-from">
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="设置密码：" prop="password">
                  <el-input v-model="personalRegistrationForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="确认密码：" prop="pw">
                  <el-input v-model="personalRegistrationForm.pw" placeholder="请确认密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="personalRegistrationForm.name" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="personalRegistrationForm.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="身份证号：" prop="idCardNo">
                  <el-input v-model="personalRegistrationForm.idCardNo" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="6">
                <el-form-item label="手机号：" prop="phonenumber">
                  <el-input v-model="personalRegistrationForm.phonenumber" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="1">
                <el-form-item label-width="1px">
                  <el-button @click="sendVerificationCode" v-if="!timeCount.isShowTimer">发送验证码</el-button>
                  <span v-else>{{timeCount.second}}s</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="验证码：" prop="verificationCode">
                  <el-input ref="verificationCode" v-model="personalRegistrationForm.verificationCode" @change="validCodeChange" maxlength="6" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="固定电话：" prop="fixedPhone">
                  <el-input v-model="personalRegistrationForm.fixedPhone" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="邮箱：" prop="mail">
                  <el-input v-model="personalRegistrationForm.mail" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="职位：" prop="position">
                  <el-input v-model="personalRegistrationForm.position" placeholder="请输入内容"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item label="所在部门：" prop="department">
                  <el-select v-model="personalRegistrationForm.department" placeholder="请选择">
                    <el-option v-for="item in source.departmentOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="7">
                <el-form-item>
                  <el-button @click="preStep">上一步</el-button>
                  <el-button type="primary" @click="onSubmit">下一步</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 完成注册页面 -->
          <div v-show="current === 3" class="register-content">
            <el-row>
              <el-col :span="20" :offset="6">
                <div class="register-finish">
                  <span>我们已向您的注册手机</span>
                  <span class="register-cellphone">{{personalRegistrationForm.phonenumber}}</span>
                  <span>发送了</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" :offset="7">
                <div class="register-finish">
                  <span>账号激活连接，点击连接完成账号激活</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" :offset="7">
                <div class="register-finish">
                  <el-button type="danger" style="" @click="registerDone" class="finish-button">我知道了</el-button>
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
        </el-form>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "personalRegister",
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
      if (this.personalRegistrationForm.pw !== this.personalRegistrationForm.password) {
        return callback(new Error("两次输入密码不一致"));
      } else {
        return callback();
      }
    };
    var validateFixedTelephone = (rule, value, callback) => {
      if (kindo.validate.fixedTelephone(value)) {
        return callback(new Error("固定电话区号 3-4位加 7-8位 数字"));
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
    var validateEmail = (rule, value, callback) => {
      if (kindo.validate.email(value)) {
        return callback();
      } else {
        return callback(new Error("请输入正确的邮箱地址"));
      }
    };
    var validateVerificationCode = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        if (!this.personalRegistrationForm.isVerificationValid) {
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
    return {
      api: {
        addPersonalUser: kindo.config.api.importExbUrl + "/api/infoIfiPersonUser/addPersonalUser", //个人用户注册
        sendVerifyCode: kindo.config.api.baseUrl + "/openapi/common/sendMobileCode", //发送验证码
        validCode: kindo.config.api.baseUrl + "/openapi/common/validMobileVerifyCode" //验证码
      },
      current: 2,
      personalRegistrationForm: {
        pw: "",
        password: "",
        name: "",
        sex: "",
        idCardNo: "",
        phonenumber: "",
        fixedPhone: "",
        mail: "",
        position: "",
        department: ""
      },
      source: {
        departmentOptions: []
      },
      personalRegistrationRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 0, max: 32, message: "长度不能超过 32个 字符", trigger: "blur" },
          { validator: validateSpecialChars, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 0, max: 12, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        pw: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 0, max: 12, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateCheckPassword, trigger: "blur" }
        ],
        idCardNo: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { min: 0, max: 18, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateIdCardNo, trigger: "blur" }
        ],
        phonenumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 0, max: 11, message: "长度不能超过 18个 字符", trigger: "blur" },
          { validator: validateTelephone, trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 0, max: 6, message: "长度不能超过 6个 字符", trigger: "blur" },
          { validator: validateVerificationCode, trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 0, max: 11, message: "长度不能超过 11个 字符", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        fixedPhone: [
          { validator: validateFixedTelephone, trigger: "blur" }
        ]
      },
      //倒计时
      timeCount: {
        second: 60,
        isShowTimer: false,
        timer: null
      }
    };
  },
  async created() {
    //读取数据字典 所在部门
    this.source.departmentOptions = await kindo.dictionary.get("department");
  },
  mounted() {
    this.$nextTick(function () {
      this.personalRegistrationForm.ascriptionType = this.$route.query.ascriptionType;
      this.personalRegistrationForm.enterpriseId = this.$route.query.enterpriseId;
    });
  },
  methods: {
    //发送验证码
    sendVerificationCode() {
      let params = {
        mobile: this.personalRegistrationForm.phonenumber
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
    //校验手机验证码
    validCodeChange(value) {
      let mobileParams = {
        mobile: this.personalRegistrationForm.phonenumber,
        verifyCode: value
      };
      //验证手机验证码
      this.$http.post(this.api.validCode, mobileParams).then(res => {
        this.personalRegistrationForm.isVerificationValid = true;
        this.$message({
          type: "success",
          message: "验证码校验成功"
        });
      }, err => {
        this.personalRegistrationForm.isVerificationValid = false;
        this.$message.error(err);
      });
    },
    //个人注册提交
    onSubmit() {
      let params = {
        name: this.personalRegistrationForm.name,
        pw: this.personalRegistrationForm.pw,
        sex: this.personalRegistrationForm.sex === "男" ? 1 : 2,
        idCardNo: this.personalRegistrationForm.idCardNo,
        phonenumber: this.personalRegistrationForm.phonenumber,
        mail: this.personalRegistrationForm.mail,
        position: this.personalRegistrationForm.position,
        fixedPhone: this.personalRegistrationForm.fixedPhone,
        //企业注册个人需要额外带的参数
        ascriptionType: this.personalRegistrationForm.ascriptionType,
        enterpriseId: this.personalRegistrationForm.enterpriseId
      };
      this.$refs.personalRegistrationForm.validate(valid => {
        if (valid) {
          this.$http.postJson(this.api.addPersonalUser, params).then(res => {
            this.current = 3;
          });
        } else {
          return false;
        }
      });
    },
    registerDone() {
      this.$router.push({
        path: '/enterpriseRegistration',
        query: {}
      });
    },
    preStep() {
      this.$router.push({
        path: '/enterpriseRegistration',
        query: {}
      });
    }
  }
};
</script>

<style>
.register-div {
  height: 50px;
}
.register-div .register-navigation {
  font-size: 20px;
  font-weight: bold;
}
.register-from {
  margin-top: 20px;
}
.register-header {
  width: 57%;
  margin: 60px auto 20px auto;
}
.finish-button {
  width: 250px;
  height: 40px;
}
.register-content {
  width: 40%;
  margin: 20px auto;
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

