<style lang="less">
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
      <el-tab-pane label="管理公司信息" name="first">
        <components-companyMessageList :companyId='companyId'></components-companyMessageList>
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import componentsCompanyMessage from "./components/companyMessageList.vue";
// import listPageBase from "@/components/framework/mixins/listPageBase";
// import tableMixIn from "@/utils/helper/tableMixIn";
// import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    "components-companyMessageList": componentsCompanyMessage
    // "components-componentsTbale": componentsTbale
  },
  data() {
    return {
      activeName: 'first',
      companyId: ''
    };
  },
  methods: {
    abolish() {
      this.$router.go(-1);
    }
  },
  created() {
    this.companyId = this.$route.query.companyId;
  }
};
</script>
