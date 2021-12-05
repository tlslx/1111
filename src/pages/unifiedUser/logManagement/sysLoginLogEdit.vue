<template>
  <el-form
    :ref="name"
    :model="form"
    data-url="/api/sysLoginLog/getSingleById"
    update-url="/api/sysLoginLog/updateById"
    add-url="/api/sysLoginLog/add"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="登录账号：" prop="account" :span="12">
            <el-input v-model="form.account" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="用户名称：" prop="userName" :span="12">
            <el-input v-model="form.userName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="浏览器类型：" prop="broswer" :span="12">
            <el-input v-model="form.broswer" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="主键：" prop="id" :span="12">
            <el-input v-model="form.id" :disabled="isView"></el-input>
          </el-form-col> -->
          <el-form-col label="操作IP：" prop="ip" :span="12">
            <el-input v-model="form.ip" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="登录时间：" prop="loginTime" :span="12">
            <el-input v-model="form.loginTime" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="登录状态" prop="state" :span="12">
            <el-input v-model="form.state" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="24">
            <el-input type="textarea" v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="登录用户ID：" prop="userId" :span="12">
            <el-input v-model="form.userId" :disabled="isView"></el-input>
          </el-form-col> -->
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from "@/components/framework/mixins/dialogPageBase";
export default {
  mixins: [dialogPageBase],
  data() {
    return {
      activeTab: "baseInfo",
      form: {
        account: "",
        broswer: "",
        id: "",
        ip: "",
        loginTime: "",
        remark: "",
        state: "",
        userId: "",
        userName: ""
      }
    };
  },
  methods: {
    pageLoad() {
      if (this.form.state === "1") {
        this.form.state = "成功";
      } else {
        this.form.state = "失败";
      }
    }
  }
};
</script>
