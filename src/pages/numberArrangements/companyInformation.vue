<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业基本信息" name="first">
      <company-information-one></company-information-one>
    </el-tab-pane>
    <el-tab-pane label="企业品牌/认证/奖励/专利信息" name="second">
      <company-information-two></company-information-two>
    </el-tab-pane>
    <el-tab-pane label="企业参展目的及贸易需求" name="third">
      <company-information-three></company-information-three>
    </el-tab-pane>
    <el-tab-pane label="企业联系方式" name="fourth">
      <company-information-four></company-information-four>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import CompanyInformationOne from "./companyInformationOne";
import CompanyInformationTwo from "./companyInformationTwo";
import CompanyInformationThree from "./companyInformationThree";
import CompanyInformationFour from "./companyInformationFour";

export default {
  components: {
    companyInformationOne: CompanyInformationOne,
    companyInformationTwo: CompanyInformationTwo,
    companyInformationThree: CompanyInformationThree,
    companyInformationFour: CompanyInformationFour
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style scoped>

  /* .container-tab >>> .el-tabs__content{
    flex-grow: 1;
    overflow-y: scroll;
  } */
  /* .app-body {
    overflow: scroll;
  } */
  /* .container-tab  .el-tabs__content{
    flex-grow: 1;
    overflow-y: scroll;
  }
  .el-form--label-right{
    overflow-y: scroll;
  } */
</style>
