/**
 * @file 展位申请情况查询
 */
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="展位申请情况查询" name="0">
      <!-- <el-button @click="test">点击</el-button> -->
      <booth-apply-status-query></booth-apply-status-query>
    </el-tab-pane>
    <el-tab-pane label="展品情况查询" name="1">
      <exhibition-status-query></exhibition-status-query>
    </el-tab-pane>
    <el-tab-pane label="企业被点击量/收藏量情况" name="2">
      <enter-num-of-hits-and-collection v-if="enterNum"></enter-num-of-hits-and-collection>
    </el-tab-pane>
    <el-tab-pane label="展品被点击量/收藏量情况" name="3">
      <exhibit-num-of-hits-and-collection v-if="exhibitNum"></exhibit-num-of-hits-and-collection>
    </el-tab-pane>
    <el-tab-pane label="用户登录情况统计" name="4">
      <user-login-status-statistic v-if="userLoginStatus"></user-login-status-statistic>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import boothApplyStatusQuery from "./boothApplyStatusQuery";
import exhibitionStatusQuery from "./exhibitionStatusQuery";
import enterNumOfHitsAndCollection from "./enterNumOfHitsAndCollection";
import exhibitNumOfHitsAndCollection from "./exhibitNumOfHitsAndCollection";
import userLoginStatusStatistic from "./userLoginStatusStatistic";
export default {
  name: "applyAssociatedCompanyUser",
  components: {
    "booth-apply-status-query": boothApplyStatusQuery,
    "exhibition-status-query": exhibitionStatusQuery,
    "enter-num-of-hits-and-collection": enterNumOfHitsAndCollection,
    "exhibit-num-of-hits-and-collection": exhibitNumOfHitsAndCollection,
    "user-login-status-statistic": userLoginStatusStatistic
  },
  data() {
    return {
      activeName: "0",
      enterNum: false,
      exhibitNum: false,
      userLoginStatus: false
    };
  },
  computed: {

  },
  methods: {
    handleClick() {
      if (this.activeName === '2') {
        this.enterNum = true;
      } else if (this.activeName === '3') {
        this.exhibitNum = true;
      } else if (this.activeName === '4') {
        this.userLoginStatus = true;
      }
    }
    // test() {
    //   this.$http.postJson('http://10.40.143.67:9001/api/ordinaryCompanyDemandRecord/getOrdinaryArrangeCompanyResult', {
    //     "companyCode": "1",
    //     "companyId": "2",
    //     "companyName": "3",
    //     "exhibitionSession": 0
    //   });
    // }
  }
};
</script>
<style scoped>

</style>
