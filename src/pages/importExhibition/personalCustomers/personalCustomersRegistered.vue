<template>
  <el-page class="registered">
    <template slot="header">
      <div style="text-align:center;">
        <div class="top-logo">
          <div class="top-logo-left">
            <img src="/static/importExhibitionImg/u2.png">
          </div>
          <div class="top-logo-right">
            已有账号，
            <a href="###" style="color:rgb(255, 153, 0);">马上登陆</a>
          </div>
        </div>
        <div>
          <img src="/static/importExhibitionImg/u0.png">
        </div>
        <div class="navigation-text">填写基本信息</div>
      </div>
      <el-form :model="form" class="body1" :rules="rules" ref="form" inline-message="true">
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <el-steps align-center :active="current" finish-status="success">
              <el-step title="选择类型"></el-step>
              <el-step title="基本信息"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </el-col>
        </el-row>
        <!-- 个人用户注册导航页面 -->
        <div v-show="current === 1" style="width:40%;margin:10px auto;">
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <img
                  src="/static/importExhibitionImg/u30.png"
                  width="100px"
                  height="100px"
                  @click="current = 2"
                >
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <img src="/static/importExhibitionImg/u28.png" width="100px" height="100px">
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- 个人用户注册基本信息页面 -->
        <div v-show="current === 2">
          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="用户名：" prop="userId">
                <el-input v-model="form.userId" disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="设置密码：" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="确认密码：" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" placeholder="请再次输入相同密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="邀请码：" prop="inviteCode">
                <el-input placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="性别：" prop="sex">
                <el-radio v-model="form.sex" label="1">男</el-radio>
                <el-radio v-model="form.sex" label="0">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="身份证号：" prop="idCardNo">
                <el-input v-model="form.idCardNo" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="6">
              <el-form-item label="手机号：" prop="phonenumber">
                <el-input v-model="form.phonenumber" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label-width="1px">
                <el-button>发送验证码</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="验证码：" prop="verificationCode">
                <el-input v-model="form.verificationCode" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="固定电话：" prop="fixedPhone">
                <el-input v-model="form.fixedPhone" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="邮箱：" prop="mail">
                <el-input v-model="form.mail" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="职位：" prop="position">
                <el-input v-model="form.position" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="7">
              <el-form-item label="所在部门：" prop="department">
                <el-input v-model="form.department" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-form-item>
              <el-button @click="current = 1">上一步</el-button>
              <el-button type="danger" @click="submitForm">下一步</el-button>
            </el-form-item>
          </el-row>
        </div>
        <!-- 完成注册页面 -->
        <div v-show="current === 3" style="width:40%;margin:10px auto;">
          <el-row>
            <el-col :span="20" :offset="6">
              <div>
                我们已向您的注册手机
                <span style="color:red;">15524855555</span>发送了
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-top:15px;">
            <el-col :span="20" :offset="7">
              <div>账号激活连接，点击连接完成账号激活</div>
            </el-col>
          </el-row>
          <el-row style="margin-top:30px;">
            <el-col :span="20" :offset="7">
              <el-button type="danger" style="width:200px;height:50px;">我知道了</el-button>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="20" :offset="6">请注意查收激活连接，并按短信提示操作，完成安全认证。</el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="20" :offset="6">
              没有收到？
              <a href="###">重新发送</a>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  name: "InfoIfiPersonUser",
  mixins: [listPageBase],
  data() {
    return {
      current: 1,
      form: {
        userId: "",
        confirmPassword: "",
        password: "",
        name: "",
        sex: "",
        idCardNo: "",
        phonenumber: "",
        fixedPhone: "",
        mail: "",
        position: "",
        department: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 0, max: 32, message: "请输入最多16个字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 0, max: 6, message: "请输入最多6个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 0, max: 6, message: "请输入最多6个字", trigger: "blur" }
        ],
        idCardNo: [
          { required: true, message: "请输入您的身份证号", trigger: "blur" },
          { min: 0, max: 18, message: "输入内容有误", trigger: "blur" }
        ],
        phonenumber: [
          { required: true, message: "请输入您的手机号", trigger: "blur" },
          { min: 0, max: 11, message: "输入内容有误", trigger: "blur" }
        ],
        verificationCode: [
          { required: true, message: "请输入您的验证码", trigger: "blur" },
          { min: 0, max: 11, message: "输入内容有误", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入您的邮箱地址", trigger: "blur" },
          { min: 0, max: 11, message: "输入内容有误", trigger: "blur" }
        ]
      }
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    submitForm() {
      var _this = this;
      this.$http
        .post("/api/infoIfiPersonUser/addPersonalUser", this.form)
        .then(function(result) {
          if (result.flag === "1") {
            _this.$message({
              showClose: true,
              message: result.message,
              type: "success"
            });
            _this.current = _this.current + 1;
          } else {
            _this.$message({
              showClose: true,
              message: result.message,
              type: "error"
            });
          }
        });
    },
    loadData() {
      var _this = this;
      this.$http
        .get("/api/infoIfiPersonUser/autoGenerateUserId", {})
        .then(function(result) {
          _this.form.userId = result;
        });
    }
  }
};
</script>

<style scoped>
.registered {
  overflow-y: auto;
}
.top-logo {
  height: 60px;
  width: 80%;
  margin: 0 auto;
}
.top-logo-left {
  float: left;
}
.top-logo-right {
  height: 30px;
  float: right;
  margin-top: 30px;
}
.navigation-text {
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 18px;
  text-align: left;
  font-weight: bold;
}
.navigation-title {
  height: 50px;
  margin-top: 10px;
}

.navigation-select {
  float: left;
  margin: 0 auto;
  margin-top: 200px;
}

.body1 {
  margin-top: 50px;
}
</style>

