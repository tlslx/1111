<template>
  <el-page ref="expquery">
    <template slot="header">
      <!--按钮栏-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="进口展企业参展历史标签查询" name="first"></el-tab-pane>
        <el-tab-pane label="进口展企业参展历史标签查询（以展区为单位）" name="second"></el-tab-pane>
      </el-tabs>
      <kindo-box v-if='activeName==="first"' icon="fa-search">
        <el-form :model="forms" label-position="right" ref="forms" :rules="rules" label-width="130px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item label="届数" prop="period">
            <el-select v-model="forms.period" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.period" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="参展企业" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="国家地区" prop="nationalRegion">
            <el-select v-model="forms.nationalRegion" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.nationalRegion" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招展代理" prop="recruitmentAgent">
            <el-select v-model="forms.recruitmentAgent" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.recruitmentAgent" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业参展历史标签" prop="histroyTag">
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
          <el-form-item label="参展企业" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="hisforms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="国家地区" prop="nationalRegion">
            <el-select v-model="hisforms.nationalRegion" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.nationalRegion" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招展代理" prop="recruitmentAgent">
            <el-select v-model="hisforms.recruitmentAgent" placeholder="请选择" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.recruitmentAgent" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
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
            <el-table-column prop="enterpriseName" label="参展企业" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nationalRegion" label="国家地区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="recruitmentAgent" label="招展代理" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="period" label="参展届数" min-width="100" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="histroyTag" label="企业参展历史标签" min-width="220" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <div slot="control">
              <el-button v-if="right('down')" type="primary" @click="onAction('down')">导出</el-button>
            </div>
          </kindo-table>
          
          <kindo-table ref="table" v-else :cell-style="isCenter" :url="config.api.get" :queryParam="hisform">
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="enterpriseName" label="参展企业" min-width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nationalRegion" label="国家地区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="recruitmentAgent" label="招展代理" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionPeriodNum" label="期数" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="expRegion" label="展区" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
            <el-table-column prop="period" label="该展区参展届数" min-width="200" :formatter="(row,column) => formatInfo(row, column)" show-overflow-tooltip></el-table-column>
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
  name: "expquery",
  mixins: [listPageBase, dataReport],
  data() {
    return {
      // pageId: "expquery",
      forms: {
        period: "",
        enterpriseName: "",
        nationalRegion: "",
        recruitmentAgent: "",
        histroyTag: "",
        reportName: "exp_report_join_import",
        reportType: "1"
      },
      hisforms: {
        period: "",
        enterpriseName: "",
        nationalRegion: "",
        recruitmentAgent: "",
        exhibitionPeriodNum: "",
        expRegion: "",
        histroyTag: "",
        reportName: "exp_report_join_hall_import",
        reportType: "1"
      }
    };
  },
  async created() {
    // 读取字典
    this.getPeriod(); // 届数
    this.getNation(); // 进口展国家地区
    this.getRecruiment(); // 进口展招商代理
    this.source.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); // 期数
    // this.source.nationalRegion = await kindo.dictionary.get('countryDic'); // 国家地区
    this.source.expRegion = await kindo.dictionary.get('ifoExhibitionArea'); // 进口展展区
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