<template>
  <el-dialog
    :title="languageSource.LocationLang.view"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="90%">
    <kindo-box>
      <el-form :inline="true" :model="searchForm" ref="searchForm" label-width="85px" label-position="left"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-row>
          <el-form-item prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable">
            <el-select v-model="searchForm.positionNature" clearable class="common-style"
              placeholder="">
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable">
            <el-select v-model="searchForm.exhibitionType" clearable class="common-style"
              placeholder="">
              <el-option
                v-for="nature in exhibitionType"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable">
            <el-select v-model="searchForm.exhibitionArea" clearable class="common-style"
              placeholder="">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable">
            <el-input v-model="searchForm.enterpriseName" clearable class="common-style"  :maxlength="255"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="clearForm">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table
        ref="arrangeTable"
        :url="config.api.applyReviewGetList"
        :queryParam="form"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="46" header-align="center" align="center"></el-table-column>
        <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.expcode" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="cantonCode" :label="languageSource.LocationLang.programCode" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="businessDelegation" :label="languageSource.AdjustmentApply.businessDelegationTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="chamberOfCommerce" :label="languageSource.AdjustmentApply.association" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="200" header-align="center" align="center"></el-table-column>
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
            <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'sendArrangeDialog', right: 'review' }}"><el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button></router-link>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box>

    <!-- <kindo-box>
      <kindo-table
        ref="arrangeTable"
        :url="config.api.sendArrangeGetList"
        :queryParam="form"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="46" header-align="center" align="center"></el-table-column>
        <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="200" header-align="center" align="center"></el-table-column>
        <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumberTable" min-width="160" header-align="center" align="center"></el-table-column>
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
        <el-table-column fixed="right" :label="languageSource.CommonLang.operation" min-width="130" header-align="center" align="center">
          <template slot-scope="scope" >
            <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'sendArrangeDialog', right: 'review' }}"><el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button></router-link>
          </template>
        </el-table-column>
      </kindo-table>
    </kindo-box> -->
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitFunc('gearPublicity', multipleSelection)" :disabled="arrangeState" :loading="submitLoading">{{languageSource.CommonLang.confirm}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'publicityDialog',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      'dialogVisible': false,
      //多选保存的值
      'multipleSelection': [],
      //安排位置按钮状态
      'arrangeState': true,
      'searchForm': {
        positionNature: '',
        exhibitionType: '',
        exhibitionArea: '',
        enterpriseName: ''
      },
      //展位类型
      'natures': [],
      //展区
      'regionOfExhibition': [],
      //布展类型
      'exhibitionType': [],
      '_forms': {},
      //文件名数据
      fileNames: [],
      //提交按钮加载中状态
      submitLoading: false
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: { ...this.searchForm, status: 1 }
      };
    }
  },
  async created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取数据字典
    this.natures = await kindo.dictionary.get('depositBoothType'); //展位性质
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
    this.exhibitionType = await kindo.dictionary.get('exhibitionType'); //布展类型
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.arrangeTable.reloadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.arrangeTable.reloadData();
      });
    },
    submitFunc (formName, multipleSelection) {
      if (this.arrangeState) {
        return false;
      }
      this.submitLoading = true;
      let scopeRow = {
        exhibitionProperty: multipleSelection[0].positionNature,
        exhibitionAreaName: multipleSelection[0].exhibitionArea,
        exhibitionAreaCode: multipleSelection[0].exhibitionAreaCode,
        exhibitionPeriod: multipleSelection[0].exhibitionPeriod,
        sessionNumber: multipleSelection[0].sessionNumber,
        selectData: multipleSelection
      };
      this.$router.push({ path: '/stallplanDemo/patchSchemeArea?primarycolor=2b579a', query: { scopeRow: scopeRow, tag: 'businessArrange', pluginBtnState: true, addState: true, notValidateArray: ['checkProgressRule', 'isRepeatArranged'] }});
      // this.submitLoading = true;
      // this.$http.postJson(this.config.api.businessSendApply, this.multipleSelection)
      //   .then(res => {
      //     this.dialogVisible = false;
      //     this.submitLoading = false;
      //     this.$message.success(this.languageSource.CommonLang.operationSuccess);
      //     this.multipleSelection = [];
      //     this.$emit('sendArrange');
      //   });
    },
    clear () {
      this.multipleSelection = [];
    },
    // 多选
    handleSelectionChange (val) {
      let languageSource = this.languageSource;
      this.multipleSelection = val;
      let valLength = val.length;
      for (let i = 0; i < valLength; i++) {
        //只有状态为1的时候可以生成方案
        let pass = val.filter(v => v.status === 1);
        if (pass.length !== valLength) {
          this.arrangeState = true;
          this.$message.error(languageSource.AdjustmentApply.applyCheckFirst);
          return false;
        }
        let exhibitionAreaResult = val.filter(v => v.exhibitionArea === val[i].exhibitionArea);
        let positionNatureResult = val.filter(v => v.positionNature === val[i].positionNature);
        let exhibitionTypeResult = val.filter(v => v.exhibitionType === val[i].exhibitionType);
        if (exhibitionAreaResult.length !== valLength) {
          this.$message.error(languageSource.AdjustmentApply.applyCheckSecond);
          this.arrangeState = true;
          return false;
        }
        if (positionNatureResult.length !== valLength) {
          this.$message.error(languageSource.AdjustmentApply.applyCheckThird);
          this.arrangeState = true;
          return false;
        }
        if (exhibitionTypeResult.length !== valLength) {
          this.$message.error(languageSource.AdjustmentApply.applyCheckLast);
          this.arrangeState = true;
          return false;
        }
      }
      this.arrangeState = valLength <= 0;
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
    clearForm () {
      this.$refs.searchForm.resetFields();
      this.onResetQuery();
    }
  }
};
</script>

<style scoped>
.date-span {
  padding: 0 !important;
}
.date-item {
  margin-bottom: 0;
}
.download-style {
  color: #2c579b;
  text-decoration: underline;
  cursor: pointer;
}
.filename-loading {
  text-align: center;
}
.common-style {
  width: 180px;
}
</style>
