<template>
  <el-page class="seat">
    <template slot="body">
      <el-header>
        <headline :label="languageSource.LocationLang.foreignReview"></headline>
      </el-header>
      <kindo-box>
        <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="schemeName" :label="languageSource.LocationLang.programName">
            <el-input v-model="searchForm.schemeName" clearable placeholder="方案名称"></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionProperty">
            <el-select v-model="searchForm.exhibitionProperty" clearable placeholder="请选择展位性质">
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionArea">
            <el-select v-model="searchForm.exhibitionAreaName" clearable placeholder="请选择展区">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f-b-m">
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>


      </kindo-box>
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.foreignTradeDepartmentReview"
          :queryParam="form"
        >
          <el-table-column type="selection" width='1px' >
            <template slot-scope="scope" >{{scope ? " " : " "}}</template>
          </el-table-column>
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" header-align="center" align="center" min-width="100"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriod" header-align="center" align="center" min-width="100"></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionProperty" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schemeName" :label="languageSource.LocationLang.programName" min-width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="creatorName" :label="languageSource.LocationLang.creatorName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="createDate" :label="languageSource.LocationLang.createDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifierName" :label="languageSource.LocationLang.modifierName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifyDate" :label="languageSource.LocationLang.modifyDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.description" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.LocationLang.publicityTime" header-align="center">
            <el-table-column :label="languageSource.LocationLang.startDate" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.endDate" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publicityStatus" min-width="160" header-align="center" align="center">
            <template slot-scope="scope">
              {{ scope.row.publicityStatus === 1 ? '已公示' : '未公示' }}
            </template>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publishTime" header-align="center">
            <el-table-column :label="languageSource.LocationLang.startDate" prop="publishStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.endDate" prop="publishEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publishStatus" min-width="160" header-align="center" align="center">
            <template slot-scope="scope">
              {{ scope.row.publishStatus === 1 ? '已公布' : '未公布' }}
            </template>
          </el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="130">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplan/reviewArea?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'foreignTradeDepartment' }}"><el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button></router-link>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

    </template>
  </el-page>
</template>

<script>
import config from '../../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "StallPlanSeat",
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../../components/headline.vue')
  },
  data() {
    return {
      //接口地址
      config,
      'searchForm': {
        schemeName: '',
        exhibitionAreaName: '',
        exhibitionProperty: '',
        schemeStatus: ''
      },
      //展位类型
      'natures': [],
      //展区
      'regionOfExhibition': [],
      //展期
      'exhibitionPeriodNum': [],
      '_forms': {},
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  async created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取数据字典
    this.natures = await kindo.dictionary.get('exhibitionPositionType'); //展位类型
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
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
    }
  }
};
</script>

<style scoped>
.seat {
  padding: 0 10px;
  overflow-y: auto;
}
.f-b-m {
  margin-left: 19px;
}
</style>
