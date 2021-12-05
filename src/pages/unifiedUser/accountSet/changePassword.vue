<style lang="less" scoped>
  .change-Pwd {
    display: flex;
    justify-content:center;
    margin-top: 30px;
    .el-form-item {
      margin: 30px 0;
    }
  }
</style>

<template>
  <div>
    <!-- 修改密码页面 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="修改密码" name="first">
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
              <el-input v-model="formVal.oldPwd" type="password" minlength= "6" maxlength= "18" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="newPwd" label="新密码">
              <!-- <el-input v-model="formVal.newPwd" type="password" min="6" max="18"></el-input> -->
              <el-input v-model="formVal.newPwd" type="password" minlength= "6" maxlength= "18" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd" label="确认新密码">
              <el-input v-model="formVal.confirmPwd" type="password" minlength= "6" maxlength= "18" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item style="text-align: left;" label-width="100px">
              <!-- <el-button style="width: 90px;" @click="close">取消</el-button> -->
              <el-button style="width: 90px;" type="primary" @click="handleConfirm">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: "first",
        formVal: {
          oldPwd: "",
          newPwd: "",
          confirmPwd: ""
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
    methods: {
      handleClick() {

      },
      handleConfirm() {
        let _this = this;
        this.$refs.changePwdForm.validate(valid => {
          if (valid) {
            let id = this.$store.state.userInfo.data.userId;
            if (id == null || id === "") {
              this.$message.success("您还没有登录，请登录！");
            }
            const param = {
              id: id,
              oldPwd: _this.formVal.oldPwd,
              newPwd: _this.formVal.newPwd,
              newPwd2: _this.formVal.confirmPwd
            };
            _this.$http
              .post("/openapi/common/account/updatePwd", param)
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
      close() {
        this.$parent.$parent.closeDialog();
        this.$refs.changePwdForm.resetFields();
      }
    }
  };
</script>