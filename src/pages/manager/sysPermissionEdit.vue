<template>
  <el-form :ref="name" :model="form" data-url="/api/sysPermission/getSingleById"
    update-url="/api/sysPermission/updateById" add-url="/api/sysPermission/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="：" prop="createDate" :span="8" >
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="creatorId" :span="8" >
            <el-input v-model="form.creatorId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="creatorName" :span="8" >
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="SYS_MENU/MENU_ID：" prop="menuId" :span="8" >
            <el-input v-model="form.menuId" :disabled="isView"></el-input>
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
          <el-form-col label="SYS_OPERATION/OPER_ID：" prop="operId" :span="8" >
            <el-input v-model="form.operId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="orderNo" :span="8" >
            <el-input v-model="form.orderNo" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="permissionCode" :span="8" >
            <el-input v-model="form.permissionCode" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="permissionId" :span="8" >
            <el-input v-model="form.permissionId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="1=启用/0=禁用：" prop="state" :span="8" >
            <el-input v-model="form.state" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
export default {
  mixins: [dialogPageBase],
  data () {
    return {
      submitType: "json",
      activeTab: 'baseInfo',
      form: { createDate: '', creatorId: '', creatorName: '', menuId: '', modifierId: '', modifierName: '', modifyDate: '', operId: '', orderNo: '', permissionCode: '', permissionId: '', state: '' }
    };
  },
  methods: {
    pageLoad () {
    }
  }
};
</script>
