<!-- 找回密码页面 -->
<template>
  <el-page>
    <template slot="body">
      <el-row>
        <el-col :span="24">
          <div class="grid-mobile">
            找回密码
          </div>
          <div class="formBox" v-show="isPass === 1">
            <el-form ref="form" :label-position="labelPosition" :model="form" :rules="formRule" >
              <el-form-item label="用户类型" prop="userType">
                <el-radio-group v-model="form.userType">
                  <el-radio :label="1">个人用户</el-radio>
                  <el-radio :label="2">企业用户</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮箱/手机号" prop="mobile">
                <el-input
                  maxlength="20"
                  v-model="form.mobile"
                  placeholder="请输入注册时邮箱/已验证手机号"
                  style="width: 350px"
                  @change="getVal"
                ></el-input>
              </el-form-item>
              <el-form-item label="请选择" v-if="form.userType === 2" prop="codeType">
                <el-select v-model="form.codeType" placeholder="请选择" >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="customsCode" v-if="form.codeType === 'customsCode' && form.userType === 2">
                <el-input
                  v-model="form.customsCode"
                  placeholder="请输入海关编码"
                  style="width: 350px"
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="businessLicenceNo" v-if="form.codeType === 'businessLicenceNo' && form.userType === 2">
                <el-input
                  maxlength="18"
                  v-model="form.businessLicenceNo"
                  placeholder="请输入企业统一社会信用代码/营业执照号验证码"
                  style="width: 350px"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verifyCodeImg">
                <el-input
                  v-model="form.verifyCodeImg"
                  placeholder="请输入验证码"
                  style="width: 220px;margin: 0px 0 10px 0;"
                ></el-input>
                <div class="drag" ref="dragDiv"
                  @click="getImgCode"
                  :style="{backgroundImage:'url(data:image/jpg;base64,'+ this.codeImg + ')'}">
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  style="width:48%;height: 40px;margin-top: 20px;"
                  @click="toNext"
                >下一步</el-button>
                <el-button
                  type="primary"
                  style="width:48%;height: 40px;margin-top: 20px;"
                  @click="toReturn"
                >返回</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="formBox" v-show="isPass === 2">
            <el-form
              label-width="100px"
              :rules="formRuleSec"
              ref="formVal"
              style="width: 37%"
              :model="formVal"
            >
            <div v-show="resit === true">
              <el-form-item label="账号" v-show="form.userType === 2">
                <el-input
                  v-model="form.companyAccount"
                  :disabled="true"
                  style="width: 350px"
                ></el-input>
                <span>（请牢记贵公司用户名）</span>
              </el-form-item>
              <el-form-item prop="newPwd" style="margin-bottom:40px;" label="密码">
                <el-input v-model="formVal.newPwd" autocomplete="off" type="password" placeholder="设置密码" style="width: 350px"></el-input>
              </el-form-item>
              <el-form-item prop="confirmPwd" style="margin-bottom:25px;" label="确认密码">
                <el-input v-model="formVal.confirmPwd" autocomplete="off" type="password" placeholder="确认密码" style="width: 350px"></el-input>
              </el-form-item>
          </div>
          <div v-show="resit === false">
              <el-form-item prop="verifyCode" label="验证码">
          <div class="yzm-btn" >
                <el-input v-model="formVal.verifyCode" placeholder="请输入验证码" style="width: 192px;"></el-input>
                <el-button
                  type="primary"
                  @click="getYzm"
                  style="width: 135px;margin-left: 25px;"
                  :disabled="dis"
                ><span id="ant">获取验证码</span></el-button>
          </div>
              </el-form-item>
          </div>
              <el-form-item style="text-align: left;" label-width="100px">
                <el-button style="width: 32%;margin-top: 20px;" type="primary" @click="handleConfirm('formVal')">确认</el-button>
                <el-button
                  type="primary"
                  style="width:32%;margin-top: 20px;"
                  @click="toReturn"
                >返回</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- <div class="formBox" v-show="isPass === 3">
            <div class="emailPass">我们已向您的注册邮箱发送了一封密码找回邮件 请您注意接收邮件
              <el-button style="width: 100%;height:40px;margin:20px 0;" type="primary">去邮箱接收邮件</el-button>
              <span class="emailErr">
                请注意查收邮件，并按照邮件中的提示操作,完成安全认证。
                没有收到？
                <a @click="sendEmail">重新发送</a>
              </span>
            </div>
          </div> -->
          <div class="formBox" v-show="isPass === 4">
            <div class="success"><span class="sucMsg">您已经成功设置密码，请使用新密码登录 </span>
              <el-button style="width: 60%;height:40px;margin:40px 0;" type="danger" @click="toLogin">马上登录</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </template>
  </el-page>
