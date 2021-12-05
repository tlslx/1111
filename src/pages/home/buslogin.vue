<template>
    <div class="container" id="app" :style='"background-image: url(../../../static/img/blue/login_bg.png)"'>
      <!-- <vue-canvas-nest :config="config" :el="'#app'"></vue-canvas-nest> -->
      <div class="loginmain" :style='"background-image: url(../../../static/img/blue/login_c.png)"'>
        <div class="left">
          <div class="sys-logo">
            <span class="sys-en-name">
              <span>{{ title }}</span>
            </span>
          </div>
          <div class="sys-name">
            <span class="letter">{{ subTitle }}</span>
          </div>
        </div>
        <div class="right">
          <div class="login-form">
            <el-form ref="viewT" :model="viewT.model" :rules="viewT.rulesT" @submit.native.prevent @keyup.enter.native="singinByMobile" size="large">
            <el-form-item class="sign-input" prop="mobile">
              <el-input autofocus v-model.trim="viewT.model.mobile" autocomplete="off" placeholder="请输入手机号码" prefix-icon="iconfont icon-touxiang"></el-input>
            </el-form-item>
            <el-form-item  prop="verifyCode"  style="margin-bottom: 48px">
                <el-input
                  v-model="viewT.model.verifyCode"
                  placeholder="请输入手机验证码"
                  style="width: 120px; text-aligin: center"
                ></el-input>
                  <el-button
                  type="primary"
                  @click="getYzm"
                  style="width: 120px;margin-left: 25px;"
                  :disabled="dis"
                ><span id="ant">获取验证码</span></el-button>
              </el-form-item>
              <el-form-item style="text-align:center;">
                <el-button class="sign-btn" @click="singinByMobile" round>登 录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="footer">
          <p><i class="el-icon-warning"></i>温馨提示：本网站适用<b>Chrome谷歌</b>、<b>360</b> 、<b>IE 11</b>及以上版本的浏览器。使用其他浏览器将可能导致无法正常完成展位申请等操作。 </p>
        </div>
      </div>
    </div>
</template>

