/**
 * @file 个人注册
 */
<style scoped>
.el-tabs__header {
  margin-bottom: 25px;
}
.el-form-item {
  margin-bottom: 25px;
}
.el-form-item-btn {
  margin: 25px 0;
}
.cb_confirm {
  display: block;
  text-align: center;
}
.personal-register-btn-container {
  margin: 15px 0;
  text-align: center;
}
.personal-user-register-form >>> .el-checkbox {
  margin-right: 0;
}
.register-privacy-container >>> .el-dialog {
  margin-top: 5vh;
  height: 80%;
  overflow-y: scroll;
}
.register-privacy-container >>> .el-dialog__header {
  height: 22px;
}
.register-privacy-container >>> .el-dialog__body {
  padding: 0 50px;
  height: calc(100% - 150px);
}
.register-privacy-container >>> .el-button {
  position: relative;
  left: 50%;
  margin-left: -45px;
  margin-bottom: 20px;
}
</style>
<template>
  <div v-loading="loading">
    <div style="margin-bottom: 7px;color: #d80c18;">说明: 此处注册的个人用户经本企业授权可进行展品维护等，不可申请广交会展位。</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="personal-user-register-form"
      :label-position="labelPosition">
      <el-form-item label="账号（邮箱）：" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入邮箱信息" clearable maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入姓名" clearable maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-select v-model="ruleForm.gender" placeholder="请选择性别" clearable>
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机：" prop="phone">
        <!-- 江重生 去除浏览器input自动填充效果  auto-complete="new-password" -->
        <el-input v-model="ruleForm.phone" auto-complete="new-password" placeholder="请输入手机号" clearable maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="密码：" v-if="visible" prop="password">
        <!-- 江重生 去除浏览器input自动填充效果  auto-complete="new-password"-->
        <el-input type="text" auto-complete="new-password" onfocus="this.type='password'" clearable maxlength="32" show-password onpaste="return false" oncopy="return false" v-model="ruleForm.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="密码：" v-else prop="password">
        <el-input type="text" onpaste="return false" clearable maxlength="32" oncopy="return false" v-model="ruleForm.password" placeholder="请输入密码">
          <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"
              class="el-input__icon iconfont icon-yanjing"></i>
        </el-input>
      </el-form-item> -->
      <el-form-item label="确认密码：" v-if="confirmVisible" prop="confirmPassword">
        <el-input type="text" onfocus="this.type='password'" clearable maxlength="32" show-password onpaste="return false" oncopy="return false" v-model="ruleForm.confirmPassword" placeholder="请再次确认密码">
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="确认密码：" v-else prop="confirmPassword">
        <el-input type="text" onpaste="return false" clearable maxlength="32" oncopy="return false" v-model="ruleForm.confirmPassword" placeholder="请再次确认密码">
          <i slot="suffix" title="隐藏密码" @click="confirmChangePass('hideConfirm')" style="cursor:pointer;"
              class="el-input__icon iconfont icon-yanjing"></i>
        </el-input>
      </el-form-item> -->
      <el-form-item label="所属部门：" prop="department">
        <el-input v-model="ruleForm.department" placeholder="请输入所属部门" clearable maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="职位：" prop="post">
        <el-select clearable v-model="ruleForm.post" placeholder="请选择职位">
          <el-option
            v-for="item in postion"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="固定电话：" prop="tel">
        <el-input v-model="ruleForm.tel" placeholder="请输入固定电话" clearable maxlength="16"></el-input>
      </el-form-item>
      <div style="text-align: center;">
        <el-checkbox style="margin-right: 0;" v-model="checked" class="cb_confirm" label="我已阅知并愿意遵守" name="type"></el-checkbox>
        <a href="#" @click="showPrivacy">《隐私条款》</a>
      </div>
      <!-- <el-form-item class="el-form-item-btn">
        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
      </el-form-item> -->
    </el-form>
    <div class="personal-register-btn-container">
      
      <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
    </div>
    <el-dialog class="register-privacy-container" :visible.sync="privacyDialogVisible">
      <privacy-policy></privacy-policy>
      <el-button type="primary" @click="confirmPrivacy">确 定</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import privacyPolicy from "./privacyPolicy";
