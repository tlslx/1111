<template>
  <el-page ref="exphistory">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出口展企业参展历史标签查询" name="first"></el-tab-pane>
        <el-tab-pane label="出口展企业参展历史标签查询（以展区为单位）" name="second"></el-tab-pane>
      </el-tabs>
      <kindo-box v-if='activeName==="first"' icon="fa-search">
        <el-form :model="forms" label-position="right" ref="forms" :rules="rules" label-width="130px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="forms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="参展企业" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
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
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box v-else icon="fa-search">
        <el-form :model="hisforms" label-position="right" ref="forms" :rules="rules" label-width="130px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="hisforms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易团" prop="tradeTeam">
            <el-select v-model="hisforms.tradeTeam" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.tradeTeam" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="region">
            <el-select v-model="hisforms.region" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.region" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参展企业" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="hisforms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="期数" prop="exhibitionPeriodNum">
            <el-select v-model="hisforms.exhibitionPeriodNum" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.exhibitionPeriodNum" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展区" prop="expRegion">
            <el-select v-model="hisforms.expRegion" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expRegion" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展位性质" prop="expRegionType">
            <el-select v-model="hisforms.expRegionType" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expRegionType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业类型" prop="enterpriseType">
            <el-select v-model="hisforms.enterpriseType" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.enterpriseType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业属性" prop="enterpriseAttri">
            <el-select v-model="hisforms.enterpriseAttri" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.enterpriseAttri" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业参展历史标签" prop="histroyTag">
            <el-select v-model="hisforms.histroyTag" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.histroyTag" :key="item.value" :label="item.label" :value="item.value">
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
            <el-table-column prop="code" label="交易团代码" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeTeam" label="交易团" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="region" label="地区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseName" label="参展企业" :formatter="(row,column) => formatInfo(row, column)" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseType" label="企业类型" :formatter="(row,column) => formatInfo(row, column)" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseAttri" label="企业属性" :formatter="(row,column) => formatInfo(row, column)" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="period" label="参展届数" min-width="100" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="histroyTag" label="企业参展历史标签" :formatter="(row,column) => formatInfo(row, column)" min-width="220" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
          
          <kindo-table ref="table" v-else :cell-style="isCenter" :url="config.api.get" :queryParam="hisform">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="code" label="交易团代码" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeTeam" label="交易团" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="region" label="地区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseName" label="参展企业" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionPeriodNum" label="展期" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegion" label="展区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegionType" label="展位性质" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseType" label="企业类型" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseAttri" label="企业属性" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="period" label="参展届数" min-width="100" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="histroyTag" label="企业参展历史标签" min-width="220" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
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
  name: "exphistory",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "exphistory",
      forms: {
        period: "",
        tradeTeam: "",
        region: "",
        enterpriseName: "",
        enterpriseType: "",
        enterpriseAttri: "",
        histroyTag: "",
        reportName: "exp_report_join_export",
        reportType: "1"
      },
      hisforms: {
        period: "",
        tradeTeam: "",
        region: "",
        enterpriseName: "",
        num: "",
        expRegion: "",
        enterpriseType: "",
        enterpriseAttri: "",
        histroyTag: "",
        reportName: "exp_report_join_hall_export",
        reportType: "1"
      },
      source: {
      }
    };
  },
  async created() {
    // 读取字典
    this.getPeriod(); // 届数
    this.getTrade(); // 交易团
    this.source.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); // 期数
    this.source.enterpriseAttri = await kindo.dictionary.get('companyAttribute'); // 企业属性
    this.source.enterpriseType = await kindo.dictionary.get('companyType'); // 企业类型
    this.source.region = await kindo.dictionary.get('tradingGroupRegion'); // 地区
    this.source.expRegion = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.source.expRegionType = await kindo.dictionary.get('depositBoothType'); // 展位性质
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