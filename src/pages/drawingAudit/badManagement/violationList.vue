/**
 * @file 评估科-查看和导出违规名单
*/
<style scoped>

</style> 

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="查看/导出违规名单" name="0">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'violationList',
  data() {
    return {
      activeName: '0'
    };
  },
  methods: {
    
  }
};
</script>