</template>

<script>
// import { $helper, $locals } from "@/utils";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "findPwd",
  data() {
    // let valStrength = (rule, value, callback) => {
    //   let regRule = /^1[23456789]\d{9}$/;
    //   if (!regRule.test(value)) {
    //     return callback(new Error("不能包含中文"));
    //   }

    //   let strength = $locals.get("STRENGTH");
    //   let msg = $helper.checkPasswordTwo(value, strength);
    //   if (msg.ok) {
    //     return callback();
    //   } else {
    //     return callback(new Error(msg.msg));
    //   }
    // };
    return {
      isPass: 1,  // 1：输入手机/邮箱页面 2：获取手机验证码页面 /重置密码页面 4：重置成功提示页面
      isPhone: 3, // 1：手机  2：邮箱
      resit: false, // 是否显示重置密码页面
      yzm: 1,   // 1：验证码校验不通过 2：验证码校验通过
      time: "",
      dis: false,
      codeImg: "",
      companyId: "",
      uuId: "",
      registrationYzm: "",
      labelPosition: "left",
      param: {
        "exhibitorContactPhone": "",
        "customsCode": "",
        "businessLicenceNo": "",
        "pageSize": "10",
        "pageStart": "1"
      },
      options: [
        {
          value: 'customsCode',
          label: '海关编码'
        }, {
          value: 'businessLicenceNo',
          label: '企业统一社会信用代码/营业执照号'
        }
      ],
      form: {
        codeType: "",
        mobile: "",
        companyAccount: "",
        verifyCodeImg: "",
        customsCode: "",
        userType: "",
        businessLicenceNo: ""
      },
      formRule: {
        verifyCodeImg: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        businessLicenceNo: [
          { required: true, message: '请输入企业统一社会信用代码/营业执照号', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'change' }
        ],
        codeType: [
          { required: true, message: '请选择海关编码/企业统一社会信用代码/营业执照号', trigger: 'change' }
        ],
        customsCode: [
          { required: true, message: '请输入海关编码', trigger: 'blur' }
        ],
        mobile: [
          {
            required: true,
            message: "请输入邮箱/已验证手机号",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /[\u4e00-\u9fa5]/g;
              let space = /\s+/g;
              let phoneValid = /^1[23456789]\d{9}$/;
              let emailValid = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
              let specialRule = /[`~!#$%^&*_\-+=<>?:"{}|,\/;'\\[\]·~！#￥%……&* ——\-+={}|《》？：“”【】、；‘’，。、]/im;
              if (regRule.test(value) || space.test(value) || specialRule.test(value)) {
                errors.push(new Error("手机号/邮箱不能包含特殊字符、中文字符"));
              } else if (this.form.mobile.length > 200) {
                errors.push(new Error("输入超出长度限制（200字符以内）"));
              } else if (!phoneValid.test(value) && !emailValid.test(value)) {
                errors.push(new Error("请输入正确的手机号/邮箱"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ]
      },
      formVal: {
        newPwd: "",
        confirmPwd: "",
        verifyCode: ""

      },
      formRuleSec: {
        newPwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,20}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入6-20位数字、字母、特殊字符，任意两种组成的密码"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        confirmPwd: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,20}$/;
              if (this.formVal.newPwd !== value) {
                errors.push(new Error("确认密码与新密码不一致"));
              } else if (!regRule.test(value)) {
                errors.push(new Error("请输入6-20位数字、字母、特殊字符，任意两种组成的密码"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        verifyCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[0-9]{6}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入6位数字验证码"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("findPwdInfo", ["validMobileVerifyCode"]),  //获取手机验证码
    ...mapGetters("findPwdInfo", ["testMobileVerifyCode"]),  //验证手机验证码
    ...mapGetters("findPwdInfo", ["testVerifyCodeImg"]),  //获取图像验证码
    ...mapGetters("findPwdInfo", ["testCheckVerifyCodeImg"]),  //验证图像验证码
    ...mapGetters("findPwdInfo", ["sendEmailVerifyCode"]),  //发送邮箱验证码
    ...mapGetters("findPwdInfo", ["testEmailVerifyCode"]),  //验证邮箱验证码
    ...mapGetters("findPwdInfo", ["checkMobileCode"]),  // 验证手机验证码（新）
     // 获取手机/邮箱验证码参数
    codeParams() {
      return {
        account: this.form.mobile,
        type: "1"
      };
    },
    // 重置密码参数
    testCodeParams() {
      return {
        account: this.form.mobile,
        code: this.formVal.verifyCode,
        newPwd: this.formVal.newPwd,
        newPwd2: this.formVal.confirmPwd,
        type: "1",
        loginAccount: ""

      };
    },
    // 验证图像验证码 参数
    testCheckCodeParams() {
      return {
        verifyCode: this.form.verifyCodeImg,
        verifyUUID: this.uuId,
        mobile: this.isPhone === 1 ? this.form.mobile : '',
        email: this.isPhone === 2 ? this.form.mobile : '',
        account: this.companyId
      };
    },
    // 验证手机验证码参数
    checkMobileVerifyCode() {
      return {
        verifyCode: this.formVal.verifyCode,
        mobile: this.form.mobile
      };
    },
    // 验证邮箱验证码参数
    checkEmailVerifyCode() {
      return {
        verifyCode: this.formVal.verifyCode,
        email: this.form.mobile
      };
    }
  },
  methods: {
    ...mapActions("findPwdInfo", ["getvalidMobileVerifyCode"]),  //获取手机验证码
    ...mapActions("findPwdInfo", ["getTestVerifyCode"]),  //验证手机验证码
    ...mapActions("findPwdInfo", ["getverifyCodeImg"]),  //获取图像验证码
    ...mapActions("findPwdInfo", ["getCheckVerifyCodeAccountImg"]), //验证图片验证码
    ...mapActions("findPwdInfo", ["getsendEmailVerifyCode"]), //发送邮箱验证码
    ...mapActions("findPwdInfo", ["getvalidEmailVerifyCode"]),  //验证邮箱验证码
    ...mapActions("findPwdInfo", ["getcheckMobileVerifyCode"]),  // 验证手机验证码（新）
    ...mapActions("findPwdInfo", ["getCompanyInfoOuterTwoInfo"]),  // 获取企业信息
    ...mapActions("personalRegister", ["checkPersonalInfoEmail"]), // 根据手机号，邮箱查重个人用户
    toNext() {
      let _this = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.isPhone === 1) {
            this.param = {
              "exhibitorContactPhone": _this.form.mobile,
              "customsCode": _this.form.customsCode,
              "businessLicenceNo": _this.form.businessLicenceNo,
              "pageSize": "10",
              "pageStart": "1"
            };
          } else {
            this.param = {
              "dedicatedEmail": _this.form.mobile,
              "customsCode": _this.form.customsCode,
              "businessLicenceNo": _this.form.businessLicenceNo,
              "pageSize": "10",
              "pageStart": "1"
            };
          }
            // 企业用户忘记密码
          if (_this.form.userType === 2) {
              // 获取企业信息
            this.getCompanyInfoOuterTwoInfo(this.param).then(res => {
              if (res.records && res.records[0]) {
                _this.companyId = res.records[0].companyId;
                _this.form.companyAccount = res.records[0].companyAccount;

              } else if (!res.records[0]) {
                this.$message.error('对不起，信息不匹配或者系统找不到您的资料，请联系你的所属交易团！');
                 // 重置图像验证码
                this.getverifyCodeImg().then(rest => {
                  this.codeImg = rest.verifyCodeImg;
                  this.uuId = rest.verifyUUID;
                });
                return false;
              }
              // 验证图像验证码
              this.CheckVerifyImg();
            });
            // 个人用户忘记密码
          } else if (_this.form.userType === 1) {
             // 查询是否有该个人用户
            this.checkPersonalInfoEmail({ "email": this.form.mobile }).then(res => {
              this.companyId = "";
              if (res === true) {
                this.$message.error('对不起，信息不匹配或者系统找不到您的资料！');
                 // 没有该用户时 重置图像验证码
                this.getverifyCodeImg().then(rest => {
                  this.codeImg = rest.verifyCodeImg;
                  this.uuId = rest.verifyUUID;
                });
                return false;
              } else {
                // 验证图像验证码
                this.CheckVerifyImg();
              }
            });
          }
        }
      });
    },
    //获取图像验证码
    getImgCode () {
      this.getverifyCodeImg().then(res => {
        this.codeImg = res.verifyCodeImg;
        this.uuId = res.verifyUUID;
      });
    },
    sendEmail() {
      // console.log("sending");
    },
    CheckVerifyImg() {
      //验证图像验证码
      this.getCheckVerifyCodeAccountImg(this.testCheckCodeParams).then(resT => {
        if (this.isPhone === 1) {
          this.isPass = 2;
        } else if (this.isPhone === 2) {
          this.isPass = 2;
        }
      }).catch((err) => {
              // 重置图像验证码
        this.getverifyCodeImg().then(rest => {
          this.codeImg = rest.verifyCodeImg;
          this.uuId = rest.verifyUUID;
        });
      });

    },
    // 返回按钮
    toReturn() {
      if (this.isPass === 1) {
        // location.href = '/#/login';
        this.$router.push('/agentLogin');
      } else if (this.isPass === 2 && this.resit === true) {
        this.isPass = 1;
        this.resit = false;
        this.yzm = 1;
      } else if (this.isPass === 2 && this.resit === false) {
        this.isPass = 1;
      }
    },
    // 重置密码确认
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        let _this = this;
        if (this.yzm === 1) {
          if (this.isPhone === 1) {
            // 手机验证验证码
            this.getcheckMobileVerifyCode(this.checkMobileVerifyCode).then(rest => {
              // 验证成功显示重置密码页面
              _this.yzm = 2;
              _this.resit = true;
            });
          } else if (this.isPhone === 2) {
            // 邮箱验证验证码
            this.getvalidEmailVerifyCode(this.checkEmailVerifyCode).then(rest => {
              // 验证成功显示重置密码页面
              _this.yzm = 2;
              _this.resit = true;
            });
          }
        } else if (this.yzm === 2 && valid) {
          if (this.isPhone === 1) {
            // 手机重置密码
            if (this.form.userType === 2) {
              this.testCodeParams.loginAccount = this.companyId;
              this.testCodeParams.type = "1";
            } else {
              this.testCodeParams.account = this.form.mobile;
              this.testCodeParams.type = "1";
            }
            this.getTestVerifyCode(this.testCodeParams).then(rest => {
              // 显示密码重置成功页面
              _this.isPass = 4;
            });
          } else if (this.isPhone === 2) {
            // 邮箱重置密码
            if (this.form.userType === 2) {
              this.testCodeParams.loginAccount = this.companyId;
              this.testCodeParams.type = "2";
            } else {
              this.testCodeParams.account = this.form.mobile;
              this.testCodeParams.type = "2";
            }
            this.getTestVerifyCode(this.testCodeParams).then(rest => {
              // 显示密码重置成功页面
              _this.isPass = 4;
            });
          }
        } else {
          return false;
        }
      });
    },
    toLogin() {
      // location.href = '/#/login';
      this.$router.push('/agentLogin');
    }, //退回登陆页面
    getVal() {
      let phoneValid = /^1[23456789]\d{9}$/;
      let emailValid = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      // let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      if (phoneValid.test(this.form.mobile)) {
        this.isPhone = 1;
          //验证输入的是手机号
      } else if (emailValid.test(this.form.mobile)) {
        this.isPhone = 2;
          //验证输入的是邮箱
      }
    },
    // 定时器（每次获取手机验证码要间隔60秒）
    getYzm(val) {
      let odiv = document.getElementById("ant");
      let count = 60;
      odiv.innerHTML = count + "s重新获取";
      let timer = null;
      let _this = this;
      timer = setInterval(function() {
        if (count > 0) {
          count = count - 1;
          odiv.innerHTML = count + "s重新获取";
        } else {
          clearInterval(timer);
          _this.dis = false;
          odiv.innerHTML = "获取验证码";
        }
      }, 1000);

      this.dis = true;
      if (this.isPhone === 1) {
        // 手机重置密码
        this.getvalidMobileVerifyCode(this.codeParams);
      } else if (this.isPhone === 2) {
        // 邮箱重置密码
        this.getsendEmailVerifyCode(this.codeParams);
      }

    } //退回登陆页面

  },
  mounted() {
    // 初始化获取图像验证码
    this.getverifyCodeImg().then(res => {
      this.codeImg = res.verifyCodeImg;
      this.uuId = res.verifyUUID;
    });
  }

};
</script>

<style lang="less" scoped>
.grid-mobile {
  width: 80%;
  height: 100px;
  line-height: 100px;
  margin: 0 auto;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  font-size: 20px;
  font-weight: bold;

  .isHas {
    float: right;
    font-size: 14px;
    font-weight: normal;

    a {
      text-decoration: none;
      cursor: pointer;
      color: orange;
    }
  }
}

.formBox {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
.emailPass {
  width: 20%;
  line-height: 30px;
  .emailErr {
  font-size: 14px;
  color: #999;
a {
  color: orange;
  cursor: pointer;
  text-decoration: none;
      }
    }
  }
.drag {
  position: relative;
  margin: 0px 0 10px 0;
  float: right;
  width: 30%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-size:100%;
      }
.yzm-btn {
  display: flex;
  margin-top: 0px;
  }
.success {
  width: 30%;
  text-align: center;
}
.sucMsg{
  line-height: 30px;
  height: 30px;
}

}
</style>