<script>
// import vueCanvasNest from 'vue-canvas-nest';
import { mapGetters, mapActions } from "vuex";
import store from "@/scripts/framework/store/";
export default {
  data() {
    return {
      title: kindo.config.title,
      subTitle: kindo.config.subTitle,
      loginUrl: process.env.SSO_BASE_URL,
      iasid: process.env.IASID,
      time: kindo.util.formatDate(new Date()),
      codeImg: '',
      uuId: "",
      dis: false,
      config: {
        color: '34,70,123',
        zIndex: 0,
        count: 150,
        api: {
          signIn: kindo.config.api.upms + 'user/login/signIn'
        }
      },
      source: {
        authCode: ''
      },
      view: {
        model: {
          userName: '',
          password: '',
          verifyCodeImg: ''
        },
        rules: {
          userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          verifyCodeImg: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
        }
      },
      viewT: {
        model: {
          mobile: '',
          verifyCode: ''
        },
        rulesT: {
          mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
            {
              validator: (rule, value, callback) => {
                let errors = [];
                let phoneValid = /^1[23456789]\d{9}$/;
                if (!phoneValid.test(value)) {
                  errors.push(new Error("请输入正确的手机号"));
                }
                callback(errors);
              },
              trigger: "blur"
            }
          ],
          verifyCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
        }
      }
    };
  },
  // components: { vueCanvasNest },
  async created() {
    // let iasid = this.iasid;
    // let time = this.time;
    // this.source.authCode = await this.setauthCode(iasid, time);
    // 获取图像验证码
    await this.getverifyCodeImg().then(res => {
      this.codeImg = res.verifyCodeImg;
      this.uuId = res.verifyUUID;
    });
    // console.log(this.source.authCode);
    if (String.isNullOrEmpty(store.getters.token)) {
      // let url = location.href;
      // location.href = "/#/login";
      // location.href = this.loginUrl + "/login?ReturnUrl=" + encodeURI(url);
    } else {
      location.href = "/#/index";
    }
  },
  computed: {
    ...mapGetters('accountInfo', ['getUserInfo', 'verifyCodeInfo', 'verifyCode']),
    // 验证图片验证码参数
    testCheckCodeParams() {
      return {
        verifyCode: this.view.model.verifyCodeImg,
        verifyUUID: this.uuId
      };
    }
  },
  methods: {
    ...mapActions("accountInfo", ["getSendVerifyCodeInfo"]),  //发送手机验证码
    ...mapActions("findPwdInfo", ["getverifyCodeImg"]),  //获取图像验证码
    ...mapActions("findPwdInfo", ["getCheckVerifyCodeImg"]), //验证图片验证码
    ...mapActions("findPwdInfo", ["getvalidMobileVerifyCode"]),  //获取手机验证码
    ...mapActions("findPwdInfo", ["getcheckMobileVerifyCode"]),  // 验证手机验证码（新）
    // 通过手机验证登陆
    singinByMobile() {
      let checkMobileVerifyCode = {
        verifyCode: this.viewT.model.verifyCode,
        mobile: this.viewT.model.mobile
      };
      let _this = this;
      let iasid = this.iasid;
      let time = this.time;
      this.$refs.viewT.validate(valid => {
        if (valid) {
          _this.setauthCode(iasid, time).then(code => {
            _this.getcheckMobileVerifyCode(checkMobileVerifyCode).then(res => {
              const param = {
                IASID: iasid,
                mobile: this.viewT.model.mobile,
                timeStamp: time,
                authCode: code,
                verifyCode: this.viewT.model.verifyCode
              };
              // console.log(param);
              _this.$http.get(process.env.SSO_BASE_URL + "/api/validateLoginByMobile", param).then(resT => {
                // if (resT.user.source === '1') {
                const userInfo = resT.token;
                kindo.cache.set(kindo.constant.USER_TOKEN, userInfo, 'session');
                localStorage.setItem(kindo.constant.USER_TOKEN, userInfo);
                store.commit('setToken', { token: resT.token }, { root: true });
                // 跳转首页
                location.href = '/';
                // } else {
                //   kindo.util.alert('外部用户禁止访问', '提示', 'warning');
                // }
              });
              // const userInfo = resT.token;
              // kindo.cache.set(kindo.constant.USER_TOKEN, userInfo, 'session');
              // localStorage.setItem(kindo.constant.USER_TOKEN, userInfo);
              // store.commit('setToken', { token: resT.token }, { root: true });
              // // 跳转首页
              // location.href = '/';
            });
          });
        }
      });

    },
    register() {
      location.href = '/#/register';
    },
    findPwd() {
      location.href = '/#/findPwd';
      // location.href = '../unifiedUser/accountSet/findPwd';
    },
    //获取图像验证码
    getImgCode () {
      this.getverifyCodeImg().then(res => {
        this.codeImg = res.verifyCodeImg;
        this.uuId = res.verifyUUID;
      });
    },
    // 获取手机验证码
    getYzm(val) {
      let codeParams = {
        mobile: this.viewT.model.mobile,
        type: "1"
      };
      let odiv = document.getElementById("ant");
      let count = 60;
      odiv.innerHTML = count;
      let timer = null;
      let _this = this;
      timer = setInterval(function() {
        if (count > 0) {
          count = count - 1;
          odiv.innerHTML = count + "重新获取";
        } else {
          clearInterval(timer);
          _this.dis = false;
          odiv.innerHTML = "获取验证码";
        }
      }, 1000);

      this.dis = true;
      this.getSendVerifyCodeInfo(codeParams);
      // if (this.isPhone === 1) {
      //   this.getvalidMobileVerifyCode(this.codeParams);
      // } else if (this.isPhone === 2) {
      //   this.getsendEmailVerifyCode(this.codeParams);
      // }

    },
    setauthCode(iasid, time) {
      let params = {
        IASID: iasid,
        timeStamp: time
      };
      return this.$http.get(process.env.SSO_BASE_URL + "/api/createAuthCode", params).then(data => {
        if (data) {
          return data.authCode;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  background: #f0f2f5;
  min-width: 900px;
  min-height: 500px;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.sys-logo {
  margin: 80px 20px;
  height: 60px;
  line-height: 60px;
}

.sys-logo img {
  height: 60px;
}

.sys-en-name {
  vertical-align: text-bottom;
  margin: 0 24px;
  font-size: 32px;
  color: #2cadff;
  text-shadow: 0 0 1px #666;
  font-weight: 100;
}

.letter {
  display: inline-block;
  position: relative;
  color: #00b4f1;
  transform-style: preserve-3d;
  perspective: 400;
  z-index: 1;
}
.letter:before,
.letter:after {
  position: absolute;
  content: attr(data-letter);
  transform-origin: top left;
  top: 0;
  left: 0;
}
.letter,
.letter:before,
.letter:after {
  transition: all 0.3s ease-in-out;
}
.letter:before {
  text-shadow: -1px 0px 1px rgba(255, 255, 255, 0.8), 1px 0px 1px rgba(0, 0, 0, 0.8);
  z-index: 3;
  transform: rotateX(0deg) rotateY(-15deg) rotateZ(0deg);
}
.letter:after {
  color: rgba(0, 0, 0, 0.11);
  z-index: 2;
  transform: scale(1.08, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 1deg);
}
.letter:hover:before {
  color: #fafafa;
  transform: rotateX(0deg) rotateY(-40deg) rotateZ(0deg);
}
.letter:hover:after {
  transform: scale(1.08, 1) rotateX(0deg) rotateY(40deg) rotateZ(0deg) skew(0deg, 22deg);
}
.register-btn {
  color: #d80c18;
  cursor: pointer;
}
.findPwd-btn {
  color: #d80c18;
  cursor: pointer;
  float: right;
}
.regist_btnT {
  padding-top: 38px;
  margin-bottom: 5px !important;
}
.drag {
  position: relative;
  float: right;
  width: 35%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-size:100%;
}
.el-form-item {
  /deep/ .el-form-item__content {
    margin:0!important;
  }
}
</style>
