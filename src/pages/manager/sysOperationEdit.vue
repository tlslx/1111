<template>
  <el-form :ref="name" :model="form" data-url="/api/sysOperation/getSingleById"
    update-url="/api/sysOperation/updateById" add-url="/api/sysOperation/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="：" prop="clientId" :span="8" >
            <el-input v-model="form.clientId" :disabled="isView"></el-input>
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
          <el-form-col label="：" prop="groupNo" :span="8" >
            <el-input v-model="form.groupNo" :disabled="isView"></el-input>
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
          <el-form-col label="操作编码：" prop="operCode" :span="8" >
            <el-input v-model="form.operCode" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="operFun" :span="8" >
            <el-input v-model="form.operFun" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="operIcon" :span="8" >
            <el-input v-model="form.operIcon" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="ID：" prop="operId" :span="8" >
            <el-input v-model="form.operId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="操作名称：" prop="operName" :span="8" >
            <el-input v-model="form.operName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="操作类型：" prop="operTypes" :span="8" >
            <el-input v-model="form.operTypes" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="下拉按钮ID:操作类型为3是才有：" prop="parentId" :span="8" >
            <el-input v-model="form.parentId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="：" prop="remark" :span="8" >
            <el-input v-model="form.remark" :disabled="isView"></el-input>
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
      form: { clientId: '', createDate: '', creatorId: '', creatorName: '', groupNo: '', modifierId: '', modifierName: '', modifyDate: '', operCode: '', operFun: '', operIcon: '', operId: '', operName: '', operTypes: '', parentId: '', remark: '', state: '' }
    };
  },
  methods: {
    pageLoad () {
    }
  }
};
</script>
