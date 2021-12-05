<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="审核企业资质" name="first">
      <el-tabs v-model="currentName" type="card">
        <el-tab-pane label="查看企业资料" name="first">
          
        </el-tab-pane>
        <el-tab-pane label="审核企业资质" name="second"></el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      currentName: 'first'
    };
  },
  computed: {

  },
  created() {

  },
  methods: {

  }
};
</script>
<style scoped>
  
</style>