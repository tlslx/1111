/**
* @file 是否承担本团企业展品质量与贸易纠纷投诉调解处理责任
* @author:heli
* @date:2019/5/7
*/
<template>
<div>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item label="届数:" size="mini" label-width="120px">
        <!-- 届数下拉框 -->
        <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in ruleForm.exhibitionSessionArr" :label="item.exhibitionNum"
          :value="item.exhibitionNum" :key="item.exhibitionId"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item size="mini">
        <el-button type="primary" @click="submitForm()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-tabs class="nameList" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="符合资格名单" name="first">
        <qualificationList/>
      </el-tab-pane>

      <el-tab-pane label="积极支持广交会专业化宣传工作的交易团名单" name="second">
        <activelySupporting/>
      </el-tab-pane>
    </el-tabs>
</div>

</template>

<script>
import qualificationList from "./qualificationList";
import activelySupporting from "./activelySupporting";

export default {
  name: "summaryDetailedStatistics",
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        exhibitionSession: '',
        exhibitionSessionArr: []
      }
    };
  },
  methods: {
    handleClick(tab, event) {

    }
  },
  components: {
    qualificationList,
    activelySupporting
  }
};
</script>
<style scoped>
.demo-ruleForm {
  padding-top: 20px
}
</style>