export default {
  components: {
    'privacy-policy': privacyPolicy
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        return callback(new Error("两次输入密码不一致!"));
      } else {
        return callback();
      }
    };
    let passwordStrength = (rule, value, callback) => {
      // let regRule = /[\u4e00-\u9fa5\uFF00-\uFFFF]/;
      // let pwdRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/i;
      // if (regRule.test(value)) {
      //   return callback(new Error("不能包含中文"));
      // }
      // if (value.length < 6) {
      //   return callback(new Error("密码位数不能少于6位"));
      // }
      // if (!pwdRule.test(value)) {
      //   return callback(new Error("同时包含字母数字特殊字符"));
      // }
      // return callback();
      let regRule = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*.]+$)[a-zA-Z\d!@#$%^&*.]{6,20}$/;
      if (!regRule.test(value)) {
        return callback(new Error("请输入6-20位数字、字母、特殊字符，任意两种组成的密码"));
      }
      return callback();
    };
    // 邮箱检验
    let blurInput = (rule, val, callback) => {
      this.checkPersonalInfoEmail({ "email": val }).then(res => {
        if (res === false) {
          return callback(new Error("邮箱重复设置"));
        }
        return callback();
      });
    };
    let checkCn = (rule, value, callback) => {
      let checkChineseName = this.$store.state.common.CHECK_CONST_DATA.enterpriceNameCh;
      if (!checkChineseName.test(value)) {
        return callback(new Error("必须包含汉字，不允许半角括号"));
      }
      return callback();
    };
    return {
      labelPosition: 'left',
      // 隐私政策
      privacyDialogVisible: false,
      visible: true,
      confirmVisible: true,
      checked: false,
      loading: false,
      emailDate: false,
      // 性别数组
      genderOptions: [],
      ruleForm: {
        email: "",
        userName: "",
        gender: "",
        phone: "",
        password: "",
        confirmPassword: "",
        department: "",
        post: "",
        tel: "",
        isRead: "0"
      },
      emailParams: {
        "email": ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱信息",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          },
          {
            validator: blurInput,
            trigger: "change"
          }
        ],
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" },
          { validator: checkCn, trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = this.$store.state.common.CHECK_CONST_DATA.telephone;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的手机号"));
              } else if (value === '') {
                errors.push(new Error("请输入手机号"));
              }
              callback(errors);
            },
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true, message: "请输入密码", trigger: "blur"
          },
          {
            validator: passwordStrength,
            trigger: "blur"
          }
        ],
        confirmPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入所属部门", trigger: "blur" },
          { validator: checkCn, trigger: "blur" }
        ],
        post: [{ required: true, message: "请选择职位", trigger: "change" }],
        tel: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = this.$store.state.common.CHECK_CONST_DATA.phone;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的固话，区号和号码中间用'-'连接"));
              } else if (value === '') {
                errors.push(new Error("请输入固话"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          {
            max: 20,
            message: "位数不能超过20位",
            trigger: "blur"
          }
        ]
      },
      postion: []
    };
  },
  // beforeDestory() {
  //   this.ruleForm = {
  //     email: "",
  //     userName: "",
  //     gender: "",
  //     phone: "",
  //     password: "",
  //     confirmPassword: "",
  //     department: "",
  //     post: "",
  //     tel: "",
  //     isRed: "0"
  //   };
  // },
  async beforeCreate () {
    // 读取数据字典--注册页拿不到token后续换接口
    this.postion = await kindo.dictionary.getOpen('post'); // 职位
    this.genderOptions = await kindo.dictionary.getOpen('gender'); // 性别
  },
  created() {
    // if (localStorage.getItem('dictData')) {
    //   this.postion = localStorage.getItem('dictData').post;
    //   this.genderOptions = localStorage.getItem('dictData').gender;
    // }
  },
  computed: {
    ...mapGetters("personalRegister", ["getStatus", "checkPersonalEmailInfo"])
  },
  methods: {
    ...mapActions("personalRegister", ["personalRegistration", "checkPersonalInfoEmail"]),
    // 查看隐私条款
    showPrivacy() {
      this.privacyDialogVisible = !this.privacyDialogVisible;
    },
    // 关闭隐私条款窗口
    confirmPrivacy() {
      this.privacyDialogVisible = false;
    },
    handleClick(tab, event) {},
    // 表单提交数据
    submitForm() {
      // this.$router.push("/login");  江重生 测试可行
      if (this.checked) {
        this.ruleForm.isRead = "1";
        let _this = this;
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.loading = true;
            let newObject = {};
            newObject.personalInfoSession = _this.ruleForm;
            _this
              .personalRegistration(newObject)
              .then(res => {
                this.loading = false;
                this.$confirm("注册成功！", "提示信息", {
                  type: "success",
                  showCancelButton: false,
                  showConfirmButton: false,
                  center: true
                });
                // 江重生 成功后push到login ，未测，接口前push是ok的
                _this.$router.push("/login");
              })
              .catch(e => {
                this.loading = false;
                _this.$message.error(e);
                // _this.$message.error("注册时发生错误，请联系管理员");
              });
          } else {
            // this.$message.error("您输入的信息有误");
          }
        });
      } else {
        this.$message.error("请仔细阅读隐私条款后确认并提交");
      }
    }
    // changePass(value) {
    //   this.visible = !(value === 'show');
    // }  //判断渲染，true:暗文显示，false:明文显示
    // confirmChangePass(value) {
    //   this.confirmVisible = !(value === 'showConfirm');
    // }
  }
};
</script>



