<style lang="less" scoped>

</style>

<template>
  <div>
    <el-tabs value="perpetual">
      <el-tab-pane label="人证管理(招展代理)" name="perpetual">
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName">
      <el-tab-pane label="管理人员信息" name="first">
        <personInfoAgent-page></personInfoAgent-page>
      </el-tab-pane>
      <el-tab-pane label="申请证件列表" name="second">
        <applyPapersAgent-page></applyPapersAgent-page>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import managePersonInfoAgent from './managePersonInfoAgent';
import applyPapersAgent from "./applyPapersListAgent";
export default {
  components: {
    "personInfoAgent-page": managePersonInfoAgent,
    "applyPapersAgent-page": applyPapersAgent
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
