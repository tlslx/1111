<template>
  <el-page class="seat">
    <template slot="header">
      <kindo-box :title="languageSource.AdjustmentApply.patchAddTitle"  icon="fa-search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="schemeName" :label="languageSource.LocationLang.programNameTable">
            <!-- :placeholder="languageSource.LocationLang.programNameTip" -->
            <el-input v-model="searchForm.schemeName" clearable  :maxlength="255" class="common-style" ></el-input>
          </el-form-item>
          <el-form-item prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable">
            <!-- :placeholder="languageSource.LocationLang.exhibitionPositionTypeTip" -->
            <el-select v-model="searchForm.exhibitionProperty" clearable class="common-style" placeholder="" >
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable" >
            <!-- :placeholder="languageSource.LocationLang.exhibitionAreaTip" -->
            <el-select v-model="searchForm.exhibitionAreaName" clearable class="common-style" placeholder="" >
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
          <el-form-item prop="schemaStatus" :label="languageSource.AdjustmentApply.subtypeTable">
            <!-- :placeholder="languageSource.AdjustmentApply.subtypeTips" -->
            <el-select v-model="searchForm.schemaStatus" clearable class="common-style" placeholder="" >
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
    <template slot="body">
      <kindo-box>
        <kindo-table
          ref="table"
          :pageIndex="false"
          :span-method="arraySpanMethod"
          :url="config.api.reviewArrangementGetList"
          :queryParam="form"
        >
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.expcode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="paSchemeEnterpriseList[0].cantonCode" :label="languageSource.LocationLang.programCode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="paSchemeEnterpriseList[0].businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="paSchemeEnterpriseList[0].chamberOfCommerce" :label="languageSource.AdjustmentApply.association" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.boothCode" :label="languageSource.AdjustmentApply.beforeBoothCode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.adjustedBoothCode" :label="languageSource.LocationLang.afterBoothCode" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.adjustmentReason" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="160" header-align="center" align="center">
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
                @click="downloadFunc(scope.row.applying.fileId)"
                @mouseenter="setPageItem(scope.row.applying.fileId)"
                class="download-style">
                {{languageSource.AdjustmentApply.download}}
              </label>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="applying.createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.description" :label="languageSource.AdjustmentApply.subtypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="arrangeResult" :label="languageSource.LocationLang.arrangeReson" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schemeName" :label="languageSource.LocationLang.programNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="createDate" :label="languageSource.LocationLang.arrangeTime" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.description" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="160">
            <template slot-scope="scope" >
              <el-button type="text" size="mini" @click="goToDetail(scope.row)">{{languageSource.CommonLang.view}}</el-button>
              <!-- <el-button type="text" size="mini" v-if="scope.row.recall" @click="handleRemove(scope.row)">{{languageSource.LocationLang.revoke}}</el-button> -->
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" v-if="right('arrangeLocation')" @click="showInfo">{{languageSource.AdjustmentApply.postionArrange}}</el-button>
          </div>
        </kindo-table>
      </kindo-box>

      <!-- <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.reviewArrangementGetList"
          :span-method="arraySpanMethod"
          :queryParam="form"
          :pageIndex="false"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" header-align="center" align="center" min-width="100"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" header-align="center" align="center" min-width="100"></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schemeName" :label="languageSource.LocationLang.programNameTable" min-width="200" header-align="center" align="center"></el-table-column>
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

          <el-table-column prop="applying.enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="97" header-align="center" align="center">
            <template slot-scope="scope" >
              <div @click="checkFunc(scope.row)" class="view-style" >
                {{scope.row.applying.enterpriseName}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="applying.exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumberTable" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.adjustmentReason" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="97" header-align="center" align="center">
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
                  @click="downloadFunc(scope.row.applying.fileId)"
                  @mouseenter="setPageItem(scope.row.applying.fileId)"
                  class="download-style">
                  {{languageSource.AdjustmentApply.download}}
                </label>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="applying.createDate" :label="languageSource.AdjustmentApply.applyTime" min-width="97" header-align="center" align="center"></el-table-column>
          <el-table-column prop="applying.description" :label="languageSource.AdjustmentApply.subtypeTable" min-width="97" header-align="center" align="center"></el-table-column>

          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="130">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplanDemo/patchSchemeArea?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'patchSchemeAdd' }}"><el-button type="text" size="mini" >{{languageSource.CommonLang.view}}</el-button></router-link>
              <el-button type="text" size="mini" v-if="scope.row.recall" @click="handleRemove(scope.row)">{{languageSource.LocationLang.revoke}}</el-button>
            </template>
          </el-table-column>
          <div slot="control">
            <el-button type="primary" v-if="right('arrangeLocation')" @click="showInfo">{{languageSource.AdjustmentApply.postionArrange}}</el-button>
          </div>
        </kindo-table>
      </kindo-box> -->

      <!-- 安排位置 -->
      <send-arrange-dialog
        @sendArrange="reloadTable"
        :languageSource='languageSource'
        ref="sendArrangeDialog" />

      <!-- 规则提示 -->
      <info-dialog
        @makeSure="infoSureFunc"
        :languageSource="languageSource"
        ref="infoDialog"/>

    </template>
  </el-page>
</template>

