<template>
  <el-form
    :ref="name"
    :model="form"
    data-url="/api/sysSsoOnlineInfo/getSingleById"
    update-url="/api/sysSsoOnlineInfo/updateById"
    add-url="/api/sysSsoOnlineInfo/add"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="账号：" prop="account" :span="12">
            <el-input v-model="form.account" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="用户名称：" prop="userName" :span="12">
            <el-input v-model="form.userName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="用户IP：" prop="loginIp" :span="12">
            <el-input v-model="form.loginIp"  :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="操作系统：" prop="loginOs" :span="12">
            <el-input v-model="form.loginOs" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="在线用户信息ID：" prop="infoId" :span="12">
            <el-input v-model="form.infoId" :disabled="isView"></el-input>
          </el-form-col> -->
          <el-form-col label="登录到期：" prop="loginExpires" :span="12">
            <el-input v-model="form.loginExpires" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="登录KEY：" prop="loginKey" :span="12">
            <el-input v-model="form.loginKey" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建人姓名：" prop="creatorName" :span="12">
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="登录时间：" prop="createDate" :span="12">
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <!-- <el-form-col label="创建人ID：" prop="creatorId" :span="12">
            <el-input v-model="form.creatorId" :disabled="isView"></el-input>
          </el-form-col> -->
          <!-- <el-form-col label="修改人ID：" prop="modifierId" :span="12">
            <el-input v-model="form.modifierId" :disabled="isView"></el-input>
          </el-form-col> -->
          <el-form-col label="修改人姓名：" prop="modifierName" :span="12">
            <el-input v-model="form.modifierName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改时间：" prop="modifyDate" :span="12">
            <el-input v-model="form.modifyDate" :disabled="isView"></el-input>
          </el-form-col>
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
        createDate: "",
        creatorId: "",
        creatorName: "",
        infoId: "",
        loginExpires: "",
        loginInfo: "",
        loginKey: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        userName: ""
      }
    };
  },
  methods: {
    pageLoad() {}
  }
};
</script>
