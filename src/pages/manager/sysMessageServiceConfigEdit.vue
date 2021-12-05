<template>
  <el-form :ref="name" :model="form" data-url="/api/sysMessageServiceConfig/getSingleById" update-url="/api/sysMessageServiceConfig/updateById"
    add-url="/api/sysMessageServiceConfig/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="配置名称：" prop="configName" :span="8">
            <el-input v-model="form.configName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="类型：" prop="configType" :span="8">
            <el-dropdown-list v-model="form.configType" :disabled="isView" 
              data-dictionary="messageType"></el-dropdown-list>
          </el-form-col>
          <el-form-col label="状态：" prop="isValid" :span="8">
            <el-switch v-model="form.isValid" active-value="1" inactive-value="0" :disabled="isView"></el-switch>
          </el-form-col>
          <el-form-col label="配置信息：" prop="configContent" :span="24">
            <el-input type="textarea" :rows="8" v-model="form.configContent" :disabled="isView" placeholder="请输入配置内容......"
                style="line-height: 2;font-size: large;"></el-input>
          </el-form-col>
        
          <el-form-col label="创建人：" prop="creatorName" :span="6">
            <el-input v-model="form.creatorName" :disabled="true"></el-input>
          </el-form-col>
          <el-form-col label="创建时间：" prop="createDate" :span="6">
            <el-input v-model="form.createDate" :disabled="true" :formatter="date"></el-input>
          </el-form-col>
          <el-form-col label="修改人：" prop="modifierName" :span="6">
            <el-input v-model="form.modifierName" :disabled="true"></el-input>
          </el-form-col>
          <el-form-col label="修改时间：" prop="modifyDate" :span="6">
            <el-input v-model="form.modifyDate" :disabled="true" :formatter="date"></el-input>
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
    data() {
      return {
        activeTab: 'baseInfo',
        form: {
          configContent: '',
          configName: '',
          configType: '',
          createDate: '',
          creatorId: '',
          creatorName: '',
          id: '',
          isValid: 0,
          modifierId: '',
          modifierName: '',
          modifyDate: ''
        }
      };
    },
    methods: {
      pageLoad() {}
    }
  };

</script>
