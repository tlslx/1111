<template>
  <el-page ref="exppreview">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="预展系统查询量统计" name="first"></el-tab-pane>
        <el-tab-pane label="预展平台搜索词情况" name="second"></el-tab-pane>
      </el-tabs>
      <kindo-box v-if='activeName==="first"' icon="fa-search">
        <el-form :model="forms" label-position="right" ref="forms" :rules="rules" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="forms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统计条件" prop="stype">
            <el-select v-model="forms.stype" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.stype" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box v-else icon="fa-search">
        <el-form :model="hisforms" label-position="right" ref="forms" :rules="rules" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="hisforms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="搜索词" prop="searchName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="hisforms.searchName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="搜索词排名" prop="ranking">
            <el-select v-model="hisforms.ranking" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expranking" :key="item.value" :label="item.label" :value="item.value">
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
          <kindo-table ref="table" v-if='activeName==="first"' :cell-style="isCenter" :url="config.api.get" :queryParam="form">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="statCondition" label="统计条件" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="queryCount" label="查询量（次）" min-width="200" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
          
          <kindo-table ref="table" v-else :cell-style="isCenter" :url="config.api.get" :queryParam="hisform">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="searchName" label="搜索词" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="queryCount" label="查询量（次）" min-width="200" show-overflow-tooltip></el-table-column>
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
  name: "exppreview",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "exppreview",
      forms: {
        period: "",
        statCondition: "stype",
        stype: "",
        reportName: "exp_report_preview_paltform",
        reportType: "2"
      },
      hisforms: {
        period: "",
        searchName: "",
        ranking: "",
        statCondition: "searchName",
        reportName: "exp_report_preview_paltform",
        reportType: "1"
      },
      source: {
        stype: [ // 统计条件
          { id: "1", value: "", label: "总体" },
          { id: "2", value: "2", label: "展区" },
          { id: "3", value: "6", label: "品牌企业" },
          { id: "4", value: "7", label: "CF奖产品" },
          { id: "5", value: "8", label: "新产品" },
          { id: "6", value: "9", label: "新参展企业" },
          { id: "7", value: "10", label: "进口展区" }
        ],
        expranking: [
          { id: "1", value: "", label: "无" },
          { id: "2", value: 50, label: "前50" },
          { id: "3", value: 100, label: "前100" },
          { id: "4", value: 200, label: "前200" },
          { id: "5", value: 500, label: "前500" },
          { id: "6", value: 1000, label: "前1000" },
          { id: "7", value: 2000, label: "前2000" }
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