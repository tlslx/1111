<template>
  <el-page class="seat">
    <template slot="header">
      <kindo-box :title="languageSource.AdjustmentApply.adjustAddTitle" icon="fa-search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionPropertyTips" -->
            <el-select v-model="searchForm.positionNature" clearable class="common-style" placeholder="" >
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable">
            <!-- :placeholder="languageSource.AdjustmentApply.exhibitionTypeTips" -->
            <el-select v-model="searchForm.exhibitionType" clearable class="common-style" placeholder="" >
              <el-option
                v-for="nature in exhibitionTypeOption"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable" >
            <!-- :placeholder="languageSource.LocationLang.exhibitionAreaTip" -->
            <el-select v-model="searchForm.exhibitionArea" clearable class="common-style" placeholder="" >
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable">
            <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips" -->
            <el-input :maxlength='255' v-model="searchForm.enterpriseName" clearable class="common-style" ></el-input>
          </el-form-item>
          <el-form-item prop="applyStatus" :label="languageSource.AdjustmentApply.subtypeTable">
            <!-- :placeholder="languageSource.AdjustmentApply.subtypeTips" -->
            <el-select v-model="searchForm.applyStatus" clearable class="common-style" placeholder="" >
              <el-option
                v-for="area in auditStatusOption"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </kindo-box>
    </template>
    <template slot="body" >
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.getEnApplyStatus"
          :queryParam="form"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="right('deleteAll')" type="selection" min-width="46" header-align="center" align="center"></el-table-column>
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.expcode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="cantonCode" :label="languageSource.LocationLang.programCode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="chamberOfCommerce" :label="languageSource.AdjustmentApply.association" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="boothCode" :label="languageSource.AdjustmentApply.beforeBoothCode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentReason" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="160" header-align="center" align="center">
          <template slot-scope="scope" >
            <el-popover
            placement="right"
            trigger="hover"
            width="220"
            @hide='clearFileName'>
            <div class="filename-loading" v-if="fileNames.length <= 0">
              <i class="el-icon-loading" ></i>
            </div>
            <div v-for="(item, index) in fileNames" :key="index" v-else>
              <div class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</div>
            </div>
            <label
              slot="reference"
              @click="downloadFunc(scope.row.fileId)"
              @mouseenter="setPageItem(scope.row.fileId)"
              class="download-style">
              {{languageSource.AdjustmentApply.download}}
            </label>
            </el-popover>
          </template>
          </el-table-column>
          <el-table-column prop="createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="160">
          <template slot-scope="scope" >
            <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentApply', right: 'view' }}"><el-button type="text" size="mini" v-if="scope.row.view" >{{languageSource.CommonLang.view}}</el-button></router-link>
            <el-button type="text" size="mini" class="m-l-n" v-if="scope.row.recall" @click="handleCancel(scope.row)">{{languageSource.LocationLang.revoke}}</el-button>
            <el-button type="text" size="mini" class="m-l-n" v-if="scope.row.delete" @click="handleRemove(scope.row.applicationId)">{{languageSource.CommonLang.delete}}</el-button>
          </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" v-if="right('add')" @click="addFunc" >{{languageSource.CommonLang.add}}</el-button>
            <el-button type="danger" v-if="right('deleteAll')" :disabled="deleteAllState" @click="deleteAll" >{{languageSource.RuleSettingLang.allDelete}}</el-button>
          </div>
        </kindo-table>
      </kindo-box>
      <!-- <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.getEnApplyStatus"
          :queryParam="form"
        >
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumberTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="160" header-align="center" align="center">
            <template slot-scope="scope" >
              <el-popover
                placement="right"
                trigger="hover"
                width="220"
                @hide='clearFileName'>
                <div class="filename-loading" v-if="fileNames.length <= 0">
                  <i class="el-icon-loading" ></i>
                </div>
                <div v-for="(item, index) in fileNames" :key="index" v-else>
                  <div class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</div>
                </div>
                <label
                  slot="reference"
                  @click="downloadFunc(scope.row.fileId)"
                  @mouseenter="setPageItem(scope.row.fileId)"
                  class="download-style">
                  {{languageSource.AdjustmentApply.download}}
                </label>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="160">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentApply', right: 'view' }}"><el-button type="text" size="mini" v-if="scope.row.view" >{{languageSource.CommonLang.view}}</el-button></router-link>
              <el-button type="text" size="mini" class="m-l-n" v-if="scope.row.recall" @click="handleCancel(scope.row)">{{languageSource.LocationLang.revoke}}</el-button>
              <el-button type="text" size="mini" class="m-l-n" v-if="scope.row.delete" @click="handleRemove(scope.row.applicationId)">{{languageSource.CommonLang.delete}}</el-button>
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" v-if="right('add')" @click="addFunc" >{{languageSource.CommonLang.add}}</el-button>
            <el-button type="primary" v-if="right('deleteAll')" @click="addFunc" >{{languageSource.RuleSettingLang.allDelete}}</el-button>
          </div>
        </kindo-table>
      </kindo-box> -->

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
      'pageId': 'adjustmentApplition',
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
      fileNames: [],
      deleteAllState: true,
      multipleSelection: [] //多选数据
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
    this.exhibitionTypeOption = await kindo.dictionary.get('exhibitionType'); //布展类型
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
    this.$nextTick(function () {
      this.onResetQuery();
      this.getActName();
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
    //新增方法
    addFunc () {
      this.$router.push({ path: '/stallplanDemo/applyDialog?primarycolor=2b579a', params: { scopeRow: {}, tag: 'adjustmentApply' }});
    },
    //判断撤销按钮是否显示
    checkCancelShow (text) {
      if (text === 1) { //待审核
        return true;
      } else {
        return false;
      }
    },
    //判断删除按钮是否显示
    checkShow (row) {
      let paApplyRefScheme = row.paApplyRefScheme;
      if (row.applyStatus === 1) { //待审核
        for (let i = 0; i < paApplyRefScheme.length; i++) {
          if (paApplyRefScheme[i].schemeId) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return false;
      }
    },
    //撤销方法
    handleCancel (row) {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.programCancelTips, languageSource.CommonLang.tips, "warning", async () => {
        let param = { "applicationId": row.applicationId, "taskEntities": [{ "curActId": row.curActId ? row.curActId : row.taskEntities[0].curActId }] };
        this.$http.postJson(this.config.api.cancelApply, param)
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.LocationLang.cancelSucess, languageSource.CommonLang.tips, 'success');
          });
      });
    },
    //删除方法
    handleRemove (id) {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.programDeleteTips, languageSource.CommonLang.tips, "warning", async () => {
        let param = {
          "applicationId": id
        };
        this.$http.postJson(this.config.api.deleteApply, param)
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.CommonLang.deleteSuccess, languageSource.CommonLang.tips, 'success');
          });
      });
    },
    //查询审核状态下拉框的值
    getActName () {
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
    downloadFunc (id) {
      window.location.href = this.config.api.dowloadURL + '?fileIds=' + id;
    },
    //控制下载提示文件显示内容
    setPageItem (ids) {
      let param = { fileIds: ids };
      this.$http.get(this.config.api.getFileNameByIds, param)
        .then(res => {
          this.fileNames = res;
        });
    },
    //鼠标移出清除文件名数据
    clearFileName () {
      this.fileNames = [];
    },
    // 多选
    handleSelectionChange (val) {
      for (let i = 0; i < val.length; i++) {
        if (!val[i].delete) {
          return false;
        }
      }
      this.multipleSelection = val;
      this.deleteAllState = !(val.length > 0);
    },
    //批量删除
    deleteAll () {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.RuleSettingLang.deleteAllMsg, languageSource.CommonLang.tips, "warning", async () => {
        let ids = [];
        this.multipleSelection.forEach((item, index) => {
          let obj = { applicationId: item.applicationId };
          ids.push(obj);
        });
        // let param = {
        //   "applicationId": ids
        // };
        this.$http.postJson(this.config.api.deleteApplyByIds, JSON.stringify(ids))
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.CommonLang.deleteSuccess, languageSource.CommonLang.tips, 'success');
          });
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
  padding: 0px;
  margin-left: 0px;
}
.download-style {
  color: #2c579b;
  text-decoration: underline;
  cursor: pointer;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.filename-loading {
  text-align: center;
}
.common-style {
  width: 180px;
}
</style>
