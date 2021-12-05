<style lang="less">
  #agent-payment {

  }
</style>

<template>
  <div id="agent-payment">
    <el-tabs value="付款信息">
      <el-tab-pane label="付款信息" name="付款信息">
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" style="padding: 0 10px">
      <el-tab-pane label="参展企业" name="first">
        <component-companyPayment></component-companyPayment>
      </el-tab-pane>
      <el-tab-pane label="招展代理" name="second">
        <component-agentPayment></component-agentPayment>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import componentCompanyPayment from "./components/companyPayment";
import componentAgentPayment from "./components/agentPayment";
export default {
  components: {
    "component-companyPayment": componentCompanyPayment,
    "component-agentPayment": componentAgentPayment
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
