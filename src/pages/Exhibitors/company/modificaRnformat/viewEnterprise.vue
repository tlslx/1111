<style>
.a {
  position:absolute;
  top: 0px;
  right: 0px;
  /* float: right; */
  z-index: 999;
}
</style>
<template>
  <div>
    <div class="a">
      <el-button  type="primary" @click="abolish">返回</el-button>
    </div>
    <el-tabs v-model="activeName" class="businessReview">
      <el-tab-pane label="查看企业信息" name="first"></el-tab-pane>
    </el-tabs>
      <el-tabs v-model="activeNameList" class="businessReview">
        <el-tab-pane label="查看企业详情" name="firstTow">
          <components-companyMessage :companyId='companyId'></components-companyMessage>
        </el-tab-pane>
        <el-tab-pane label="查看产品信息" name="second">
          <components-componentsTbale :companyId='companyId'></components-componentsTbale>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import componentsCompanyMessage from "./components/companyMessage.vue";
import componentsTbale from "./components/companyTbale.vue";
export default {
  components: {
    "components-companyMessage": componentsCompanyMessage,
    "components-componentsTbale": componentsTbale
  },
  data() {
    return {
      activeName: 'first',
      activeNameList: 'firstTow',
      companyId: ''
    };
  },
  created() {
    this.companyId = this.$route.query.companyId;
  },
  methods: {
    // 取消
    abolish() {
      this.$router.go(-1);
    }
  }
};
</script>
