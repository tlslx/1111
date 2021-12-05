<template>
  <el-page ref="expcfprize">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="cf奖产品数据查询" name="first"></el-tab-pane>
        <el-tab-pane label="cf奖产品数据统计" name="second"></el-tab-pane>
      </el-tabs>
      <kindo-box v-if='activeName==="first"' icon="fa-search">
        <el-form :model="forms" label-position="right" ref="forms" :rules="rules" label-width="100px" inline>
          <el-form-item label="年份" prop="exhibitionYear">
            <el-date-picker v-model="forms.exhibitionYear" placeholder="请选择" class="inputclass" type="year" value-format="yyyy" :clearable="true" :editable="false"></el-date-picker>
          </el-form-item>
          <el-form-item label="cf奖产品名称" prop="productName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.productName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="展品大类" prop="productCategory">
            <el-select v-model="forms.productCategory" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.productCategory" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" label-width="130px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="展位性质" prop="expRegionType">
            <el-select v-model="forms.expRegionType" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expRegionType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参展企业" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="交易团" prop="tradeTeam">
            <el-select v-model="forms.tradeTeam" filterable placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.tradeTeam" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="region">
            <el-select v-model="forms.region" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.region" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业类型" prop="enterpriseType">
            <el-select v-model="forms.enterpriseType" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.enterpriseType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业属性" prop="enterpriseAttri">
            <el-select v-model="forms.enterpriseAttri" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.enterpriseAttri" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参展企业历史标签" prop="histroyTag">
            <el-select v-model="forms.histroyTag" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.histroyTag" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新老参展企业" prop="isNewEnterprise">
            <el-select v-model="forms.isNewEnterprise" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.isNewEnterprise" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box v-else icon="fa-search">
        <el-form :model="hisforms" label-position="right" ref="forms" :rules="rules" label-width="90px" inline>
          <el-form-item label="年份" prop="exhibitionYear">
            <el-date-picker v-model="hisforms.exhibitionYear" placeholder="请选择" class="inputclass" type="year" value-format="yyyy" :clearable="true" :editable="false"></el-date-picker>
          </el-form-item>
          <el-form-item label="统计条件" prop="statCondition">
            <el-select v-model="hisforms.statCondition" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
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
          <kindo-table ref="table" v-if='activeName==="first"' :cell-style="isCenter" :url="config.api.get" :queryParam="form">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="productName" label="CF奖产品名称" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="productCategory" label="展品大类" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegionType" label="展位性质" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseName" label="参展企业" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeTeam" label="交易团" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="region" label="地区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="histroyTag" label="参展企业历史标签" min-width="220" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isNewEnterprise" label="新老参展企业" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseType" label="企业类型" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseAttri" label="企业属性" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
          
          <kindo-table ref="table" v-else :cell-style="isCenter" :url="config.api.get" :queryParam="hisform">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="statCondition" label="统计条件" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber" label="参展企业数（家）" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="totalNumber" label="总产品数（个）" min-width="200" show-overflow-tooltip></el-table-column>
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
  name: "expcfprize",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "expcfprize",
      forms: {
        productName: "",
        productCategory: "",
        expRegionType: "",
        enterpriseName: "",
        tradeTeam: "",
        region: "",
        enterpriseType: "",
        enterpriseAttri: "",
        histroyTag: "",
        isNewEnterprise: "",
        exhibitionYear: "",
        reportName: "exp_report_cf_gift",
        reportType: "1"
      },
      hisforms: {
        exhibitionYear: "",
        statCondition: "",
        reportName: "exp_report_cf_gift",
        reportType: "2"
      },
      source: {
        statCondition: [
          { id: "1", value: "", label: "总体" },
          { id: "2", value: "productCategory", label: "展品大类" },
          { id: "3", value: "expRegionType", label: "展位性质" },
          { id: "4", value: "tradeTeam", label: "交易团" },
          { id: "5", value: "region", label: "地区" },
          { id: "6", value: "histroyTag", label: "企业参展历史标签" },
          { id: "7", value: "isNewEnterprise", label: "新老参展企业" },
          { id: "8", value: "enterpriseType", label: "企业类型" },
          { id: "9", value: "enterpriseAttri", label: "企业属性" }
        ]
      }
    };
  },
  async created() {
    // 读取字典
    this.getPeriod(); // 届数
    this.getTrade(); // 交易团
    this.getCategory(); // 展品大类
    this.source.enterpriseAttri = await kindo.dictionary.get('companyAttribute'); // 企业属性
    this.source.enterpriseType = await kindo.dictionary.get('companyType'); // 企业类型
    this.source.region = await kindo.dictionary.get('tradingGroupRegion'); // 地区
    this.source.expRegion = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.source.expRegionType = await kindo.dictionary.get('depositBoothType'); // 展位性质
  },
  watch: {
    "forms.exhibitionYear"(v) {
      this.forms.exhibitionYear = kindo.util.formatDate(v, "yyyy");
    },
    "hisforms.exhibitionYear"(v) {
      this.hisforms.exhibitionYear = kindo.util.formatDate(v, "yyyy");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>