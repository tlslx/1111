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
              <el-form-item label="邮箱/手机号" prop="mobile">
                <el-input
                  v-model="form.mobile"
                  placeholder="请输入邮箱/已验证手机号"
                  style="width: 350px"
                  @change="getVal"
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verifyCodeImg">
                <el-input
                  v-model="form.verifyCodeImg"
                  placeholder="请输入验证码"
                  style="width: 220px;margin: 30px 0 10px 0;"
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
              style="width: 35%"
              :model="formVal"
            >
            <div v-show="resit === true">
              <el-form-item prop="newPwd" style="margin-bottom:40px;" label="密码">
                <el-input v-model="formVal.newPwd" autocomplete="off" type="password" placeholder="设置密码"></el-input>
              </el-form-item>
              <el-form-item prop="confirmPwd" style="margin-bottom:25px;" label="确认密码">
                <el-input v-model="formVal.confirmPwd" autocomplete="off" type="password" placeholder="确认密码"></el-input>
              </el-form-item>
          </div>
          <div v-show="resit === false">
              <el-form-item prop="verifyCode" label="验证码">
          <div class="yzm-btn" >
                <el-input v-model="formVal.verifyCode" placeholder="请输入验证码" style="width: 220px;"></el-input>
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
                <el-button style="width: 36%;margin-top: 40px;" type="primary" @click="handleConfirm('formVal')">确认</el-button>
                <el-button
                  type="primary"
                  style="width:36%;height: 40px;margin-top: 20px;"
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
      isPass: 1,
      isPhone: 3,
      resit: false,
      yzm: 1,
      time: "",
      dis: false,
      codeImg: "",
      uuId: "",
      registrationYzm: "",
      labelPosition: "left",
      form: {
        mobile: "",
        verifyCodeImg: ""
      },
      formRule: {
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

    codeParams() {
      return {
        account: this.form.mobile,
        type: "1"
      };
    },
    testCodeParams() {
      return {
        account: this.form.mobile,
        code: this.formVal.verifyCode,
        newPwd: this.formVal.newPwd,
        newPwd2: this.formVal.confirmPwd,
        type: "1"
      };
    },
    testCheckCodeParams() {
      return {
        verifyCode: this.form.verifyCodeImg,
        verifyUUID: this.uuId,
        mobile: this.isPhone === 1 ? this.form.mobile : '',
        email: this.isPhone === 2 ? this.form.mobile : ''
      };
    },
    checkMobileVerifyCode() {
      return {
        verifyCode: this.formVal.verifyCode,
        mobile: this.form.mobile
      };
    },
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
    toNext() {
      let _this = this;

      //验证图像验证码
      this.getCheckVerifyCodeAccountImg(this.testCheckCodeParams).then(res => {
        if (_this.isPhone === 1) {
          _this.isPass = 2;
        } else if (_this.isPhone === 2) {
          _this.isPass = 2;
        }
      });
      this.getverifyCodeImg().then(res => {
        this.codeImg = res.verifyCodeImg;
        this.uuId = res.verifyUUID;
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
    // 返回按钮
    toReturn() {
      if (this.isPass === 1) {
        // location.href = '/#/login';
        this.$router.push('/importLogin');
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
            this.getcheckMobileVerifyCode(this.checkMobileVerifyCode).then(rest => {
              _this.yzm = 2;
              _this.resit = true;
            });
          } else if (this.isPhone === 2) {
            this.getvalidEmailVerifyCode(this.checkEmailVerifyCode).then(rest => {
              _this.yzm = 2;
              _this.resit = true;
            });
          }
        } else if (this.yzm === 2 && valid) {
          if (this.isPhone === 1) {
            this.getTestVerifyCode(this.testCodeParams).then(rest => {
              _this.isPass = 4;
            });
          } else if (this.isPhone === 2) {
            this.testCodeParams.type = "2";
            this.getTestVerifyCode(this.testCodeParams).then(rest => {
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
      this.$router.push('/importLogin');
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
        this.getvalidMobileVerifyCode(this.codeParams);
      } else if (this.isPhone === 2) {
        this.getsendEmailVerifyCode(this.codeParams);
      }

    } //退回登陆页面

  },
  mounted() {
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
  margin: 30px 0 10px 0;
  float: right;
  width: 30%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-size:100%;
      }
.yzm-btn {
  display: flex;
  margin-top: 20px;
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
