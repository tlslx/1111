<template>
  <el-page class="seat">
    <template slot="header">
      <rule-tabs
        :title="languageSource.LocationLang.numSum"
        :languageSource="languageSource"
        activeName="numSum"
        @ruleTabsClick='handleClick'
      />
      <kindo-box>
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable">
            <el-select v-model="searchForm.exhibitionPeriod" clearable class="common-style" placeholder="">
              <el-option
                v-for="area in exhibitionPeriodNum"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable">
            <el-select v-model="searchForm.exhibitionAreaName" clearable class="common-style" placeholder="">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.id"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="businessAssociation" :label="languageSource.CheckProgress.relevantCommerceChamber">
            <el-select v-model="searchForm.businessAssociation" clearable class="common-style" placeholder="">
              <el-option
                v-for="area in coceralRows"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
            <!-- <el-input v-model="searchForm.businessAssociation" clearable :maxlength="255" class="common-style"></el-input> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery" >{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>

      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.getTotalData"
          :queryParam="form"
        >
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" header-align="center" align="center" min-width="100">
            <template slot-scope="scope">
              {{`第${scope.row.exhibitionPeriod}期`}}
            </template>
          </el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="100" header-align="center" align="center"></el-table-column>
          <el-table-column prop="businessAssociation" :label="languageSource.CheckProgress.relevantCommerceChamber" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="brand" :label="languageSource.LocationLang.brand" min-width="160" header-align="center" align="center">
            <el-table-column prop="digit" :label="languageSource.LocationLang.total" header-align="center" align="center" min-width="100">
              <template slot-scope="scope">
              {{findProgress(scope.row.list, '品牌', '特装', 'digit')}}
            </template>
            </el-table-column>
            <el-table-column prop="arrangedBooth" :label="languageSource.CheckProgress.arrangeNumber" min-width="100" header-align="center" align="center">
              <template slot-scope="scope">
              {{findProgress(scope.row.list, '品牌', '特装', 'arrangedBooth')}}
            </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="generalSpecial" :label="languageSource.LocationLang.generalSpecial" min-width="160" header-align="center" align="center">
            <el-table-column prop="digit" :label="languageSource.LocationLang.total" header-align="center" align="center" min-width="100">
              <template slot-scope="scope">
                {{findProgress(scope.row.list, '一般性', '特装', 'digit')}}
              </template>
            </el-table-column>
            <el-table-column prop="arrangedBooth" :label="languageSource.CheckProgress.arrangeNumber" min-width="100" header-align="center" align="center">
              <template slot-scope="scope">
                {{findProgress(scope.row.list, '一般性', '特装', 'arrangedBooth')}}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="generalStandard" :label="languageSource.LocationLang.generalStandard" min-width="160" header-align="center" align="center">
            <el-table-column prop="digit" :label="languageSource.LocationLang.total" header-align="center" align="center" min-width="100">
              <template slot-scope="scope">
                {{findProgress(scope.row.list, '一般性', '标摊', 'digit')}}
              </template>
            </el-table-column>
            <el-table-column prop="arrangedBooth" :label="languageSource.CheckProgress.arrangeNumber" min-width="100" header-align="center" align="center">
              <template slot-scope="scope">
                {{findProgress(scope.row.list, '一般性', '标摊', 'arrangedBooth')}}
              </template>
            </el-table-column>
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
  name: "seatNumSum",
  mixins: [listPageBase],
  components: {
    'ruleTabs': () => import('../seatProgressSum/components/ruleTabs.vue')
  },
  data() {
    return {
      'pageId': 'seatNumSum',
      //接口地址
      config,
      'searchForm': {
        exhibitionPeriod: '',
        exhibitionAreaName: '',
        exhibitionAreaCode: '',
        businessAssociation: ''
      },
      //展区
      'regionOfExhibition': [],
      //展期
      'exhibitionPeriodNum': [],
      //商协会
      'coceralRows': [],
      '_forms': {},
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'CheckProgress': {}
      },
      'title': ""
    };
  },
  computed: {
    form: function () {
      let areaName = this.searchForm.exhibitionAreaName;
      if (!areaName || areaName === '') {
        return {
          queryParams: { ...this.searchForm, exhibitionAreaName: '' }
        };
      }
      let exhibitionAreaItem = areaName.split(',');
      let params = {
        exhibitionAreaName: exhibitionAreaItem[0],
        exhibitionAreaCode: exhibitionAreaItem[1]
      };
      return {
        queryParams: { ...this.searchForm, ...params }
      };
    }
  },
  async beforeCreate () {
    //读取数据字典
    let regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    this.coceralRows = await kindo.dictionary.get('coceral'); //商协会
    let tempArray = [];
    regionOfExhibition.forEach((item, index) => {
      let obj = {
        id: item.id,
        label: item.label,
        value: item.label + ',' + item.value
      };
      tempArray.push(obj);
    });
    this.regionOfExhibition = tempArray;
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.table.reloadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.$refs.searchForm.resetFields();
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.table.reloadData();
      });
    },
    //查找安排进度
    findProgress (rows, exhibitionProperty, exhibitionKind, label) {
      let currentRow = rows.filter(v => v.exhibitionProperty.indexOf(exhibitionProperty) >= 0); //匹配展位性质
      //目前布展类型为空，先注释
      currentRow = currentRow.filter(v => v.exhibitionKind && v.exhibitionKind.indexOf(exhibitionKind) >= 0); //匹配布展类型
      let showText = currentRow[0] ? currentRow[0][label] : '';
      return showText;
    },
    //tab点击
    handleClick(tab) {
      this.$emit('tabClick', tab);
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
.common-style {
  width: 180px;
}
</style>
