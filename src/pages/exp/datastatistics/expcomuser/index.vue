<template>
  <el-page ref="expcomuser">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="参展企业用户登陆统计" name="first"></el-tab-pane>
      </el-tabs>
      <kindo-box v-if='activeName==="first"' icon="fa-search">
        <el-form :model="forms" label-position="right" ref="forms" :rules="rules" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="forms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计条件" prop="statCondition">
            <el-select v-model="forms.statCondition" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.statCondition" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">统计</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :cell-style="isCenter" :url="config.api.get" :queryParam="form">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="statCondition" label="统计条件" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="accountCount" label="登陆人数（人）" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loginCount" label="登陆次数（次）" min-width="200" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import dataReport from "../components/dataReport";
export default {
  name: "expcomuser",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "expcomuser",
      forms: {
        period: "",
        statCondition: "",
        reportName: "exp_report_personal_login",
        reportType: "2"
      },
      source: {
        statCondition: [
          { id: "1", value: "", label: "总体" },
          { id: "2", value: "tradeTeam", label: "交易团" },
          { id: "3", value: "region", label: "地区" },
          { id: "4", value: "nationalRegion", label: "国家地区" },
          { id: "5", value: "histroyTag", label: "企业参展历史标签" },
          { id: "6", value: "isNewEnterprise", label: "新老参展企业" },
          { id: "7", value: "enterpriseType", label: "企业类型" },
          { id: "8", value: "enterpriseAttri", label: "企业属性" }
        ]
      }
    };
  },
  async created() {
    // 读取字典
    this.getPeriod(); // 届数
  }
};
</script>
<style lang="scss" scoped>
</style>