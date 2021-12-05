<template>
    <div class="container" id="app" :style='"background-image: url(../../../static/img/" + theme + "/login_bg.png)"'>
      <!-- <vue-canvas-nest v-if="showcan" :config="config" :el="'#app'"></vue-canvas-nest> -->
      <div class="loginmain" :style='"background-image: url(../../../static/img/" + theme + "/login_c.png)"'>
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
            <el-form ref="form" :model="view.model" :rules="view.rules" @submit.native.prevent @keyup.enter.native="signIn" size="large" v-if="kindo.config.loginTheme !== 'loginBlue'">
              <el-form-item class="sign-input" prop="userName">
                <el-input autofocus v-model.trim="view.model.userName" autocomplete="off" placeholder="User Name" prefix-icon="iconfont icon-touxiang"></el-input>
              </el-form-item>
              <!-- <span class="passwordInfo">注意：2019年5月15日前注册企业，密码中大写字母请转成小写输入，长度超8位请仅输入前8位，并请在登录后修改密码，新密码区分大小写。</span> -->
              <el-form-item v-if="kindo.config.theme !== 'blue'" class="sign-input" prop="password" :style="kindo.config.theme !== 'blue' ? 'margin: 0' : ''">
               <el-tooltip  effect="light" placement="top-start">
                 <div slot="content" style="width:309px">注意：<br/>2019年5月15日前注册企业，密码中大写字母请转成小写输入，长度超8位请仅输入前8位，并请在登录后修改密码，新密码区分大小写。</div>
                <el-input v-model.trim="view.model.password" autocomplete="off" type="password" placeholder="Password" prefix-icon="iconfont icon-lock"></el-input>
               </el-tooltip>
              </el-form-item>
              <el-form-item v-else class="sign-input" prop="password" :style="kindo.config.theme !== 'blue' ? 'margin: 0' : ''">
               <el-input v-model.trim="view.model.password" autocomplete="off" type="password" placeholder="Password" prefix-icon="iconfont icon-lock"></el-input>
              </el-form-item>
              <el-form-item class="regist_btnT" style="text-align:left;" v-if="kindo.config.theme !== 'blue'" >
                <span class="register-btn" @click="register" round>注册</span>
                <span class="findPwd-btn" @click="findPwd" round>忘记密码?</span>
              </el-form-item>
              <el-form-item style="text-align:left;" prop="verifyCodeImg" v-else>
                <el-input
                  v-model="view.model.verifyCodeImg"
                  placeholder="请输入验证码"
                  style="width: 50%;"
                ></el-input>
                <div class="drag" ref="dragDiv"
                  @click="getImgCode"
                  :style="{backgroundImage:'url(data:image/jpg;base64,'+ this.codeImg + ')'}">
                </div>
              </el-form-item>
              <el-form-item style="text-align:center;">
                <el-button class="sign-btn" @click="signIn" round>登 录</el-button>
              </el-form-item>
            </el-form>
            <el-form ref="viewT" :model="viewT.model" :rules="viewT.rulesT" @submit.native.prevent @keyup.enter.native="signIn" size="large" v-else-if="kindo.config.loginTheme === 'loginBlue'">
            <el-form-item class="sign-input-mobile" prop="account">
              <el-input autofocus v-model.trim="viewT.model.account" autocomplete="off" placeholder="User Name" prefix-icon="iconfont icon-touxiang"></el-input>
            </el-form-item>
            <el-form-item class="sign-input-mobile" prop="password">
              <el-input v-model.trim="viewT.model.password" autocomplete="off" type="password" placeholder="Password" prefix-icon="iconfont icon-lock"></el-input>
            </el-form-item>
            <el-form-item  prop="verifyCode" style="margin-bottom: 38px">
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
              <!-- <el-form-item class="regist_btn" style="text-align:left;" >
                <span class="findPwd-btn" @click="findPwd" round>忘记密码?</span>
              </el-form-item> -->
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
      <!-- <div class="footer">
        <p><i class="el-icon-warning"></i>温馨提示：本网站适用<b>Chrome谷歌</b>、<b>360</b> 、<b>IE 11</b>及以上版本的浏览器。使用其他浏览器将可能导致无法正常完成展位申请等操作。 </p>
      </div> -->
    </div>
</template>

