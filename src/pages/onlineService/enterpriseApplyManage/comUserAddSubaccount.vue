/**
 * @file 公司用户添加子账号
 * 修改人 李康  修改内容  公司用户添加子账号 改为 企业用户添加子账号
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="企业用户添加子账号" name="first">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
        >
        <el-form-item label="账号(邮箱)：" prop="email" >
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱信息" clearable maxlength="32" @blur="getRegistInfo('email')"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="userName" >
          <el-input v-model="ruleForm.userName" :disabled="isExists" placeholder="请输入姓名" clearable maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender" >
          <el-select v-model="ruleForm.gender" placeholder="请选择性别" clearable>
            <el-option v-for="item in genderOptions" :disabled="isExists" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机：" prop="phone" >
          <!--江重生 取消谷歌浏览器记住密码问题  auto-complete="new-password"-->
          <el-input v-model="ruleForm.phone" autocomplete="off" :disabled="isExists" auto-complete="new-password"  placeholder="请输入手机号" clearable maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="密码："  prop="password" >
          <!--江重生 取消谷歌浏览器记住密码问题  auto-complete="new-password"-->
          <el-input type="password" autocomplete="off"  show-password  auto-complete="new-password" clearable maxlength="32"   v-model="ruleForm.password" placeholder="请输入密码" :disabled="isExists">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="密码：" v-if="visible" prop="password" >
          <el-input type="text" onfocus="this.type='password'" :disabled="isExists"  clearable maxlength="32" onpaste="return false" oncopy="return false" v-model="ruleForm.password" placeholder="请输入密码">
            <i slot="suffix" title="显示密码" @click="changePass('show')" style="cursor:pointer;"
                class="el-input__icon iconfont icon-yanjing1"></i>
          </el-input>
        </el-form-item> -->
        <!-- <el-form-item label="密码：" v-else prop="password" >
          <el-input type="text" onpaste="return false" :disabled="isExists" clearable maxlength="32" oncopy="return false" v-model="ruleForm.password" placeholder="请输入密码">
            <i slot="suffix" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"
                class="el-input__icon iconfont icon-yanjing"></i>
          </el-input>
        </el-form-item> -->
        <el-form-item label="确认密码：" prop="confirmPassword" >
          <el-input type="password" show-password autocomplete="off" clearable v-model="ruleForm.confirmPassword" placeholder="请再次确认密码" :disabled="isExists">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码：" v-else prop="confirmPassword" >
          <el-input type="text" onpaste="return false" clearable maxlength="32" oncopy="return false" v-model="ruleForm.confirmPassword" placeholder="请再次确认密码" :disabled="isExists">
            <i slot="suffix" title="隐藏密码" @click="confirmChangePass('hideConfirm')" style="cursor:pointer;"
                class="el-input__icon iconfont icon-yanjing"></i>
          </el-input> -->
        <!-- </el-form-item> -->
        <el-form-item label="所属部门：" prop="department" >
          <el-input v-model="ruleForm.department" placeholder="请输入所属部门" clearable maxlength="16" :disabled="isExists"></el-input>
        </el-form-item>
        <el-form-item label="职位：" prop="post">
          <el-select clearable v-model="ruleForm.post" placeholder="请选择职位"  :disabled="isExists">
            <el-option v-for="item in postOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固定电话：" prop="tel" >
          <el-input v-model="ruleForm.tel" placeholder="请输入固定电话" clearable maxlength="16" :disabled="isExists"></el-input>
        </el-form-item>
        <el-form-item label="授权管理展区：" prop="allowArea" >
          <el-select v-model="regions" @change="changeRegions" multiple :multiple-limit="limitSelect" placeholder="请选择" clearable >
            <el-option
              v-for="item in allowAreaOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn" type="danger" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
          <el-button class="btn" @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
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
      // if (pwdRule.test(value)) {
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
    return {
      visible: true,
      isExists: false,
      isUpdate: false,
      toAccountId: "",
      regions: [],
      // tab
      activeName: "first",
      limitSelect: 10,
      fullscreenLoading: false,
      // 表单对象
      ruleForm: {
        // 姓名
        userName: "",
        // 性别
        gender: "",
        // 手机
        phone: "",
        // 电话
        tel: "",
        // 邮箱
        email: "",
        // 部门
        department: "",
        // 职务
        post: "",
        password: "",
        confirmPassword: "",
        // 展区
        allowArea: ""
      },
      // 性别数组
      genderOptions: [
        {
          text: "女",
          value: "2"
        },
        {
          text: "男",
          value: "1"
        }
      ],
      // 展区数组
      allowAreaOptions: [],
      // 部门数组
      departmentOptions: [],
      // 职务数组
      postOptions: [],
      // 校验
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
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^(1[0-9])\d{9}$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的手机号"));
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
          { required: true, message: "请输入所属部门", trigger: "blur" }
        ],
        post: [{ required: true, message: "请选择职位", trigger: "change" }],
        tel: [
          {
            required: true,
            // pattern: /^[0-9]*$/,
            message: "请输入正确的固话",
            trigger: "blur"
          },
          // {
          //   max: 8,
          //   message: "位数不能超过8位",
          //   trigger: "blur"
          // },
          // 修改人: 李康   将上面的一条校验注释了 下面修改了固定电话的校验规则
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /(^(0\d{2})-(\d{7,8})$)|(^(0\d{3})-(\d{7,8})$)|(^(0\d{2})-(\d{7,8})-(\d+)$)|(^(0\d{3})-(\d{7,8})-(\d+)$)/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的固定电话号码"));
              }
              callback(errors);
            },
            trigger: "blur"
          }

        ],
        allowArea: [
          { required: true, message: "请选择授权管理区", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('enterpriseRegister', [])
  },
  async beforeCreate() {
    this.postOptions = await kindo.dictionary.get('post'); // 职位字典
  },
  // 修改人: 张文建   250行改为249行
  created() {
    // 获取字典，并赋值所有下拉数组
    // this.postOptions = dictData.post;
    this.postOptions = kindo.dictionary.get('post');
    this.allowAreaOptions = kindo.dictionary.get('exhibitionArea');
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.allowAreaOptions.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.allowAreaOptions.splice(deleteIndex, 1);
      }
    });
    // this.allowAreaOptions = dictData.allowArea.sort((a, b) => a.text.charCodeAt(0) - b.text.charCodeAt(0));
  },
  methods: {
    ...mapActions('enterpriseRegister', ['companyAddSubAccountInfo']),
    ...mapActions("personalRegister", [
      "checkPersonalInfoEmail",
      "companyAddSubAccountByEmailInfo", // 根据邮箱获取用户信息
      "updateStatusInfo", // 若公司用户添加子账户根据邮箱有返回数据则更新状态
      "checkSubAccountMsgByPhoneInfo" // 根据手机获取用户信息
    ]),
    changePass(value) {
      this.visible = !(value === 'show');
    },  //判断渲染，true:暗文显示，false:明文显示
    // confirmChangePass(value) {
    //   this.confirmVisible = !(value === 'showConfirm');
    // },
    // 提交
    submitForm(formName) {
      if (this.isUpdate === false) {
        this.fullscreenLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.linkStatus = "1";
            this.ruleForm.companyId = this.$store.state.userInfo.companyId;
            let param = {
              "companyAddSubAccountSession": this.ruleForm
            };
            this.companyAddSubAccountInfo(param).then(res => {
              this.fullscreenLoading = false;
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.$router.push("/checkAssociatedCompanyUser");
            }).catch(e => {
              this.fullscreenLoading = false;
              this.$message({
                type: 'info',
                message: e
              });
            });
          } else {
            this.fullscreenLoading = false;
            this.$message({
              type: 'error',
              message: '请检查所有信息是否填写正确'
            });
            return false;
          }
        });
      } else {
        let params = {
          accountId: this.toAccountId,
          companyId: localStorage.getItem("getComPanyId"),
          allowArea: this.ruleForm.allowArea
        };
        this.updateStatusInfo(params).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
          this.$router.push("/checkAssociatedCompanyUser");
        });
      }

    },
    // 邮箱查重 如果已经注册带出注册信息
    getRegistInfo(val) {
      let _this = this;
      if (this.ruleForm.email && val === 'email') {
        this.companyAddSubAccountByEmailInfo(this.ruleForm.email).then(res => {
          if (res.accountId) {
            this.$message({
              type: 'info',
              message: '该邮箱已存在用户'
            });
            this.isUpdate = true;
            this.isExists = true;
            for (let key in res) {
              for (let key1 in _this.ruleForm) {
                if (key === key1) {
                  _this.ruleForm[key1] = res[key];
                }
              }
            }
            // this.ruleForm = res;
            _this.ruleForm.confirmPassword = res.password;
            _this.toAccountId = res.accountId;
            _this.regions = res.allowArea.split(",");
          } else {
            this.isExists = false;
            this.ruleForm.gender = "";
            this.ruleForm.userName = "";
            this.ruleForm.phone = "";
            this.ruleForm.tel = "";
            this.ruleForm.department = "";
            this.ruleForm.post = "";
            this.ruleForm.password = "";
            this.ruleForm.confirmPassword = "";
            this.ruleForm.allowArea = "";
          }
        });
      } else if (this.ruleForm.phone && val === 'phone') {
        this.checkSubAccountMsgByPhoneInfo(this.ruleForm.phone).then(res => {
          if (res.accountId) {
            this.$message({
              type: 'info',
              message: '该手机号已存在用户'
            });
            this.isUpdate = true;
            this.isExists = true;
            for (let key in res) {
              for (let key1 in _this.ruleForm) {
                if (key === key1) {
                  _this.ruleForm[key1] = res[key];
                }
              }
            }
            // this.ruleForm = res;
            _this.ruleForm.confirmPassword = res.password;
            _this.toAccountId = res.accountId;
          } else {
            this.isExists = false;
            this.ruleForm.gender = "";
            this.ruleForm.userName = "";
            this.ruleForm.phone = "";
            this.ruleForm.tel = "";
            this.ruleForm.department = "";
            this.ruleForm.post = "";
            this.ruleForm.password = "";
            this.ruleForm.confirmPassword = "";
            this.ruleForm.allowArea = "";
          }
        });

      }

    },
    // 多选授权管理展区转换
    changeRegions(val) {
      this.ruleForm.allowArea = val.join(',');
    },
    // 取消
    resetForm() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.el-form-item {
  width: 500px;
  position: relative;
  left: 20%;
  margin-bottom: 22px;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin-top: 50px;
}
.cb_confirm{
  position: relative;
  left: 28%;
  margin-top: 20px;
}
.btn {
  width: 120px;
  height: 40px;
}
</style>


