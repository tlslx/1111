<style lang="less" scoped>
  .phone {
    .phone-body {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .drag{
        position: relative;
        background-color: #e8e8e8;
        margin-bottom: 30px;
        margin-left: 23%;
        width: 77%;
        height: 34px;
        line-height: 34px;
        text-align: center;
      }
      .handler{
        width: 40px;
        height: 32px;
        border: 1px solid #ccc;
        cursor: move;
      }
      .handler_bg{
        background: #fff
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
      }
      .handler_ok_bg{
        background: #fff
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
      }
      .drag_bg{
        background-color: #7ac23c;
        height: 34px;
        width: 0px;
      }
      .drag_text{
        position: absolute;
        top: 0px;
        width: 100%;text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
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
    
     <el-tabs v-model="activeName">
      <el-tab-pane label="修改手机号" name="first">
        <div class="phone-body">
          <el-form ref="form" :rules="rules" :label-position="labelPosition" :model="form">
            <el-form-item label="原手机号" prop="mobile" placeholder="请输入原手机号">
              <el-input disabled v-model="form.mobile"></el-input>
            </el-form-item>
            <!-- <el-form-item label="新手机号" prop="newmobile" placeholder="请输入新手机号">
              <el-input v-model="form.newmobile"></el-input>
            </el-form-item> -->
            <div class="drag" ref="dragDiv">
              <div class="drag_bg"></div>
              <div class="drag_text">{{confirmWords}}</div>
              <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;"></div>
            </div>
            <!-- <el-form-item prop="verifyCodeImg">
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
            </el-form-item> -->
            <div class="yzm-btn">
              <el-input v-model="registrationYzm" placeholder="请输入短信验证码" style="width: 300px"></el-input>
              <el-button
                type="primary"
                @click="getYzm"
                style="width: 45%;margin-left: 12px;"
                v-show="!showYzm"
                :disabled="dis"
                ><span id="ant">获取验证码</span></el-button>
            </div>
            <el-form-item>
              <el-button style="width: 90px; margin-left: 12px;" type="primary" @click="getConfirm">确定</el-button>
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
        beginClientX: 0,           /*距离屏幕左端距离*/
        mouseMoveStata: false,     /*触发拖动状态  判断*/
        maxwidth: '',               /*拖动最大宽度，依据滑块宽度算出来的*/
        confirmWords: '请按住滑块，滑动到最右边',   /*滑块文字*/
        confirmSuccess: false,           /*验证成功判断*/
        dis: false,      
        codeImg: "",
        uuId: "",   
        labelPosition: 'right',
        activeName: "first",
        api: {
          getapprove: kindo.config.api.comsUrl + "/api/sysUser/account/update"
        },
        form: {
          mobile: ''
          // newmobile: ''
          // verifyCodeImg: ''
        },
        rules: {
          mobile: [
            {
              required: true,
              message: "该项不能为空",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (this.getUserInfo.mobile !== value) {
                  return callback(new Error('请输入原手机号码'));
                } else {
                  return callback();
                }
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
            { 
              validator: (rule, value, callback) => {
                if (this.getUserInfo.mobile === value) {
                  return callback(new Error('新手机号和旧手机号一致'));
                } else {
                  return callback();
                }
              },
              trigger: 'blur'
            }
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
          id: this.$store.getters.userInfo.userId
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
          mobile: _this.getUserInfo.mobile,
          tag: '',
          verifyCode: _this.registrationYzm
        };
      }
    },
    methods: {
      ...mapActions('accountInfo', ['getqueryUserInfo', 'getSendVerifyCodeInfo', 'getvalidMobileVerifyCode']),
      ...mapActions('findPwdInfo', ['getverifyCodeImg', 'getCheckVerifyCodeImg']),
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
        this.$refs['form'].validate((valid) => {
          if (valid && this.confirmSuccess) {
            let odiv = document.getElementById("ant");
            let count = 60;
            odiv.innerHTML = count + "秒后获取";
            let timer = null;
            let _this = this;
            timer = setInterval(function() {
              if (count > 0) {
                count = count - 1;
                odiv.innerHTML = count + "秒后获取";
              } else {
                clearInterval(timer);
                _this.dis = false;
                odiv.innerHTML = "获取验证码";
              }
            }, 1000);
            this.dis = true;
            this.getSendVerifyCodeInfo(this.codeParams).then(res => {
              kindo.util.alert("验证码已经发送，请注意查收短信！", '提示', 'success');
            });
          } else {
            kindo.util.alert('请先通过验证', '提示', "warning");
          }
        });
      },
      // 验证手机验证码
      getConfirm() {
        this.$refs['form'].validate((valid) => {
          if (valid && this.confirmSuccess) {
            this.getvalidMobileVerifyCode(this.verifyCodeParams).then(resT => {
              this.$router.push('/submitPhoneNum');
              // let params = {
              //   userId: this.getUserInfo.userId,
              //   mobile: this.form.newmobile
              // };
              // this.$http.post(this.api.getapprove, params).then(res => {
              //   kindo.util.alert('修改成功', '提示', 'success');
              //   this.$router.push('/accountInfo');
              // });
            });
          } else {
            kindo.util.alert('请先通过验证', '提示', "warning");
          }
        });
      },
      mousedownFn: function (e) {
        if (!this.confirmSuccess) {
          e.preventDefault && e.preventDefault();   // 阻止文字选中等 浏览器默认事件
          this.mouseMoveStata = true;
          this.beginClientX = e.clientX;
        }
      }, // mousedoen 事件
      successFunction() {
        this.confirmSuccess = true;
        this.confirmWords = '验证通过';
        if (window.addEventListener) {
          document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
          document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
        } else {
          document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {});
        }
        document.getElementsByClassName('drag_text')[0].style.color = '#fff';
        document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
      }, // 验证成功函数
      mouseMoveFn(e) {
        if (this.mouseMoveStata) {
          let width = e.clientX - this.beginClientX;
          if (width > 0 && width <= this.maxwidth) {
            document.getElementsByClassName('handler')[0].style.left = width + 'px';
            document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
          } else if (width > this.maxwidth) {
            this.successFunction();
          }
        }
      }, // mousemove事件
      moseUpFn(e) {
        this.mouseMoveStata = false;
        let width = e.clientX - this.beginClientX;
        if (width < this.maxwidth) {
          if (document.getElementsByClassName('handler')[0]) {
            document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
            document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
          }
        }
      }  // mouseup事件
    },
    mounted() {
      // 页面初始化，发请求
      this.getqueryUserInfo(this.params).then(res => {
        this.form.mobile = res.mobile;
      });
      // 获取验证条
      this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
      document.getElementsByTagName('html')[0].addEventListener('mousemove', this.mouseMoveFn);
      document.getElementsByTagName('html')[0].addEventListener('mouseup', this.moseUpFn);
      // 获取图像验证码
      // this.getverifyCodeImg().then(res => {
      //   this.codeImg = res.verifyCodeImg;
      //   this.uuId = res.verifyUUID;
      // });
    }
  };
</script>

