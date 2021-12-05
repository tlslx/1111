<template>
  <el-form :ref="name" :model="form" data-url="/api/sysUnifyUser/getSingleById"
    update-url="/api/sysUnifyUser/updateById" add-url="/api/sysUnifyUser/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="：" prop="account" :span="8" >
            <el-input v-model="form.account" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="createDate" :span="8" >
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="creatorId" :span="8" >
            <el-input v-model="form.creatorId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="creatorName" :span="8" >
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="email" :span="8" >
            <el-input v-model="form.email" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="mobile" :span="8" >
            <el-input v-model="form.mobile" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="modifierId" :span="8" >
            <el-input v-model="form.modifierId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="modifierName" :span="8" >
            <el-input v-model="form.modifierName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="modifyDate" :span="8" >
            <el-input v-model="form.modifyDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="password" :span="8" >
            <el-input v-model="form.password" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="qq" :span="8" >
            <el-input v-model="form.qq" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="remark" :span="8" >
            <el-input v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="1=OA/2=外部：" prop="source" :span="8" >
            <el-input v-model="form.source" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="1=启用/0=禁用：" prop="state" :span="8" >
            <el-input v-model="form.state" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="userId" :span="8" >
            <el-input v-model="form.userId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="userName" :span="8" >
            <el-input v-model="form.userName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="weixin" :span="8" >
            <el-input v-model="form.weixin" :disabled="isView"></el-input>
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
      submitType: "json",
      activeTab: "baseInfo",
      form: {
        account: "",
        createDate: "",
        creatorId: "",
        creatorName: "",
        email: "",
        mobile: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        password: "",
        qq: "",
        remark: "",
        source: "",
        state: "",
        userId: "",
        userName: "",
        weixin: ""
      }
    };
  },
  methods: {
    pageLoad() {}
  }
};
</script>
