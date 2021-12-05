<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="查看企业退回确认书" name="first" style="padding-left: 270px; padding-right: 400px;">
      <el-form ref="formData" :model="formData" :inline="true" label-position="right" label-width="270px">
        <br>
        <el-form-item label="企业名称：">
          <span>宝芝林</span>
        </el-form-item>
        <el-form-item label="退回展位号：">
          <span>111</span>
        </el-form-item><br>
        <el-form-item label="广交会编码：">
          <span>986512</span>
        </el-form-item>
        <el-form-item label="本届品牌展位数变化量：">
          <span>5</span>
        </el-form-item><br>
        <el-form-item label="交易团：">
          <span>广东</span>
        </el-form-item>
        <el-form-item label="本届保留品牌展位数：">
          <span>6</span>
        </el-form-item><br>
        <el-form-item label="展区：">
          <span>家用电器</span>
        </el-form-item>
        <el-form-item label = "情况分类：">
          <span>部分退回</span>
        </el-form-item><br>
        <el-form-item label = "展期：">
          <span>2</span>
        </el-form-item>
        <el-form-item label = "退回原因：">
          <span>不想要了</span>
        </el-form-item><br>
        <el-form-item label = "上届品牌展位数量：">
          <span>12</span>
        </el-form-item>
      </el-form>
      <p style="text-align: center; font-weight: 600;">关于退展位收费约束机制的时间机制</p>
      <div>
        <span>本届广交会退展位截止时间为2018年11月11日，若超出截止时间提出退展位申请，则订金做违约金处理，请知晓。本届广交会退展位截止时间为2018年11月11日，若超出截止时间提出退展位申请，则订金做违约金处理，请知晓。本届广交会退展位截止时间为2018年11月11日，若超出截止时间提出退展位申请，则订金做违约金处理，请知晓。本届广交会退展位截止时间为2018年11月11日，若超出截止时间提出退展位申请，则订金做违约金处理，请知晓。本届广交会退展位截止时间为2018年11月11日，若超出截止时间提出退展位申请，则订金做违约金处理，请知晓。本届广交会退展位截止时间为2018年11月11日，若超出截止时间提出退展位申请，则订金做违约金处理，请知晓。</span>
      </div><br>
      <div>
        <el-checkbox v-model='checked'>本司已读并确认以上所述内容</el-checkbox>
        <div style="float: right; margin-right: 100px; font-weight: 600;">
          <span>盖章：</span><br><br>
          <span>时间：</span>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      formData: {
        name: ""
      },
      activeName: "first"
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>
<style scoped>
aa{
  float: left;
  font-weight: 600;
}
</style>

