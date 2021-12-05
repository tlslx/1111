<template>
  <el-page ref="expenter">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进口展企业参展历史标签统计" name="first"></el-tab-pane>
        <el-tab-pane label="进口展企业参展历史标签统计（以展区为单位）" name="second"></el-tab-pane>
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
              <el-option v-for="item in source.exptypes" :key="item.value" :label="item.label" :value="item.value">
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
          <el-form-item label="统计条件" prop="statCondition">
            <el-select v-model="hisforms.statCondition" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.statCondition" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <el-row :gutter="20">
            <el-col :span="24"><div class="grid-content gred"><i class="el-icon-warning"></i>备注说明</div></el-col>
            <el-col :span="12"><div class="grid-content">参展5届以上的企业数：参展5-9届的企业总数</div></el-col>
            <el-col :span="12"><div class="grid-content">参展10届以上的企业数：参展10-14届的企业总数</div></el-col>
            <el-col :span="12"><div class="grid-content">参展15届以上的企业数：参展15-19届的企业总数</div></el-col>
            <el-col :span="12"><div class="grid-content">参展20届以上的企业数：参展20届以上的企业总数</div></el-col>
          </el-row>
        </kindo-box>
        <kindo-box>
          <kindo-table ref="table" v-if='activeName==="first"' :cell-style="isCenter" :url="config.api.get" :queryParam="form">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="statCondition" label="统计条件" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber5" label="参展5届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber10" label="参展10届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber15" label="参展15届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber20" label="参展20届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
          
          <kindo-table ref="table" v-else :cell-style="isCenter" :url="config.api.get" :queryParam="hisform">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="statCondition" label="统计条件" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegion" label="展区" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber5" label="参展5届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber10" label="参展10届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber15" label="参展15届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber20" label="参展20届以上企业数（家）" min-width="250" show-overflow-tooltip></el-table-column>
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
import dataReport from "../../components/dataReport";
export default {
  name: "expenter",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "expenter",
      forms: {
        period: "",
        statCondition: "",
        reportName: "exp_report_join_import",
        reportType: "2"
      },
      hisforms: {
        period: "",
        statCondition: "",
        reportName: "exp_report_join_hall_import",
        reportType: "2"
      },
      source: {
        exptypes: [
          { id: "1", value: "", label: "总体" },
          { id: "2", value: "nationalRegion", label: "国家地区" },
          { id: "3", value: "recruitmentAgent", label: "招商代理" }
        ],
        statCondition: [ // 统计条件
          { id: "1", value: "", label: "总体" },
          { id: "2", value: "nationalRegion", label: "国家地区" },
          { id: "3", value: "recruitmentAgent", label: "招商代理" },
          { id: "4", value: "numberPeriods", label: "期数" },
          { id: "5", value: "expRegion", label: "展区" }
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
  .grid-content {
    min-height: 30px;
  }
  .gred {
    color: #e04141;
    i {
      margin-right: 5px;
      color: #e04141;
    }
  }
</style>