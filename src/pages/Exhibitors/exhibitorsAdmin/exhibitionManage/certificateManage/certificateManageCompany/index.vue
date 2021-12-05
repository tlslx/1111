<style lang="less" scoped>

</style>

<template>
  <div>
    <el-tabs value="perpetual">
      <el-tab-pane label="人证管理(企业)" name="perpetual">
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName">
      <el-tab-pane label="管理人员信息" name="first">
        <personInfoCompany-page></personInfoCompany-page>
      </el-tab-pane>
      <el-tab-pane label="申请证件列表" name="second">
        <applyPapersCompany-page></applyPapersCompany-page>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import managePersonInfoCompany from './managePersonInfoCompany';
import applyPapersCompany from "./applyPapersListCompany";
export default {
  components: {
    "personInfoCompany-page": managePersonInfoCompany,
    "applyPapersCompany-page": applyPapersCompany
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
