<template>
  <el-page ref="userLogin">
    <template slot="header">
      <kindo-box title="用户登录"></kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="个人用户" name="personalUser">
                <el-form ref="personalForm" :model="personalForm" label-position="right" :rules="personalRules">
                  <el-row type="flex" justify="start">
                    <el-col :span="12">
                      <el-form-item label="用户名：" label-width="80px" prop="username">
                        <el-input autocomplete="off" v-model="personalForm.username" class="loginclass" placeholder="手机/邮箱/身份证"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="start">
                    <el-col :span="12">
                      <el-form-item label="密码：" label-width="80px" prop="password">
                        <el-input type="password" autocomplete="off" v-model="personalForm.password" class="loginclass" placeholder="请输入密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="start">
                    <el-col :span="10">
                      <el-form-item label="验证码：" label-width="80px">
                        <el-input v-model="personalForm.verificationCode" class="inputclass" placeholder="请输入验证码"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label-width="1px">
                        <span>验证码图片</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row :gutter="20">
                  <el-col :span="4" :offset="3">
                    <div class="userlogin-item">
                      <el-checkbox v-model="checked">记住密码</el-checkbox>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="userlogin-item">
                      <a class="userlogin-forget">忘记密码</a>
                      <span>|</span>
                      <a @click="regiter" class="userlogin-register">注册</a>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="4" :offset="3">
                    <div class="userlogin-footer">
                      <el-button type="danger" @click="personalLogin" class="userlogin-login">登录</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>

              <el-tab-pane label="企业用户" name="enterpriseUser">
                <el-form ref="enterpriseForm" :model="enterpriseForm" label-position="right" :rules="enterpriseRules">
                  <el-row type="flex" justify="start">
                    <el-col :span="12">
                      <el-form-item label="用户名：" label-width="80px" prop="username">
                        <el-input autocomplete="off" v-model="enterpriseForm.username" class="loginclass" placeholder="企业名称/企业编码/联系人手机"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="start">
                    <el-col :span="12">
                      <el-form-item label="密码：" label-width="80px" prop="password">
                        <el-input autocomplete="off" type="password" v-model="enterpriseForm.password" class="loginclass" placeholder="请输入密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="start">
                    <el-col :span="10">
                      <el-form-item label="验证码：" label-width="80px">
                        <el-input v-model="enterpriseForm.verificationCode" class="inputclass" placeholder="请输入验证码"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label-width="1px">
                        <span>验证码图片</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row :gutter="20">
                  <el-col :span="4" :offset="3">
                    <div class="userlogin-item">
                      <el-checkbox v-model="checked">记住密码</el-checkbox>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="userlogin-item">
                      <a class="userlogin-forget">忘记密码</a>
                      <span>|</span>
                      <a @click="regiter" class="userlogin-register">注册</a>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="4" :offset="3">
                    <div class="userlogin-footer">
                      <el-button type="danger" @click="enterpriseLogin" class="userlogin-login">登录</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>

              <el-tab-pane label="合作机构" name="cooperationAgency">
                <el-form ref="cptAgencyForm" :model="cptAgencyForm" label-position="right" :rules="cptAgencyRules">
                  <el-row type="flex" justify="start">
                    <el-col :span="12">
                      <el-form-item label="用户名：" label-width="80px" prop="username">
                        <el-input autocomplete="off" v-model="cptAgencyForm.username" class="loginclass" placeholder="机构编码/手机"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="start">
                    <el-col :span="12">
                      <el-form-item label="密码：" label-width="80px" prop="password">
                        <el-input autocomplete="off" type="password" v-model="cptAgencyForm.password" class="loginclass" placeholder="请输入密码" show-password></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="start">
                    <el-col :span="10">
                      <el-form-item label="验证码：" label-width="80px">
                        <el-input v-model="cptAgencyForm.verificationCode" class="inputclass" placeholder="请输入验证码"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label-width="1px">
                        <span>验证码图片</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-row :gutter="20">
                  <el-col :span="4" :offset="3">
                    <div class="userlogin-item">
                      <el-checkbox v-model="checked">记住密码</el-checkbox>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="userlogin-item">
                      <a class="userlogin-forget">忘记密码</a>
                      <span>|</span>
                      <a @click="regiter" class="userlogin-register">注册</a>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="4" :offset="3">
                    <div class="userlogin-footer">
                      <el-button type="danger" @click="cptAgencyLogin" class="userlogin-login">登录</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
export default {
  name: "userLogin",
  data() {
    return {
      activeName: "personalUser",
      personalForm: {
        password: ""
      },
      enterpriseForm: {},
      cptAgencyForm: {},
      personalRules: {
        username: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      enterpriseRules: {
        username: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      cptAgencyRules: {
        username: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        password: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      checked: false
    };
  },
  mounted() { },
  methods: {
    handleClick(tab) { },
    personalLogin() {
      this.$refs.personalForm.validate(valid => {
        if (valid) {
          //表数据
          let uri = "";
          let formParams = {
            json: {
              formData: JSON.stringify(this.personalForm)
            }
          };
          this.$http.post(uri, formParams).then(res => {

          }, err => {
            this.$message.error(err);
          });
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    enterpriseLogin() { },
    cptAgencyLogin() { },
    regiter() { }
  }
};
</script>
<style>
.userlogin-item {
  margin-top: 10px;
}
.userlogin-footer {
  margin-top: 20px;
  margin-bottom: 20px;
}
.userlogin-login {
  width: 120px;
  height: 30px;
}
.userlogin-item .userlogin-forget {
  cursor: pointer;
  color: #909399;
}
.userlogin-item .userlogin-register {
  cursor: pointer;
  color: #409eff;
}
.loginclass {
  width: 250px;
}
</style>

