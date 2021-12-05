<template>
  <el-page class="seat">
    <template slot="body">
      <el-header>
        <headline :label="languageSource.AdjustmentApply.businessArrange"></headline>
      </el-header>
      <kindo-box>
        <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="85px" @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="schemeName" :label="languageSource.LocationLang.programName">
            <el-input v-model="searchForm.schemeName" clearable placeholder="方案名称"></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionProperty">
            <el-select v-model="searchForm.exhibitionProperty" clearable placeholder="请选择展位类型">
              <el-option v-for="nature in natures" :key="nature.value" :label="nature.label" :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionArea">
            <el-select v-model="searchForm.exhibitionAreaName" clearable placeholder="请选择展区">
              <el-option v-for="area in regionOfExhibition" :key="area.value" :label="area.label" :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="schemeStatus" :label="languageSource.AdjustmentApply.schemeStatus">
            <el-select v-model="searchForm.schemeStatus" clearable placeholder="请选择记录状态">
              <el-option v-for="area in auditStatusOption" :key="area.value" :label="area.label" :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>

        <div class="m-b">
          <el-button size="mini" type="primary" @click="$refs.publicityDialog.dialogVisible = true" :disabled="!publicityState">{{languageSource.LocationLang.publicity}}</el-button>
          <el-button size="mini" type="primary" @click="$refs.publishDialog.dialogVisible = true" :disabled="!publishState">{{languageSource.LocationLang.publish}}</el-button>
        </div>

      </kindo-box>
      <kindo-box>
        <kindo-table ref="table" :url="config.api.reviewArrangementGetList" :queryParam="form" @selection-change="handleSelectionChange">
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
              <router-link :to="{ path: '/stallplan/reviewArea?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'reviewArrangement' }}">
                <el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button>
              </router-link>
              <!-- <confirm-button class="m-l-n" v-if="checkShow(scope.row.schemeStatus) === 'delete'" button-type="text" message="是否删除该方案？" @remove="handleDelete(scope.row.schemeId)">{{languageSource.CommonLang.delete}}</confirm-button> -->
              <confirm-button class="m-l-n" v-if="checkShow(scope.row.schemeStatus) === 'cancel'" button-type="text" message="越权操作,是否申请人主动撤回？" @remove="handleRemove(scope.row)">{{languageSource.LocationLang.revoke}}</confirm-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

      <!-- 公示 -->
      <publicity-dialog :multipleSelection="multipleSelection" @publicityReload="reloadTable" ref="publicityDialog" />

      <!-- 公布 -->
      <publish-dialog :multipleSelection="multipleSelection" @publishReload="reloadTable" ref="publishDialog" />

    </template>
  </el-page>
</template>

<script>
import config from '../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "StallPlanSeat",
  mixins: [listPageBase],
  components: {
    'publicityDialog': () => import('./components/publicityDialog'),
    'publishDialog': () => import('./components/publishDialog'),
    'headline': () => import('../../components/headline.vue')
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
      //届数
      'sessionNumber': [
        { 'label': '第123届', 'value': '123届' },
        { 'label': '第124届', 'value': '124届' },
        { 'label': '第125届', 'value': '125届' }
      ],
      //专区
      'zhuanqu': [
        { 'label': '专区A', 'value': '1' },
        { 'label': '专区B', 'value': '2' }
      ],
      'multipleSelection': [],
      'btnState': false, //导出为PDF按钮状态
      'publicityState': false, //公示按钮状态
      'publishState': false, //公布按钮状态
      '_forms': {},
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      },
      //拒绝提示框显示状态
      dialogFormVisible: false,
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
    // 下载Excel模板
    download() {
      window.open(this.config.api.download);
    },
    // 导入
    onLead() {
      this.$refs.importDialog.dialogVisible = true;
      this.$refs.importDialog.rules.file = [{ required: true, message: '请选择文件', trigger: 'change' }];
    },
    handleLead() {
      this.$refs.searchForm.resetFields();
      this.$refs.table.reloadData();
    },
    // 多选
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        if (val[i].schemeStatus !== 3) {
          this.btnState = false;
          return false;
        }
      }
      this.multipleSelection = val;
      this.btnState = val.length > 0;
      if (val.length > 0 && val.length < 2) {
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
    // 撤销
    handleRemove(row) {
      let cancelData = {
        "schemeId": row.schemeId,
        "taskId": row.taskId
      };
      this.$http.postJson(this.config.api.reviewArrangementCancel, cancelData)
        .then(res => {
          this.$refs.table.loadData();
        });
    },
    //撤销/删除按钮显示隐藏控制
    checkShow(code) {
      if (code === 1) {
        return 'cancel';
      } else if (code === 5) {
        return 'delete';
      } else {
        return false;
      }
    },
    //删除操作
    handleDelete(id) {
      let deleteData = {
        "schemeId": id
      };
      this.$http.postJson(this.config.api.reviewArrangementDelete, deleteData)
        .then(res => {
          this.$refs.table.loadData();
        });
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
    },
    //公示或公布成功重新加载表格
    reloadTable() {
      this.$refs.table.loadData();
    },
    //查询审核状态下拉框的值
    getActName() {
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
.m-b-sm {
  margin-bottom: 12px;
}
.m-t {
  margin-top: 10px;
}
.m-l-n {
  margin-left: 0px;
}
.f-b-m {
  margin-left: 19px;
}
</style>