<script>
// import vueCanvasNest from 'vue-canvas-nest';
import { mapActions } from "vuex";
import store from "@/scripts/framework/store/";
export default {
  data() {
    return {
      theme: '',
      title: kindo.config.title,
      subTitle: kindo.config.subTitle,
      loginUrl: process.env.SSO_BASE_URL,
      iasid: process.env.IASID,
      time: kindo.util.formatDate(new Date()),
      codeImg: '',
      uuId: "",
      showcan: false,
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
          account: '',
          verifyCode: '',
          password: ''
        },
        rulesT: {
          account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
          verifyCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
        }
      }
    };
  },
  // components: { vueCanvasNest },
  async created() {
    // 获取图像验证码
    await this.getverifyCodeImg().then(res => {
      this.codeImg = res.verifyCodeImg;
      this.uuId = res.verifyUUID;
    });
    // console.log(this.source.authCode);
    if (String.isNullOrEmpty(store.getters.token)) {
      if (!kindo.cache.get('logintype', 'session')) {
        kindo.cache.set('logintype', 'user', 'session');
        location.href = location.href;
      }
      // let url = location.href;
      // location.href = "/#/login";
      // location.href = this.loginUrl + "/login?ReturnUrl=" + encodeURI(url);
    } else {
      location.href = "/#/index";
    }
    // console.log(kindo.util.checkuserAgent());
    if (kindo.util.checkuserAgent() !== "IE") {
      this.showcan = true;
    }
    this.theme = kindo.config.theme;
  },
  computed: {
    // 验证图片验证码参数
    testCheckCodeParams() {
      return {
        verifyCode: this.view.model.verifyCodeImg,
        verifyUUID: this.uuId
      };
    }
  },
  methods: {
    ...mapActions("findPwdInfo", ["getverifyCodeImg"]),  //获取图像验证码
    ...mapActions("findPwdInfo", ["getCheckVerifyCodeImg"]), //验证图片验证码
    ...mapActions("findPwdInfo", ["sendVerifyCodeInfo"]),  //获取手机验证码
    ...mapActions("findPwdInfo", ["validVerifyCodeInfo"]),  // 验证手机验证码（新）
    signIn() {
      let iasid = this.iasid;
      let time = this.time;
      let _this = this;

      this.$refs.form.validate(valid => {
        if (valid) {
          this.setauthCode(iasid, time).then(code => {
            const param = {
              IASID: iasid,
              userName: this.view.model.userName,
              password: this.$md5(this.view.model.password),
              timeStamp: time,
              authCode: code
            };
            if (_this.view.model.verifyCodeImg !== "" && _this.view.model.verifyCodeImg !== undefined && _this.view.model.verifyCodeImg != null) {
              //验证图像验证码
              this.getCheckVerifyCodeImg(this.testCheckCodeParams).then(res => {
                _this.$http.get(process.env.SSO_BASE_URL + "/api/validateLogin", param).then(resT => {
                  if (resT.user.source === '1' && kindo.config.theme === 'blue') {
                    const userInfo = resT.token;
                    kindo.cache.set(kindo.constant.USER_TOKEN, userInfo, 'session');
                    localStorage.setItem(kindo.constant.USER_TOKEN, userInfo);
                    store.commit('setToken', { token: resT.token }, { root: true });
                    // 跳转首页
                    location.href = '/';
                  } else {
                    kindo.util.alert('外部用户禁止访问', '提示', 'warning');
                  }
                });

              }).catch((err) => {
                // 验证图片验证码失败 重新获取验证码
                this.getverifyCodeImg().then(res => {
                  this.codeImg = res.verifyCodeImg;
                  this.uuId = res.verifyUUID;
                });
              });

            } else if (kindo.config.theme !== 'blue') {
              _this.$http.get(process.env.SSO_BASE_URL + "/api/validateLogin", param).then(resT => {
                const userInfo = resT.token;
                kindo.cache.set(kindo.constant.USER_TOKEN, userInfo, 'session');
                localStorage.setItem(kindo.constant.USER_TOKEN, userInfo);
                store.commit('setToken', { token: resT.token });
              }).then(resT => {
                _this.$http.get(kindo.config.api.comsUrl + '/api/security/info?IASID=' + process.env.IASID).then(resdata => {
                  if (resdata.user.source === '1') {
                    // 跳转首页
                    location.href = '/';
                  } else if (resdata.org.deptType !== '5' && resdata.org.deptType !== '7' && resdata.org.deptType !== '10' && resdata.org.deptType !== '30') {
                    // 跳转首页
                    location.href = '/';
                  } else {
                    kindo.util.alert('当前用户禁止访问', '提示', 'warning');
                  }
                });
              });
            } else {
              kindo.util.alert('请输入验证码', '提示', 'warning');
            }
          });
        }
      });
    },
    // 通过手机验证登陆(交易团登录)
    singinByMobile() {
      let iasid = this.iasid;
      let time = this.time;
      let _this = this;
      let checkMobileVerifyCode = {
        verifyCode: this.viewT.model.verifyCode,
        toUser: this.viewT.model.account
      };
      this.$refs.viewT.validate(valid => {
        if (valid) {
          this.setauthCode(iasid, time).then(code => {
            const mobileParam = {
              IASID: iasid,
              userName: this.viewT.model.account,
              password: this.$md5(this.viewT.model.password),
              timeStamp: time,
              authCode: code
            };
                // 验证短信验证码
            _this.validVerifyCodeInfo(checkMobileVerifyCode).then(resM => {
              // 验证成功 登录
              _this.$http.get(process.env.SSO_BASE_URL + "/api/validateLogin", mobileParam).then(resH => {
                const userInfo = resH.token;
                kindo.cache.set(kindo.constant.USER_TOKEN, userInfo, 'session');
                localStorage.setItem(kindo.constant.USER_TOKEN, userInfo);
                store.commit('setToken', { token: resH.token });
                // store.commit('setToken', { token: resH.token }, { root: true });
                // location.href = '/';
              }).then(() => {
                _this.$http.get(kindo.config.api.comsUrl + '/api/security/info?IASID=' + process.env.IASID).then(resdata => {
                  if (resdata.user.source === '1') {
                    location.href = '/';
                  } else if (resdata.org.deptType !== '5' && resdata.org.deptType !== '7' && resdata.org.deptType !== '10' && resdata.org.deptType !== '30') {
                    kindo.util.alert('当前用户禁止访问', '提示', 'warning');
                  } else {
                    // 跳转首页
                    location.href = '/';
                  }
                });
              });
            });
          });
        }
      });

    },
    register() {
      this.$router.push('/register');
      // location.href = '/#/register';
    },
    findPwd() {
      this.$router.push('/findPwd');
      // location.href = '/#/findPwd';
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
        toUser: this.viewT.model.account,
        type: "3"
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
      this.sendVerifyCodeInfo(codeParams);


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
  color: #F56C6C;
  cursor: pointer;
}
.findPwd-btn {
  color: #F56C6C;
  cursor: pointer;
  float: right;
}
.regist_btn{
  padding-top: 0px;
  margin-bottom: 2px !important;
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
/deep/ .el-form-item__content {
  margin:0!important;
}
</style>