<script>
import { Loading } from 'element-ui';
import config from './components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "StallPlanSeat",
  mixins: [listPageBase],
  components: {
    'sendArrangeDialog': () => import('./components/sendArrangeDialog.vue'),
    'infoDialog': () => import('./components/infoDialog.vue'),
    'headline': () => import('../components/headline.vue')
  },
  data() {
    return {
      'pageId': 'patchSchemeAdd',
      //接口地址
      config,
      'searchForm': {
        schemeName: '',
        exhibitionAreaName: '',
        exhibitionProperty: '',
        schemaStatus: ''
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
      },
      //拒绝提示框显示状态
      dialogFormVisible: false,
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
    }
  },
  async beforeCreate () {
    //读取数据字典
    this.natures = await kindo.dictionary.get('depositBoothType'); //展位性质
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
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
      this.checkDialogShow();
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
    // 下载Excel模板
    download () {
      window.location.href = this.config.api.download;
    },
    // 撤销
    handleRemove (row) {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.patchCancelTips, languageSource.CommonLang.tips, "warning", async () => {
        let cancelData = {
          "schemeId": row.schemeId,
          "taskEntities": [{ "curActId": row.curActId ? row.curActId : row.taskEntities[0].curActId }]
        };
        this.$http.postJson(this.config.api.reviewArrangementCancel, cancelData)
          .then(res => {
            this.$refs.table.loadData();
            kindo.util.alert(languageSource.LocationLang.cancelSucess, languageSource.CommonLang.tips, 'success');
          });
      });
    },
    //撤销/删除按钮显示隐藏控制
    checkShow (code) {
      if (code === 1) {
        return 'cancel';
      } else if (code === 5) {
        return 'delete';
      } else {
        return false;
      }
    },
    //删除操作
    handleDelete (id) {
      let deleteData = {
        "schemeId": id
      };
      this.$http.postJson(this.config.api.reviewArrangementDelete, deleteData)
        .then(res => {
          this.$refs.table.loadData();
        });
    },
    //公示或公布成功重新加载表格
    reloadTable () {
      this.$refs.table.loadData();
    },
    //查询审核状态下拉框的值
    getActName () {
      let param = { 'json': { "actName": "positionAdjustProcess" }};
      this.$http.get(this.config.api.getApplyStatus, param)
        .then(res => {
          let array = [];
          let result = res.schemaStatus;
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
    //需要展示提示框的弹框点击
    showInfo () {
      this.$refs.infoDialog.dialogVisible = true;
      this.$refs.infoDialog.getInfo();
    },
    //规则提示确定方法
    infoSureFunc () {
      this.sendArrange();
    },
    //生成位置安排方案
    sendArrange () {
      this.$refs.sendArrangeDialog.dialogVisible = true;
      this.$refs.sendArrangeDialog.onResetQuery(); //调用表格查询方法
    },
    //判断位置安排弹出框是否显示
    checkDialogShow () {
      let arrangeDialogValue = (this.$route.query && this.$route.query.arrangeDialog) ? this.$route.query.arrangeDialog : "";
      if (arrangeDialogValue === 'true') {
        this.$refs.sendArrangeDialog.dialogVisible = true;
        this.$refs.sendArrangeDialog.onResetQuery(); //调用表格查询方法
      }
    },
    //合并单元格方法
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 1 || columnIndex >= 13) {
        let rowValue = this.checkItemSpan()[rowIndex];
        let colValue = rowValue > 0 ? 1 : 0;
        return {
          rowspan: rowValue,
          colspan: colValue
        };
      }
    },
    //合并单元格判断
    checkItemSpan () {
      let tableData = this.$refs.table.internalData;
      let rowSpanArray = [];
      let spanIndex = 0;
      tableData.forEach((item, index) => {
        if (index === 0) {
          rowSpanArray.push(1);
        } else if (index > 0 && item.schemeId === tableData[index - 1].schemeId) {
          rowSpanArray[spanIndex] += 1;
          rowSpanArray.push(0);
        } else if (index > 0) {
          rowSpanArray.push(1);
          spanIndex = index;
        }
      });

      return rowSpanArray;
    },
    checkFunc (row) {
      this.$router.push({ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: row.applying, tag: 'patchSchemeAdd', right: 'review' }});
    },
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
    //查看跳转
    goToDetail (row) {
      let addState = row.status === 4;
      if (row.status === 4) {
        let params = { 'json': {
          "schemeId": row.schemeId,
          "schemaStatus": row.schemaStatus
        }};
        const loading = Loading.service({
          lock: true
        });
        let url = this.config.api.reviewArrangementGetDetail; //补丁方案新增查看详情接口
        this.$http.get(url, params)
          .then((res) => {
            row.selectData = res.list;
            this.$router.push({ path: '/stallplanDemo/patchSchemeArea?primarycolor=2b579a', query: { scopeRow: row, tag: 'patchSchemeAdd', right: 'patchSchemeView', pluginBtnState: addState, addState: addState, notValidateArray: ['checkProgressRule', 'isRepeatArranged'] }});
            loading.close();
          });
      } else {
        this.$router.push({ path: '/stallplanDemo/patchSchemeArea?primarycolor=2b579a', query: { scopeRow: row, tag: 'patchSchemeAdd', right: 'patchSchemeView', pluginBtnState: addState, addState: addState, notValidateArray: ['checkProgressRule', 'isRepeatArranged'] }});
      }
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
  margin-bottom: 3px;
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
.view-style {
  color: #3a8ee6;
  text-decoration: underline;
  cursor: pointer;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.common-style {
  width: 180px;
}
</style>
