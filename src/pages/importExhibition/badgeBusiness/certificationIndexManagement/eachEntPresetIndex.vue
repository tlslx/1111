<template>
  <el-page ref="eachEntPresetIndex">
    <template slot="header">
      <!--查看当前机构下的企业预设指标总数 弹窗-->
      <el-dialog :title="source.language.view" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
        <kindo-box>
          <el-form v-for="presetIndexFrom in agencyPresetData" :key="presetIndexFrom.presetId" :model="presetIndexFrom" ref="presetIndexFrom" label-position="right" label-width="120px">
            <el-form-item :label="source.language.period" prop="period">
              <el-select v-model="presetIndexFrom.period" :placeholder="source.language.pleaseChoose" class="presetinput" :disabled="true">
                <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="source.language.gearPosition" prop="levelName">
              <el-select v-model="presetIndexFrom.levelName" :placeholder="source.language.pleaseChoose" class="presetinput" :disabled="true">
                <el-option v-for="item in source.levelNameOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="source.language.presetIndexTotal" prop="sum">
              <el-input v-model="presetIndexFrom.sum" class="presetinput" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>
      <!--按钮栏-->
      <kindo-box :title="source.language.eachEntPresetIndex">
        <el-form :model="forms" ref="forms" inline :rules="formsRules" @submit.native.prevent @keyup.enter.native="onQuery" label-position="right">
          <el-form-item :label="source.language.enterpriseNameTable" label-width="90px" prop="enterpriseName">
            <el-input v-model="forms.enterpriseName" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table ref="eachEntPresetIndexTable" :url="api.get" :queryParam="form">
          <el-table-column prop="enterpriseName" :label="source.language.enterpriseNameTable" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column :label="source.language.agency" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button v-if="right('view')" type="text" @click="onView(scope.row)">{{scope.row.cooperationAgencyName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="period" :label="source.language.extension" :formatter="periodFormat" show-overflow-tooltip min-width="120"></el-table-column>
          <el-table-column prop="levelName" :formatter="levelNameFormat" :label="source.language.feeLevel" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="adjustNumber" :label="source.language.preAdjustNumber" show-overflow-tooltip min-width="150"></el-table-column>
          <div slot="control">
            <el-upload ref="upload" :action="api.uploadUrl" :limit="1" accept=".xls,.xlsx" :headers="{ 'Token': store.getters.token }" :on-success="handleSuccess" :show-file-list="false">
              <el-button v-if="right('import')" type="primary" icon="el-icon-upload">{{source.language.batchImport}}</el-button>
            </el-upload>
          </div>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '@/scripts/framework/store';
export default {
  name: "eachEntPresetIndex",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "eachEntPresetIndex",
      store,
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseQuotaPreset/getListPage",
        uploadUrl: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseQuotaPreset/upload",
        getPresetSum: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseQuotaPreset/getPresetSum"
      },
      forms: {},
      formsRules: {},
      source: {
        language: {},
        periodOptions: [],
        levelNameOptions: []
      },
      dialogVisible: false,
      // 查看机构下的企业预设指标总数 表单
      presetIndexFrom: {},
      agencyPresetData: []
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    this.source.periodOptions = [{
      label: this.source.language.phaseOneTable,
      value: "1"
    }, {
      label: this.source.language.phaseTwoTable,
      value: "2"
    }, {
      label: this.source.language.phaseThreeTable,
      value: "3"
    }];
    this.source.levelNameOptions = [{
      label: this.source.language.firstGear,
      value: "1"
    }, {
      label: this.source.language.secondGear,
      value: "2"
    }, {
      label: this.source.language.thirdGear,
      value: "3"
    }, {
      label: this.source.language.fourthGear,
      value: "4"
    }, {
      label: this.source.language.fifthGear,
      value: "5"
    }];
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    //展期过滤显示
    periodFormat(row) {
      let periodLabel = row.period;
      for (let i = 0; i < this.source.periodOptions.length; i++) {
        if (this.source.periodOptions[i].value === row.period) {
          periodLabel = this.source.periodOptions[i].label;
        }
      }
      return periodLabel;
    },
    //档位过滤显示
    levelNameFormat(row) {
      let levelNameLabel = row.levelName;
      for (let i = 0; i < this.source.levelNameOptions.length; i++) {
        if (this.source.levelNameOptions[i].value === row.levelName) {
          levelNameLabel = this.source.levelNameOptions[i].label;
        }
      }
      return levelNameLabel;
    },
    onQuery() {
      this.$refs.eachEntPresetIndexTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.eachEntPresetIndexTable.reloadData();
      });
    },
    //批量导入
    handleSuccess(res) {
      if (res.flag === '1') {
        this.$message.success(this.source.language.importSuccess);
        this.$refs.eachEntPresetIndexTable.reloadData();
        this.$refs.upload.clearFiles();
      } else {
        this.$message.error(res.message);
        this.$refs.upload.clearFiles();
      }
    },
    getPresetSum(name) {
      let params = {
        json: {
          customQueryParams: {
            cooperationAgencyName: name
          },
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.$http.get(this.api.getPresetSum, params).then(res => {
        this.agencyPresetData = res.records;
      });
    },
    onView(row) {
      this.dialogVisible = true;
      //查机构预设指标总数
      this.getPresetSum(row.cooperationAgencyName);
    },
    onCancel() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style scoped>
.presetinput {
  width: 380px;
}
.viewclass {
  cursor: pointer;
  color: #3138ff;
}
</style>
