<template>
  <el-page class="seat">
    <template slot="body">
      <el-header>
        <headline :label="languageSource.AdjustmentApply.view"></headline>
      </el-header>
      <kindo-box>
        <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="85px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="positionNature" :label="languageSource.LocationLang.exhibitionProperty">
            <el-select v-model="searchForm.positionNature" clearable placeholder="请选择展位性质">
              <el-option v-for="nature in natures" :key="nature.value" :label="nature.label" :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionType">
            <el-select v-model="searchForm.exhibitionType" clearable placeholder="请选择布展类型">
              <el-option v-for="nature in exhibitionTypeOption" :key="nature.value" :label="nature.label" :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea">
            <el-select v-model="searchForm.exhibitionArea" clearable placeholder="请选择展区">
              <el-option v-for="area in regionOfExhibition" :key="area.value" :label="area.label" :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName">
            <el-input v-model="searchForm.enterpriseName" clearable placeholder="请输入企业名称"></el-input>
          </el-form-item>
          <el-form-item prop="applyStatus" :label="languageSource.AdjustmentApply.subtype">
            <el-select v-model="searchForm.applyStatus" clearable placeholder="请选择审核状态">
              <el-option v-for="area in auditStatusOption" :key="area.value" :label="area.label" :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="f-b-m">
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
            <el-button type="primary" v-if="showCheck" @click="addFunc">{{languageSource.CommonLang.add}}</el-button>
          </el-form-item>
        </el-form>

      </kindo-box>
      <kindo-box>
        <kindo-table ref="table" :url="config.api.getEnApplyStatus" :queryParam="form">
          <el-table-column type="selection" width='1px'>
            <template slot-scope="scope">{{scope ? " " : " "}}</template>
          </el-table-column>
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionProperty" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionType" min-width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumber" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContent" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annex" min-width="160" header-align="center" align="center">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover" width="220" @hide='clearFileName'>
                <div class="filename-loading" v-if="fileNames.length <= 0">
                  <i class="el-icon-loading"></i>
                </div>
                <div v-for="(item, index) in fileNames" :key="index" v-else>
                  <label class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</label>
                </div>
                <label slot="reference" @click="downloadFunc(scope.row.fileId)" @mouseenter="setPageItem(scope.row.fileId)" class="download-style">
                  {{languageSource.AdjustmentApply.download}}
                </label>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtype" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="130">
            <template slot-scope="scope">
              <router-link :to="{ path: '/stallplan/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentApply' }}">
                <el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button>
              </router-link>
              <confirm-button class="m-l-n" v-if="checkCancelShow(scope.row.applyStatus)" button-type="text" message="是否撤销该申请？" @remove="handleCancel(scope.row)">{{languageSource.LocationLang.revoke}}</confirm-button>
              <confirm-button class="m-l-n" v-if="checkShow(scope.row.applyStatus)" button-type="text" message="是否删除该申请？" @remove="handleRemove(scope.row.applicationId)">{{languageSource.CommonLang.delete}}</confirm-button>
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
import store from '../../../scripts/framework/store';
export default {
  name: "StallPlanAdjustment",
  mixins: [listPageBase],
  components: {
    'headline': () => import('../components/headline.vue')
  },
  data() {
    return {
      //接口地址
      config,
      store,
      'searchForm': {
        positionNature: '',
        exhibitionType: '',
        exhibitionArea: '',
        enterpriseName: '',
        applyStatus: ''
      },
      //展位类型
      'natures': [],
      //展区
      'regionOfExhibition': [],
      //布展类型
      'exhibitionTypeOption': [],
      '_forms': {},
      //国际化内容值
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      },
      //审核状态
      auditStatusOption: [],
      //文件名数据
      fileNames: []
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    },
    //新增按钮显示判断
    showCheck() {
      let roles = this.$store.getters.userInfo.roleIds;
      if (roles.indexOf("bae560763b774d1dadb3d4a349577254") >= 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  async created() {
    this._forms = Object.assign({}, this.searchForm);
    //读取数据字典
    this.natures = await kindo.dictionary.get('exhibitionPositionType'); //展位类型
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
    this.exhibitionTypeOption = await kindo.dictionary.get('typeOfExhibitsArrangement'); //布展类型
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
      this.getActName();
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
    //新增方法
    addFunc() {
      this.$router.push({ path: '/stallplan/applyDialog?primarycolor=2b579a', params: { scopeRow: {}, tag: 'adjustmentApply' }});
    },
    //判断撤销按钮是否显示
    checkCancelShow(text) {
      if (text === 1) { //待审核
        return true;
      } else {
        return false;
      }
    },
    //判断删除按钮是否显示
    checkShow(text) {
      if (text === 1) { //待审核
        return true;
      } else {
        return false;
      }
    },
    //撤销方法
    handleCancel(row) {
      let param = {
        "applicationId": row.applicationId,
        "workFlowParam": {
          "id": row.taskId,
          "variables": {
            "passFlag": '0'
          }
        }
      };
      this.$http.postJson(this.config.api.cancelApply, param)
        .then(res => {
          this.$refs.table.loadData();
        });
    },
    //删除方法
    handleRemove(id) {
      let param = {
        "applicationId": id
      };
      this.$http.postJson(this.config.api.deleteApply, param)
        .then(res => {
          this.$refs.table.loadData();
        });
    },
    //查询审核状态下拉框的值
    getActName() {
      let param = { 'json': { "actName": "positionApplyProcess" }};
      this.$http.get(this.config.api.getApplyStatus, param)
        .then(res => {
          let array = [];
          let result = res.applyStatus;
          for (let i = 0; i < result.length; i++) {
            let obj = {
              label: result[i].value,
              value: result[i].key
            };
            array.push(obj);
          }
          this.auditStatusOption = array;
        });
    },
    //下载方法
    downloadFunc(id) {
      window.open(this.config.api.dowloadURL + '?fileIds=' + id);
    },
    //控制下载提示文件显示内容
    setPageItem(ids) {
      let param = { fileIds: ids };
      this.$http.get(this.config.api.getFileNameByIds, param)
        .then(res => {
          this.fileNames = res;
        });
    },
    //气泡隐藏时清除文件名数据
    clearFileName() {
      this.fileNames = [];
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
.f-b-m {
  margin-left: 46px;
}
.download-style {
  color: #2c579b;
  text-decoration: underline;
  cursor: pointer;
}
.filename-loading {
  text-align: center;
}
</style>
