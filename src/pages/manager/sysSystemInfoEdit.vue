<template>
  <el-form :ref="name" :model="form" data-url="/api/sysSystemInfo/getSingleById"
    update-url="/api/sysSystemInfo/updateById" add-url="/api/sysSystemInfo/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="系统名称：" prop="systemName" :span="24" >
            <el-input v-model="form.systemName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="系统链接：" prop="systemUrl" :span="24" >
            <el-input v-model="form.systemUrl" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="系统编码：" prop="systemCode" :span="12" >
            <el-input v-model="form.systemCode" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="系统类型：" prop="systemType" :span="12" >
            <el-dropdown-list v-model="form.systemType" 
              :disabled="isView" data-dictionary="systemType"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="状态：" prop="state" :span="12" >
            <el-dropdown-list v-model="form.state" :disabled="isView" 
              data-dictionary="state"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="排序：" prop="orderNo" :span="12" >
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="备注：" prop="remark" :span="24" >
            <el-input v-model="form.remark" :disabled="isView" 
              type="textarea"></el-input>
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
        createDate: "",
        creatorId: "",
        creatorName: "",
        modifierId: "",
        modifierName: "",
        modifyDate: "",
        orderNo: "",
        remark: "",
        state: "",
        systemCode: "",
        systemId: "",
        systemName: "",
        systemType: "",
        systemUrl: ""
      }
    };
  },
  methods: {
    pageLoad() {}
  }
};
</script>
