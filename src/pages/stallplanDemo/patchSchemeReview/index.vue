<template>
  <el-page class="seat">
    <template slot="header">
      <kindo-box :title="languageSource.AdjustmentApply.patchReviewTitle">
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="schemeName" :label="languageSource.LocationLang.programNameTable">
            <!-- :placeholder="languageSource.LocationLang.programNameTip" -->
            <el-input v-model="searchForm.schemeName" clearable :maxlength="255" class="common-style"></el-input>
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
          <el-form-item prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable">
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

      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table
          ref="table"
          :pageIndex="false"
          :span-method="arraySpanMethod"
          :url="config.api.patchSchemeReviewGetList"
          :queryParam="form"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="!(right('batchSubmit') || right('batchRefuse'))" width="1">
            <template slot-scope="scope">
              {{ scope.row? '' : '' }}
            </template>
          </el-table-column>
          <el-table-column v-if="(right('batchSubmit') || right('batchRefuse'))" type="selection" min-width="46" header-align="center" align="center"></el-table-column>
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
              <router-link :to="{ path: '/stallplanDemo/patchSchemeArea?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'patchSchemeReview', right: 'patchSchemeReview', pluginBtnState: false, addState: false, notValidateArray: ['checkProgressRule', 'isRepeatArranged'] }}"><el-button type="text" size="mini" >{{languageSource.AdjustmentApply.checkTitle}}</el-button></router-link>
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" v-if="right('batchSubmit')" @click="showDialog('submit')" :disabled="submitBtnState">{{languageSource.AdjustmentApply.batchSubmit}}</el-button>
            <!-- <el-button type="primary" v-if="right('batchRefuse')" @click="showDialog('refuse')" :disabled="submitBtnState">{{languageSource.AdjustmentApply.batchRefuse}}</el-button> -->
          </div>
        </kindo-table>
      </kindo-box>

      <!-- <kindo-box>
        <kindo-table
          ref="table"
          :pageIndex="false"
          :span-method="arraySpanMethod"
          :url="config.api.patchSchemeReviewGetList"
          :queryParam="form"
          @selection-change="handleSelectionChange"
        >
          <el-table-column v-if="!right('batchSubmit')" width="1">
            <template slot-scope="scope">
              {{ scope.row? '' : '' }}
            </template>
          </el-table-column>
          <el-table-column v-if="right('batchSubmit')" type="selection" min-width="46" header-align="center" align="center"></el-table-column>
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
              <router-link :to="{ path: '/stallplanDemo/patchSchemeArea?primarycolor=2b579a', query: { scopeRow: scope.row, tag: 'patchSchemeReview' }}"><el-button type="text" size="mini" >{{languageSource.AdjustmentApply.checkTitle}}</el-button></router-link>
            </template>
          </el-table-column>
          <div slot="control">
            <el-button type="primary" v-if="right('batchSubmit')" @click="dialogFormVisible = true" :disabled="submitBtnState">{{languageSource.AdjustmentApply.batchSubmit}}</el-button>
            <el-button type="primary" v-if="right('batchRefuse')" @click="dialogFormVisible = true" :disabled="submitBtnState">批量拒绝</el-button>
          </div>
        </kindo-table>
      </kindo-box> -->

      <el-dialog
        :title="currentType === 'submit' ? languageSource.AdjustmentApply.submitSuggest : languageSource.AdjustmentApply.batchRefuseMsg"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        @close="clear"
        width="60%">
        <el-form ref="submitSuggestForm" :model="submitSuggestForm" :rules="rules" style="margin-bottom: 20px;" label-position="left">
          <el-form-item :label="currentType === 'submit' ? `${languageSource.AdjustmentApply.submitSuggest}：` : `${languageSource.AdjustmentApply.batchRefuse}：`" prop="submitSuggest">
            <el-input type="textarea" v-model="submitSuggestForm.submitSuggest" rows="6" style="width: 90%;" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" >
          <el-button @click="dialogFormVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
          <el-button type="primary" @click="batchSubmitFunc" :loading="refuseLoading">{{languageSource.CommonLang.confirm}}</el-button>
        </div>
      </el-dialog>

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
    'headline': () => import('../components/headline.vue')
  },
  data() {
    return {
      'pageId': 'patchSchemeReview',
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
      },
      //文件名数据
      fileNames: [],
      //多选数据
      multipleSelection: [],
      //批量提交按钮点击状态
      submitBtnState: true,
      //意见提交表单
      submitSuggestForm: {
        submitSuggest: ''
      },
      //意见按钮加载状态
      refuseLoading: false,
      //意见弹框
      dialogFormVisible: false,
      rules: {},
      currentType: 'submit'
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

    let languageSource = this.languageSource;
    this.rules = {
      submitSuggest: [
        { required: true, message: languageSource.AdjustmentApply.submitSuggestTips, trigger: 'change' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      ]
    };
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
    //合并单元格方法
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 2 || columnIndex >= 14) {
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
      this.$router.push({ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: row.applying, tag: 'patchSchemeReview', right: 'review' }});
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
    //批量提交方法
    batchSubmitFunc () {
      this.$refs.submitSuggestForm.validate(valid => {
        if (valid) {
          this.refuseLoading = true;
          let submitData = [];
          let multipleSelection = this.multipleSelection;
          multipleSelection.forEach((item, index) => {
            let obj = {
              "schemeId": item.schemeId,
              "taskEntities": [{ "curActId": item.curActId ? item.curActId : item.taskEntities[0].curActId }],
              "variables": {
                "passFlag": '1',
                "reviewComment": this.submitSuggestForm.submitSuggest
              }
            };
            submitData.push(obj);
          });
          submitData = this.arrayReduce(submitData);
          this.$http.postJson(this.config.api.patchSchemesubmitApproveBatch, submitData)
            .then(res => {
              this.refuseLoading = false;
              this.dialogFormVisible = false;
              this.$refs.table.reloadData();
            });
        }
      });
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.submitBtnState = val.length <= 0;
    },
    //数组对象去重
    arrayReduce (arr) {
      let obj = {};
      let resultArr = [];
      resultArr = arr.reduce(function(item, next) {
        obj[next.schemeId] ? '' : obj[next.schemeId] = true && item.push(next);
        return item;
      }, []);
      return resultArr;
    },
    //清除方法
    clear () {
      this.refuseLoading = false;
      this.$refs.submitSuggestForm.resetFields();
    },
    //显示弹框方法
    showDialog (label) {
      this.dialogFormVisible = true;
      this.currentType = label;
      // let languageSource = this.languageSource;
      // if (label === 'submit') {
      //   this.rules = {
      //     submitSuggest: [
      //       { required: true, message: languageSource.AdjustmentApply.submitSuggestTips, trigger: 'change' },
      //       { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      //     ]
      //   };
      // } else {
      //   this.rules = {
      //     submitSuggest: [
      //       { required: true, message: languageSource.AdjustmentApply.batchRefuseTips, trigger: 'change' },
      //       { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      //     ]
      //   };
      // }
    }
  }
};
</script>

<style scoped>
.seat {
  padding: 0 10px;
  overflow-y: auto;
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
