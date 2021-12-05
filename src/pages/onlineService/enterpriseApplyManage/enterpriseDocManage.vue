/**
 * @file 公司资料管理
 */
<style scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="交易团推荐VIP企业名单" name="0">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'enterpriseDocManage',
  components: {

  },
  data() {
    return {
      activeName: '0'
    };
  },
  methods: {
    handleClick() {
    }
  }
};
</script>


