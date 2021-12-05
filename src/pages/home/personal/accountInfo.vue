<style lang="less" scoped>
.account-info {
  .account-body {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .accountBind {
    width: 100%;
    margin-top: 30px;
    .accountBindRow {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      margin: 0 0 20px 0;
      .bindImg {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: aquamarine;
      }
      .bindTitle {
        width: 10%;
        line-height: 40px;
        margin-left: 20px;
      }
      .bindStatus {
        width: 20%;
        color: aquamarine;
        line-height: 40px;
      }
      .bindStatusC {
        width: 20%;
        color: orange;
        line-height: 40px;
      }
    }
  }
  .el-form-item {
    margin: 20px 0;
  }
  .revise {
    color: #f56c6c;
    cursor: pointer;
  }
  .change-Pwd {
    display: flex;
    justify-content:center;
    margin-top: 30px;
    .el-form-item {
      margin: 30px 0;
    }
  }
}
</style>

<template>
  <!-- 账户管理 -->
  <div class="account-info">
    <!-- {{getUserInfo}} -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <div class="account-body">
          <el-form style="width: 35%" ref="form" :rules="rules" :label-position="labelPosition" :model="form">
            <el-form-item label="名称" prop="userName">
              <span>{{getUserInfo.userName}}</span>
              <!-- <el-input v-model="form.userName"></el-input> -->
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <span>{{getUserInfo.account}}</span>
              <!-- <el-input v-model="form.account"></el-input> -->
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <span>{{getUserInfo.mobile}}</span>
              <a class="revise" @click="revisePhone">修改</a>
            </el-form-item>
            <!-- <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item> -->
            <el-form-item label="邮箱" prop="email">
              <span>{{getUserInfo.email}}</span>
              <a class="revise" @click="reviseEmail">修改</a>
            </el-form-item>
            <!-- <el-form-item label="联系地址" prop="addr">
              <el-input type="textarea" v-model="form.addr"></el-input>
            </el-form-item> -->
            <!-- <el-form-item>
              <el-button style="width: 90px;" type="primary" @click="submitForm('form')">保存</el-button>
            </el-form-item> -->
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <div class="change-Pwd">
          <el-form
            label-width="100px"
            :rules="formRule"
            ref="changePwdForm"
            style="width: 35%"
            :model="formVal">
            <el-form-item>
              <!-- 密码规则：6-18位，且必须包含1位字母、1位数字及1位特殊符号  -->
            </el-form-item>
            <el-form-item prop="oldPwd" label="旧密码">
              <el-input v-model="formVal.oldPwd" autocomplete="off" type="password" minlength= "6" maxlength= "18"></el-input>
            </el-form-item>
            <el-form-item prop="newPwd" label="新密码">
              <!-- <el-input v-model="formVal.newPwd" type="password" min="6" max="18"></el-input> -->
              <el-input v-model="formVal.newPwd" autocomplete="off" type="password" minlength= "6" maxlength= "18"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd" label="确认新密码">
              <el-input v-model="formVal.confirmPwd" autocomplete="off" type="password" minlength= "6" maxlength= "18"></el-input>
            </el-form-item>
            <el-form-item style="text-align: left;" label-width="100px">
              <!-- <el-button style="width: 90px;" @click="close">取消</el-button> -->
              <el-button style="width: 90px;" type="primary" @click="handleConfirm">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="第三方绑定" name="second">
        <div class="accountBind">
          <div class="accountBindRow">
            <div class="bindImg"></div>
            <div class="bindTitle">绑定QQ账号</div>
            <div class="bindStatus" v-if="bindStatusQQ">已绑定</div>
            <div class="bindStatusC" v-if="!bindStatusQQ">未绑定</div>
            <el-button :type="typeToBind" style="width: 90px;" @click="toBind" v-if="!bindStatusQQ">绑定</el-button>
            <el-button :type="typeToClose" style="width: 90px;" @click="toBindClose" v-if="bindStatusQQ">解除绑定</el-button>
          </div>
          <div class="accountBindRow">
            <div class="bindImg"></div>
            <div class="bindTitle">绑定微信账号</div>
            <div class="bindStatus" v-if="bindStatusWX">已绑定</div>
            <div class="bindStatusC" v-if="!bindStatusWX">未绑定</div>
            <el-button :type="typeToBind" style="width: 90px;" @click="toBind" v-if="!bindStatusWX">绑定</el-button>
            <el-button :type="typeToClose" style="width: 90px;" @click="toBindClose" v-if="bindStatusWX">解除绑定</el-button>
          </div>
        </div>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "accountInfoList",
  data() {
    return {
      bindStatusQQ: true,
      bindStatusWX: false,
      typeToClose: '',
      typeToBind: 'warning',
      activeName: 'first',
      labelPosition: 'right',
      form: {
        userName: '',
        account: '',
        mobile: '',
        email: ''
      },
      formVal: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符'
          },
          {
            pattern: /^[\u4E00-\u9FA5]+$/,
            message: '用户名只能为中文'
          }
        ],
        account: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          },
          {
            required: true,
            message: "您输入的账号过于简单",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "该项不能为空",
            trigger: "blur"
          },
          {
            pattern: /^[1-9]\d*$/,
            message: "联系电话为数字"
          }
        ]
      },
      formRule: {
        oldPwd: [
          { required: true, message: "请填写旧密码", trigger: "blur" }
        ],
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
        ]
      }
    };
  },
  computed: {
    ...mapGetters('accountInfo', ['getUserInfo', 'updateUserInfo']),
    // 请求参数ID
    params() {
      return {
        id: this.$store.getters.userInfo.userId
      };
    }
    // updateParams(res) {
    //   return {
    //     id: this.$store.getters.userInfo.userId,
    //     account: ''
    //   };
    // }
  },
  created() {
    this._formVal = Object.assign({}, this.formVal);
  },
  methods: {
    ...mapActions('accountInfo', ['getqueryUserInfo', 'getupdateUserInfo']),
    submitForm() {
      let _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          let id = this.$store.getters.userInfo.userId;
          const param = {
            id: id,
            account: _this.form.account,
            userName: _this.form.userName,
            phone: this.getUserInfo.phone,
            addr: this.getUserInfo.addr,
            mobile: this.getUserInfo.mobile,
            email: this.getUserInfo.email,
            birthdate: this.getUserInfo.birthdate,
            endDate: this.getUserInfo.endDate,
            idCardNo: this.getUserInfo.idCardNo ? this.getUserInfo.idCardNo : '',
            nationality: this.getUserInfo.nationality,
            sex: this.getUserInfo.sex ? this.getUserInfo.sex : '',
            // nationality: (this.getUserInfo.nationality) ? null : '中国',
            password: (this.getUserInfo.password) ? null : 'admin',
            // sex: (this.getUserInfo.sex) ? null : '女',
            startDate: this.getUserInfo.startDate,
            userId: this.getUserInfo.userId
          };
          _this.$http
          .post("/openapi/common/user/update", param)
          .then(data => {
            _this.$message.success("修改成功");
          })
          .catch(e => {
            _this.$message.error(e.message);
          });
        } else {
          _this.$message.error("请填写正确信息!");
        }
      });
    },
    toBindClose() {
      this.$confirm('解绑后您将不能使用QQ账号登录系统', '解除QQ绑定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '绑定成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解绑'
        });          
      });
    },
    toBind() {
      //console.log("binding");
    },
    handleClick(tab, event) {
      //console.log(tab, event);
    },
    handleConfirm() {
      let _this = this;
      this.$refs.changePwdForm.validate(valid => {
        if (valid) {
          let id = this.$store.getters.userInfo.userId;
          const param = {
            id: id,
            oldPwd: _this.formVal.oldPwd,
            newPwd: _this.formVal.newPwd,
            newPwd2: _this.formVal.confirmPwd
          };
          _this.$http
            .post("/openapi/common/account/updatePwd", param)
            .then(data => {
              this.formVal = Object.assign({}, this._formVal);
              _this.$message.success("修改成功");
            })
            .catch(e => {
              _this.$message.error(e.message);
            });
        } else {
          _this.$message.error("请填写正确信息!");
        }
      });
    },
    // 跳转至修改手机号码页面
    revisePhone() {
      if (this.getUserInfo.mobile) {
        this.$router.push('/revisePhoneNum');
      } else {
        this.$router.push('/submitPhoneNum');
      }
      // this.$router.push('/revisePhoneNum');
    },
    // 跳转至修改邮件页面
    reviseEmail() {
      if (this.getUserInfo.email) {
        this.$router.push('/reviseEmail');
      } else {
        this.$router.push('/submitEmail');
      }
      // this.$router.push('/reviseEmail');
    }
  },
  mounted() {
    // 页面初始化，发请求
    this.getqueryUserInfo(this.params).then(res => {
      this.form.userName = res.userName;
      this.form.account = res.account;
      this.form.phone = res.phone;
      this.form.addr = res.addr;
    });
    // this.getupdateUserInfo(this.updateParams);
  }
};
</script>
