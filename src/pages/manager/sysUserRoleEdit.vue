<template>
  <el-form :ref="name" :model="form" data-url="/api/sysUserRole/getSingleById"
    update-url="/api/sysUserRole/updateById" add-url="/api/sysUserRole/add">
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
          <el-form-col label="：" prop="roleId" :span="8" >
            <el-input v-model="form.roleId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="userId" :span="8" >
            <el-input v-model="form.userId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="userRoleId" :span="8" >
            <el-input v-model="form.userRoleId" :disabled="isView"></el-input>
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
      form: { createDate: '', creatorId: '', creatorName: '', roleId: '', userId: '', userRoleId: '' }
    };
  },
  methods: {
    pageLoad () {
    }
  }
};
</script>
