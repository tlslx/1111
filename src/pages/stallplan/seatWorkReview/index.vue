<template>
  <el-page class="seat">
    <template slot="body">
      <el-header>
        <headline :label="languageSource.LocationLang.workReview"></headline>
      </el-header>
      <kindo-box>
        <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="85px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="schemeName" :label="languageSource.LocationLang.programName">
            <el-input v-model="searchForm.schemeName" clearable placeholder="方案名称"></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionArea">
            <el-select v-model="searchForm.exhibitionAreaName" clearable placeholder="请选择展区">
              <el-option v-for="area in regionOfExhibition" :key="area.value" :label="area.label" :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionProperty" :label="languageSource.RuleSettingLang.exhibitionPositionType">
            <el-select v-model="searchForm.exhibitionProperty" clearable placeholder="请选择展位类型">
              <el-option v-for="nature in natures" :key="nature.value" :label="nature.label" :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>

        <div class="m-b">
          <el-button size="mini" type="primary" @click="downloadPDF" :disabled="!btnState">{{languageSource.LocationLang.downloadPDF}}</el-button>
          <el-button size="mini" type="primary" v-if="checkBtnShow === 'work'" @click="$refs.publicityDialog.dialogVisible = true" :disabled="!publicityState">{{languageSource.LocationLang.publicity}}</el-button>
          <el-button size="mini" type="primary" v-if="checkBtnShow === 'business'" @click="$refs.publishDialog.dialogVisible = true" :disabled="!publishState">{{languageSource.LocationLang.publish}}</el-button>
        </div>

      </kindo-box>
      <kindo-box>
        <kindo-table ref="table" :url="config.api.workGetList" :queryParam="form" @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="46" header-align="center" align="center"></el-table-column>
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
            <template slot-scope="scope">
              <router-link :to="{ path: '/stallplan/area?primarycolor=2b579a', query: { businessKey: scope.row.schemeId, description: scope.row.description, scopeRow: scope.row, tag: 'seatWorkReview' }}">
                <el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button>
              </router-link>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

      <!-- 公示 -->
      <publicity-dialog :multipleSelection="multipleSelection" @publicityReload="reloadTable" :languageSource="languageSource" ref="publicityDialog" />

      <!-- 公布 -->
      <publish-dialog :multipleSelection="multipleSelection" @publishReload="reloadTable" :languageSource="languageSource" ref="publishDialog" />

    </template>
  </el-page>
</template>

<script>
import config from './components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "StallPlanSeat",
  mixins: [listPageBase],
  components: {
    'publicityDialog': () => import('./components/publicityDialog'),
    'publishDialog': () => import('./components/publishDialog'),
    'headline': () => import('../components/headline')
  },
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
      //展期
      'exhibitionPeriodNum': [],
      'multipleSelection': [],
      'btnState': false, //导出为PDF按钮状态
      'publicityState': false, //公示按钮状态
      'publishState': false, //公布按钮状态
      '_forms': {},
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {}
      },
      actNameOption: []
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    },
    //判断公示公布按钮显示
    checkBtnShow() {
      let roles = this.$store.getters.userInfo.roleIds;
      let workFirst = roles.indexOf("34587e538de24eb5a47c66c20f2177de"); //工作部高级经理
      let workSecond = roles.indexOf("3cf7c35e389c4accbc2ef8d0406920ae"); //工作部经办人
      let workThird = roles.indexOf("d21619ae04b7477c923d8413c874bd26"); //工作部经理
      let businessFirst = roles.indexOf("2e6540b2582747a18a7a179387fadb1c"); //外贸司初审人员
      let businessSecond = roles.indexOf("b033520f760945d296975d264be516da"); //外贸司复审人员
      if (workFirst >= 0 || workSecond >= 0 || workThird >= 0) {
        return 'work';
      } else if (businessFirst >= 0 || businessSecond >= 0) {
        return 'business';
      }
    }
  },
  async created() {
    this._forms = Object.assign({}, this.searchForm);
    //读取数据字典
    this.natures = await kindo.dictionary.get('exhibitionPositionType'); //展位类型
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
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
    onResetQuery() {
      this.$refs.searchForm.resetFields();
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    // 多选
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        //表示没有审核完成
        if (val[i].status !== 3) {
          this.btnState = false;
          this.publicityState = false;
          this.publishState = false;
          return false;
        }
      }
      this.multipleSelection = val;
      this.btnState = val.length > 0;
      if (val.length === 1) {
        //公示按钮状态
        if (val[0].publicityStatus === 0) {
          this.publicityState = true;
        } else {
          this.publicityState = false;
        }
        //公布按钮状态
        if (val[0].publicityStatus === 1 && val[0].publishStatus === 0) {
          this.publishState = true;
        } else {
          this.publishState = false;
        }
      } else {
        this.publicityState = false;
        this.publishState = false;
      }
    },
    //公示或公布成功重新加载表格
    reloadTable() {
      this.$refs.table.loadData();
    },
    //下载PDF文件
    downloadPDF() {
      let selectIds = [];
      let multipleSelection = this.multipleSelection;
      let ids = "";
      for (let i = 0; i < multipleSelection.length; i++) {
        selectIds.push(multipleSelection[i].schemeId);
      }
      ids = selectIds.join(',');
      window.open(this.config.api.downloadPDF + `?schemeId=${ids}`);
    }
  }
};
</script>

<style scoped>
.seat {
  padding: 0 10px;
  overflow-y: auto;
}
.m-b {
  margin-bottom: 18px;
}
</style>
