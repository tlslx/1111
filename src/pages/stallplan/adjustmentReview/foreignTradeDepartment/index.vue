<template>
  <el-page class="seat">
    <template slot="body">
      <el-header>
        <headline label="外贸司审核结果汇总"></headline>
      </el-header>
      <kindo-box>
        <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="100px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName">
            <el-input v-model="searchForm.enterpriseName" clearable placeholder="请输入企业名称"></el-input>
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
          <el-form-item class="f-b-m">
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
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
          <el-table-column prop="exhibitionAreaName" :label="languageSource.AdjustmentApply.businessDelegation" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionArea" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schemeName" :label="languageSource.LocationLang.programCode" min-width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="creatorName" :label="languageSource.RuleSettingLang.enterpriseName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="createDate" :label="languageSource.RuleSettingLang.exhibitionPositionType" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifierName" :label="languageSource.AdjustmentApply.adjuestType" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifyDate" :label="languageSource.AdjustmentApply.adjuestReson" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="企业是否提供书面申请材料" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="交易团是否提供书面申请材料（函件号）" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="商协会是否提供书面申请材料" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="是否特装超期更改" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="企业是否接受特装超期更改处罚" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" label="展位位置方案所处阶段（公示前、公示期、公布后）" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="交易团借出展位情况" header-align="center">
            <el-table-column label="展位类别（所属展区）" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="展位数量" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="交易团接收展位情况" header-align="center">
            <el-table-column label="展位类别（所属展区）" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="展位数量" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="展位类别（所属展区）" header-align="center">
            <el-table-column label="原类别" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="调整后类别" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="特装" header-align="center">
            <el-table-column label="原展位数" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="调整后展位数" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="标摊" header-align="center">
            <el-table-column label="原展位数" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="调整后展位数" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="原展位号" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="调整后展位号" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="交易团审核情况" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="商协会审核情况" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="外贸中心审核情况" header-align="center">
            <el-table-column label="外包绘图单位" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="广交会工作处" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="外贸司促进审核情况" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="备注" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="审核批次" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column label="完成数据、展位图更新情况" header-align="center">
            <el-table-column label="展位数据" prop="publicityStartDate" min-width="160" header-align="center" align="center"></el-table-column>
            <el-table-column label="展位图" prop="publicityEndDate" min-width="160" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column fixed="right" :label="languageSource.CommonLang.operation" min-width="130" header-align="center" align="center">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplan/area?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'foreignTradeDepartment' }}"><el-button type="text" size="mini" >审核</el-button></router-link>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

    </template>
  </el-page>
</template>

<script>
import config from '../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "ForeignTradeDepartment",
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline.vue')
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
  async created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取数据字典
    this.natures = await kindo.dictionary.get('exhibitionPositionType'); //展位类型
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
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
    //按钮显示隐藏控制
    checkShow (text) {
      if (text === '未提交' || text === '审批拒绝') {
        return true;
      } else {
        return false;
      }
    },
    //公示或公布成功重新加载表格
    reloadTable () {
      this.$refs.table.loadData();
    },
    //批量删除
    deleteList () {

    },
    //下载pdf方法
    download () {

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
.m-b {
  margin-bottom: 18px;
}
.m-l-n {
  margin-left: 0px;
}
.i-s {
  color: #F56C6C;
  margin-top: 10px;
}
.tip-text {
  color: #606266;
  font-size: 12px;
  margin-left: 5px;
}
.f-b-m {
  margin-left: 19px;
}
</style>
