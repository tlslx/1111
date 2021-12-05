<template>
  <el-form :ref="name" :model="form" data-url="api/unitedCollect/basicData/getSinglePaymentById" update-url="api/unitedCollect/basicData/updatePaymentMethod" add-url="api/unitedCollect/basicData/savePaymentMethod">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="名称：" prop="name" :span="8">
            <el-input v-model="form.name" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="状态：" prop="state" :span="8">
            <el-select v-model="form.state" prop="state">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :disabled="isView" :value="item.value">
              </el-option>
            </el-select>
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
      form: { name: '', state: '' },
      options: [{ value: '1', label: '停用' }, { value: '2', label: '启用' }]
    };
  },
  methods: {
    pageLoad() {
    }
  }
};
</script>