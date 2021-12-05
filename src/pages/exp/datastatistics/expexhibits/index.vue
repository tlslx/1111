<template>
  <el-page ref="expexhibits">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出口展产品数据查询" name="first"></el-tab-pane>
        <el-tab-pane label="出口展产品数据统计" name="second"></el-tab-pane>
      </el-tabs>
      <kindo-box v-if='activeName==="first"' icon="fa-search">
        <el-form :model="forms" label-position="right" ref="forms" :rules="rules" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="forms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.productName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="展区" prop="expRegion">
            <el-select v-model="forms.expRegion" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expRegion" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="rules" label-width="130px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="产品二级目录" prop="proMenu">
            <el-select v-model="forms.proMenu" filterable placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.proMenu" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="是否新产品" prop="isNewPro">
            <el-select v-model="forms.isNewPro" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expcheck" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否修改产品" prop="isEditPro">
            <el-select v-model="forms.isEditPro" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expcheck" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否超过更新年限产品" prop="isOverPro">
            <el-select v-model="forms.isOverPro" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expcheck" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
            <el-table-column prop="productName" label="产品名称" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegion" label="展区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proMenu" label="产品二级目录" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="proThreeMenu" label="产品三级目录" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegionType" label="展位性质" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseName" label="参展企业" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tradeTeam" label="交易团" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="region" label="地区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="histroyTag" label="企业参展历史标签" min-width="220" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isNewEnterprise" label="新老参展企业" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseType" label="企业类型" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterpriseAttri" label="企业属性" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isNewPro" label="是否新产品" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isEditPro" label="是否修改产品" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="isOverPro" label="是否超过更新年限的产品" min-width="240" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
          
          <kindo-table ref="table" v-else :cell-style="isCenter" :url="config.api.get" :queryParam="hisform">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="statCondition" label="统计条件" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterprisesNumber" label="参展企业数（家）" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="totalNumber" label="总产品数（个）" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="newproNumber" label="新产品数（个）" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="editproNumber" label="修改产品数（个）" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="overproNumber" label="超过更新年限的产品数（个）" min-width="240" show-overflow-tooltip></el-table-column>
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
  name: "expexhibits",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "expexhibits",
      forms: {
        period: "",
        productName: "",
        expRegion: "",
        proMenu: "",
        expRegionType: "",
        enterpriseName: "",
        tradeTeam: "",
        region: "",
        histroyTag: "",
        isNewEnterprise: "",
        enterpriseType: "",
        enterpriseAttri: "",
        isNewPro: "",
        isEditPro: "",
        isOverPro: "",
        reportName: "exp_report_product_export",
        reportType: "1"
      },
      hisforms: {
        period: "",
        statCondition: "",
        reportName: "exp_report_product_export",
        reportType: "2"
      },
      source: {
        statCondition: [
          { id: "1", value: "", label: "总体" },
          { id: "2", value: "expRegion", label: "展区" },
          { id: "3", value: "proMenu", label: "产品二级目录" },
          { id: "4", value: "expRegionType", label: "展位性质" },
          { id: "5", value: "tradeTeam", label: "交易团" },
          { id: "6", value: "region", label: "地区" },
          { id: "7", value: "histroyTag", label: "企业参展历史标签" },
          { id: "8", value: "isNewEnterprise", label: "新老参展企业" },
          { id: "9", value: "enterpriseType", label: "企业类型" },
          { id: "10", value: "enterpriseAttri", label: "企业属性" }
        ]
      }
    };
  },
  async created() {
    // 读取字典
    this.getPeriod(); // 届数
    this.getTrade(); // 交易团
    this.getProMenu(); // 产品二级目录
    this.getProThreeMenu(); // 产品三级目录
    this.source.enterpriseAttri = await kindo.dictionary.get('companyAttribute'); // 企业属性
    this.source.enterpriseType = await kindo.dictionary.get('companyType'); // 企业类型
    this.source.region = await kindo.dictionary.get('tradingGroupRegion'); // 地区
    this.source.expRegion = await kindo.dictionary.get('exhibitionArea'); // 展区
    this.source.expRegionType = await kindo.dictionary.get('depositBoothType'); // 展位性质
  }
};
</script>
<style lang="scss" scoped>
</style>