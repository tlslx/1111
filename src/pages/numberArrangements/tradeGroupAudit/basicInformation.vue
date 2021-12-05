 <template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="交易团审核企业基本信息" name="first">
      <el-tabs type="card" v-model="activeName2">
        <el-tab-pane label="企业资料" name="one">
          <enterprise-data @enterpriseVal="enterpriseVal"></enterprise-data>
        </el-tab-pane>
        <el-tab-pane label="海关编码" name="two">
          <customs-code></customs-code>
        </el-tab-pane>
        <el-tab-pane label="品牌展位申请使用条件" name="three">
          <service-conditions></service-conditions>
        </el-tab-pane>
        <!-- <el-tab-pane label="返回" @click="goBack" style="float: right;"></el-tab-pane> -->
      </el-tabs>
      <el-button type="danger" class="fRight" @click="goBack">返回</el-button>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import EnterpriseData from "./enterpriseData";
import CustomsCode from "./customsCode";
import ServiceConditions from "./serviceConditions";

export default {
  components: {
    enterpriseData: EnterpriseData,
    customsCode: CustomsCode,
    serviceConditions: ServiceConditions
  },
  data() {
    return {
      isShow: false,
      activeName: 'first',
      activeName2: 'one'
    };
  },
  mounted() {
    // this.queryData = this.$router.history.current.query.dataType;
    // console.log(this.$router.history.current.query.dataType, "9277");
  },
  methods: {
    enterpriseVal(aa) {
      this.activeName2 = aa;
      this.isShow = true;
    },
    handleClick(tab, event) {
    },
    // 返回事件
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.fRight {
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 999;
}
</style>

