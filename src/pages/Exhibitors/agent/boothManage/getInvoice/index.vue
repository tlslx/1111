<style lang="less">
  #agent-getInvoice {

  }
</style>

<template>
  <div id="agent-getInvoice">
    <el-tabs value="获取发票">
      <el-tab-pane label="获取发票" name="获取发票">
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" style="padding: 0 10px">
      <el-tab-pane label="参展企业" name="first">
        <component-companyInvoice></component-companyInvoice>
      </el-tab-pane>
      <el-tab-pane label="招展代理" name="second">
        <component-agentInvoice></component-agentInvoice>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import componentCompanyInvoice from "./components/companyInvoice";
import componentAgentInvoice from "./components/agentInvoice";
export default {
  components: {
    "component-companyInvoice": componentCompanyInvoice,
    "component-agentInvoice": componentAgentInvoice
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>
