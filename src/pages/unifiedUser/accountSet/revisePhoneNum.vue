<style lang="less" scoped>
  .phone {
    .phone-body {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .drag{
        position: relative;
        margin: 30px 0 10px 12px;
        float: right;
        width: 30%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-size: 100%100%;
      }
      .yzm-btn {
        display: flex;
        margin-top: 20px;
        margin-left: 23%;
      }
    }
    .el-form-item {
      margin: 20px 0;
      text-align: center;
    }
  }
</style>

<template>
  <div class="phone">
    
     <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改手机号" name="first">
        <div class="phone-body">
          <el-form refs="form" :label-position="labelPosition" :rules="rules" :model="form">
            <el-form-item label="原手机号" prop="mobile" placeholder="请输入原手机号">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="新手机号" prop="newmobile" placeholder="请输入新手机号">
              <el-input v-model="form.newmobile"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCodeImg">
              <el-input
                v-model="form.verifyCodeImg"
                placeholder="请输入验证码"
                style="width: 200px;margin: 30px 0 10px 0;">
              </el-input>
              <div class="drag" ref="dragDiv"
                @click="getImgCode"
                :style="{backgroundImage:'url(data:image/jpg;base64,'+ this.codeImg + ')'}">
              </div>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%;height: 40px;margin-top: 20px;"
                @click="toNext"
              >下一步</el-button>
            </el-form-item>
            <div class="yzm-btn">
              <el-input v-model="registrationYzm" placeholder="请输入短信验证码" style="width: 300px"></el-input>
              <el-button
                type="primary"
                @click="getYzm"
                style="width: 30%;margin-left: 12px;"
                v-show="!showYzm"
                :disabled="dis"
                ><span id="ant">获取验证码</span></el-button>
            </div>
            <el-form-item>
              <el-button style="width: 90px; margin-left: 12px;" type="primary" @click="handleConfirm">确定</el-button>
              <el-button style="width: 90px;" @click="getAccountInfo">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "revisePhone",
    data() {
      return {
        showYzm: '',
        time: '',
        registrationYzm: '',
        beginClientX: 0,  
        dis: false,      
        codeImg: "",
        uuId: "",   
        labelPosition: 'right',
        activeName: "first",
        form: {
          mobile: '',
          newmobile: '',
          verifyCodeImg: ''
        },
        rules: {
          mobile: [
            {
              required: true,
              message: "该项不能为空",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback, source, options) => {
                let errors = [];
                if (this.form.phone !== value) {
                  errors.push(new Error("请输入原手机号码"));
                }
                callback(errors);
              },
              trigger: "blur"
            }
          ],
          newmobile: [
            {
              required: true,
              message: "请输入新手机号码",
              trigger: "blur"
            },
            {
              validator: function (rule, value, callback) {
                if (/^1[34578]\d{9}$/.test(value) === false) {
                  return callback(new Error("请输入正确的手机号"));
                } else {
                  return callback();
                }
              }, 
              trigger: 'blur' 
            },
            { validator: (rule, value, callback, source, options) => {
              let errors = [];
              if (this.form.mobile === value) {
                errors.push(new Error("新手机号和旧手机号一致"));
                return callback(errors);
              }
            }, trigger: 'change' }
          ]
        }
      };
    },
    computed: {
      ...mapGetters('accountInfo', ['getUserInfo', 'verifyCodeInfo', 'verifyCode']),
      ...mapGetters('findPwdInfo', ['testVerifyCodeImg', 'testCheckVerifyCodeImg']),
      // 用户信息查询
      params() {
        return {
          id: localStorage.getItem("userIdBf")
        };
      },
      // 发送手机验证码
      codeParams() {
        return {
          mobile: this.getUserInfo.mobile
        };
      },
      // 验证手机验证码
      verifyCodeParams() {
        let _this = this;
        return {
          mobile: this.getUserInfo.mobile,
          tag: '',
          verifyCode: _this.registrationYzm
        };
      }
    },
    methods: {
      ...mapActions('accountInfo', ['getqueryUserInfo', 'getSendVerifyCodeInfo', 'getvalidMobileVerifyCode']),
      ...mapActions('findPwdInfo', ['getverifyCodeImg', 'getCheckVerifyCodeImg']),
      handleClick() {

      },
      getAccountInfo() {
        this.$router.push('/accountInfo');
      },
      //获取图像验证码
      getImgCode () {
        this.getverifyCodeImg().then(res => {
          this.codeImg = res.verifyCodeImg;
          this.uuId = res.verifyUUID;
        });
      },
      // 获取验证码倒计时方法
      getYzm(val) {
        let odiv = document.getElementById("ant");
        let count = 60;
        odiv.innerHTML = count + "秒后重新获取";
        let timer = null;
        let _this = this;
        timer = setInterval(function() {
          if (count > 0) {
            count = count - 1;
            odiv.innerHTML = count + "秒后重新获取";
          } else {
            clearInterval(timer);
            _this.dis = false;
            odiv.innerHTML = "获取验证码";
          }
        }, 1000);
        this.dis = true;
        this.getSendVerifyCodeInfo(this.codeParams);
      },
      // 验证手机验证码
      handleConfirm() {
        this.getvalidMobileVerifyCode(this.verifyCodeParams);
      },
      // mousedoen事件
      mousedownFn: function (e) {
        if (!this.confirmSuccess) {
          e.preventDefault && e.preventDefault();   // 阻止文字选中等 浏览器默认事件
          this.mouseMoveStata = true;
          this.beginClientX = e.clientX;
        }
      }
    },
    mounted() {
      // 页面初始化，发请求
      this.getqueryUserInfo(this.params).then(res => {
        this.form.mobile = res.mobile;
      });
      // 获取图像验证码
      this.getverifyCodeImg().then(res => {
        this.codeImg = res.verifyCodeImg;
        this.uuId = res.verifyUUID;
      });
    }
  };
</script>

