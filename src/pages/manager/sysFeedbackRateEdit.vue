<template>
  <el-form :ref="name" :model="form" data-url="/api/sysFeedbackRate/getSingleById"
    update-url="/api/sysFeedbackRate/updateById" add-url="/api/sysFeedbackRate/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="创建日期：" prop="createDate" :span="8" >
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建人姓名：" prop="creatorName" :span="8" >
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="模块名称：" prop="modelName" :span="8" >
            <el-input v-model="form.modelName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="模块路径：" prop="modelPath" :span="8" >
            <el-input v-model="form.modelPath" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改者姓名：" prop="modifierName" :span="8" >
            <el-input v-model="form.modifierName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改时间：" prop="modifyDate" :span="8" >
            <el-input v-model="form.modifyDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="说明：" prop="remark" :span="8" >
            <el-input v-model="form.remark" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="系统编码：" prop="sysCode" :span="8" >
            <el-input v-model="form.sysCode" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="系统名称：" prop="sysName" :span="8" >
            <el-input v-model="form.sysName" :disabled="isView"></el-input>
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
        createDate: "",
        creatorId: "",
        creatorName: "",
        modelName: "",
        modelPath: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        remark: "",
        sysCode: "",
        sysName: ""
      }
    };
  },
  methods: {
    pageLoad() {}
  }
};
</script>
