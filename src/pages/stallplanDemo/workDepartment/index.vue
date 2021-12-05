<template>
  <el-page class="seat">
    <template slot="body">
      <kindo-box :title="languageSource.LocationLang.workPartSum">
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="100px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable">
            <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips" -->
            <el-input v-model="searchForm.enterpriseName" clearable class="common-style" :maxlength='255' ></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionPropertyTips" -->
            <el-select v-model="searchForm.exhibitionProperty" clearable  class="common-style" placeholder="">
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionAreaTip" -->
            <el-select v-model="searchForm.exhibitionAreaName" clearable class="common-style" placeholder="">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item prop="actName" label="记录状态：">
            <el-select v-model="searchForm.actName" clearable placeholder="请选择记录状态">
              <el-option
                v-for="area in auditStatusOption"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item >
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>

      </kindo-box>
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.get"
          :queryParam="form"
          @selection-change="handleSelectionChange"
        >
        <el-table-column prop="exhibitionAreaName" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionAreaTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schemeName" :label="languageSource.LocationLang.programCode" min-width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="creatorName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="createDate" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifierName" :label="languageSource.AdjustmentApply.adjuestType" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifyDate" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.businessApplication" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.tradingGroupApplication" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.businessAssociationApplication" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.overdueChange" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.overdueChangePunishment" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.seatArrangeStage" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.tradingGroupLend" header-align="center">
            <el-table-column :label="languageSource.LocationLang.boothCategory" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.AdjustmentApply.boothNumTable" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.tradingGroupReceive" header-align="center">
            <el-table-column :label="languageSource.LocationLang.boothCategory" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.AdjustmentApply.boothNumTable" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.boothCategory" header-align="center">
            <el-table-column :label="languageSource.LocationLang.originalCategory" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.adjustedCategory" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.specialEquipment" header-align="center">
            <el-table-column :label="languageSource.LocationLang.originalBoothNum" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.adjustedBoothNum" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.standardBooth" header-align="center">
            <el-table-column :label="languageSource.LocationLang.originalBoothNum" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.adjustedBoothNum" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.originalBoothNumber" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.adjustedBoothNumber" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.tradingGroupReview" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.businessAssociationReview" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.foreignTradeCenterReview" header-align="center">
            <el-table-column :label="languageSource.LocationLang.outsourcedDrawing" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.cantonFairWork" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.foreignTradeReview" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.remark" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.reviewBatch" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.completeData" header-align="center">
            <el-table-column :label="languageSource.LocationLang.boothData" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.floorPlan" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="operation" fixed="right" :label="languageSource.CommonLang.operation" min-width="130" header-align="center" align="center">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplan/reviewForm?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'workDepartment' }}"><el-button type="text" size="mini">查看</el-button></router-link>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

    </template>
  </el-page>
</template>

<script>
import config from './components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "workDepartment",
  mixins: [listPageBase],
  data() {
    return {
      //接口地址
      config,
      'searchForm': {
        schemeName: '',
        exhibitionAreaName: '',
        exhibitionProperty: ''
      },
      //展位类型
      'natures': [],
      //展区
      'regionOfExhibition': [],
      //多选保存的值
      'multipleSelection': [],
      '_forms': {},
      //国际化内容值
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      },
      'updateRow': {},
      //下载pdf按钮状态
      'downloadBtn': false,
      //审核状态
      auditStatusOption: []
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  async beforeCreate () {
    //读取数据字典
    this.natures = await kindo.dictionary.get('depositBoothType'); //展位性质
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
  },
  mounted() {
    // this.getActName();
    // this.$nextTick(function () {
    //   this.onResetQuery();
    // });
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.table.loadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.$refs.searchForm.resetFields();
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.table.reloadData();
      });
    },
    // 多选
    handleSelectionChange (val) {
      this.downloadBtn = val.length > 0;
      this.multipleSelection = val;
    },
    //查询审核状态下拉框的值
    getActName () {
      let param = { 'json': { "actName": "positionAdjustProcess" }};
      this.$http.get(this.config.api.getApplyStatus, param)
        .then(res => {
          let array = [];
          let result = res.schemeStatus;
          for (let i = 0; i < result.length; i++) {
            let obj = {
              label: result[i].value,
              value: result[i].key
            };
            array.push(obj);
          }
          this.auditStatusOption = array;
        });
    }
  }
};
</script>

<style scoped>
.seat {
  padding: 0 10px;
  overflow-y: auto;
}
.common-style {
  width: 180px;
}
</style>
