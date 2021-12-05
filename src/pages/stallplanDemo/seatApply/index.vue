<template>
  <el-page class="seat">
    <template slot="header">
      <kindo-box :title="languageSource.AdjustmentApply.seatApplyLable" icon="fa-search">
        <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="schemeName" :label="languageSource.LocationLang.programNameTable">
            <!-- :placeholder="languageSource.LocationLang.programNameTip" -->
            <el-input :maxlength='255' v-model="searchForm.schemeName" clearable class="common-style" ></el-input>
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
          <el-form-item>
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable">
            <!-- :placeholder="languageSource.AdjustmentApply.subtypeTips" -->
            <el-select v-model="searchForm.exhibitionType" clearable class="common-style" placeholder="" >
              <el-option
                v-for="area in exhibitionTypeOption"
                :key="area.value"
                :label="area.label"
                :value="area.label">
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
          :url="config.api.getApprove"
          :queryParam="form"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="sessionNumber" :label="languageSource.LocationLang.sessionnumber" header-align="center" align="center" min-width="80px"></el-table-column>
          <el-table-column prop="exhibitionPeriod" :label="languageSource.LocationLang.exhibitionPeriodTable" header-align="center" align="center" min-width="80px"></el-table-column>
          <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="100px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionProperty" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="100px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionKind" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="100px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="schemeName" :label="languageSource.LocationLang.programNameTable" min-width="100px" header-align="center" align="center">
            <template slot-scope="scope">
              <label class="text-over-style" :title="scope.row.schemeName">{{scope.row.schemeName}}</label>
            </template>
          </el-table-column>
          <el-table-column prop="creatorName" :label="languageSource.LocationLang.creatorName" min-width="120px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="createDate" :label="languageSource.LocationLang.createDate" min-width="130px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifierName" :label="languageSource.LocationLang.modifierName" min-width="120px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="modifyDate" :label="languageSource.LocationLang.modifyDate" min-width="130px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="description" :label="languageSource.LocationLang.description" min-width="100px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="arrangredBooth" :label="languageSource.LocationLang.arrangementNum" min-width="110px" header-align="center" align="center"></el-table-column>
          <el-table-column prop="isCentralPassage" :label="languageSource.LocationLang.centralChannelTable" min-width="110px" header-align="center" align="center">
            <template slot-scope="scope">
              {{ scope.row.isCentralPassage === 1 ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publicityTime" header-align="center">
            <el-table-column :label="languageSource.LocationLang.startDate" prop="publicityStartDate" min-width="100px" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.endDate" prop="publicityEndDate" min-width="100px" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publicityStatus" min-width="100px" header-align="center" align="center">
            <template slot-scope="scope">
              {{ scope.row.publicityStatus === 1 ? '已公示' : '未公示' }}
            </template>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publishTime" header-align="center">
            <el-table-column :label="languageSource.LocationLang.startDate" prop="publishStartDate" min-width="100px" header-align="center" align="center"></el-table-column>
            <el-table-column :label="languageSource.LocationLang.endDate" prop="publishEndDate" min-width="100px" header-align="center" align="center"></el-table-column>
          </el-table-column>
          <el-table-column :label="languageSource.LocationLang.publishStatus" min-width="100px" header-align="center" align="center">
            <template slot-scope="scope">
              {{ scope.row.publishStatus === 1 ? '已公布' : '未公布' }}
            </template>
          </el-table-column>
          <el-table-column :label="languageSource.CommonLang.operation" align="center" fixed="right" min-width="130px">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplanDemo/seatArea?primarycolor=2b579a', query: { businessKey: scope.row.schemeId, scopeRow: scope.row, tag: 'seatApply', right: 'seatApplyView', pluginBtnState: scope.row.delete, addState: false, notValidateArray: [] }}"><el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button></router-link>
              <el-button type="text" size="mini" class="m-l-n" v-if="scope.row.delete" @click="handleRemove(scope.row.schemeId)">{{languageSource.CommonLang.delete}}</el-button>
              <!-- <el-button type="text" size="mini" class="m-l-n" v-if="scope.row.start" @click="startSubmit(scope.row)">{{languageSource.CommonLang.submit}}</el-button> -->
              <!-- 方案作废才显示，并且只有这一个操作按钮，现在先调试 -->
              <!-- <el-button type="text" size="mini" class="m-l-n" @click="saveAsFunc(scope.row)">{{languageSource.LocationLang.saveAs}}</el-button> -->
            </template>
          </el-table-column>

          <div slot="control">
            <el-button type="primary" v-if="right('download')" @click="showInfo('download')">{{languageSource.LocationLang.downloadExcel}}</el-button>
            <el-button type="primary" v-if="right('import')" @click="showInfo('importFile')">{{languageSource.LocationLang.import}}</el-button>
            <el-button type="primary" v-if="right('onlineArrange')" @click="showInfo('onlineArrange')" >{{languageSource.LocationLang.onlineArrange}}</el-button>
            <el-button type="primary" v-if="right('automaticArrange')" @click="showInfo('autoArrange')" >{{languageSource.LocationLang.automaticArrange}}</el-button>
            <el-button type="primary" v-if="right('viewProgress')" @click="checkProgressFunc" >{{languageSource.LocationLang.viewProgress}}</el-button>
            <el-button type="primary" v-if="right('schemeComparison')" @click="contrastFunc" :disabled="btnDisabled">{{languageSource.LocationLang.schemeComparison}}</el-button>
          </div>
        </kindo-table>
      </kindo-box>

      <!-- 在线分配企业 -->
      <gear-dialog
        :natures="natures"
        :regionOfExhibition="regionOfExhibition"
        :exhibitionPeriodNum="exhibitionPeriodNum"
        :languageSource="languageSource"
        :currentType="showDialogName"
        :exhibitionTypeOption="exhibitionTypeOption"
        ref="gearDialog"/>

      <!-- 规则提示 -->
      <info-dialog
        @makeSure="infoSureFunc"
        :languageSource="languageSource"
        ref="infoDialog"/>

      <!-- 检查安排进度 -->
      <check-progress
        ref="checkProgress"
        :exhibitionPeriodNum="exhibitionPeriodNum"
        :natures="natures"
        :exhibitionTypeOption="exhibitionTypeOption"
        :regionOfExhibition="regionOfExhibition"
        :languageSource="languageSource"
        type="seatApply"
      />

      <!-- 方案对比 -->
      <contrast
        ref="contrast"
        :regionOfExhibition="regionOfExhibition"
        :languageSource="languageSource"
        :scopeRow="currentRow"
        type="seatApply"
      />

      <el-dialog
        :title="languageSource.LocationLang.saveAs"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        @close="clear"
        width="50%">
        <el-form :model="messageForm" ref="messageForm" label-position="left" label-width="96px" >
          <el-form-item :label="languageSource.LocationLang.saveAsLabel">
            <el-input v-model="messageForm.messageText" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
          <el-button type="primary" @click="submitFunc" >{{languageSource.CommonLang.confirm}}</el-button>
        </span>
      </el-dialog>

    </template>
  </el-page>
</template>

<script>
import config from './components';
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../scripts/framework/store';
export default {
  name: "StallPlanSeat",
  mixins: [tableMixIn, listPageBase],
  components: {
    'gearDialog': () => import('./components/gearDialog'),
    'infoDialog': () => import('./components/infoDialog.vue'),
    'checkProgress': () => import('../seatArea/components/checkProgess.vue'),
    'contrast': () => import('../seatArea/components/contrast.vue'),
    'headline': () => import('../components/headline')
  },
  data() {
    return {
      'pageId': 'seatApply',
      //接口地址
      config,
      store,
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
      //布展类型
      'exhibitionTypeOption': [],
      'multipleSelection': [],
      'btnState': false, //导出为PDF按钮状态
      'publicityState': false, //公示按钮状态
      'publishState': false, //公布按钮状态
      '_forms': {},
      'languageSource': {
        'AdjustmentApply': {},
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'CheckProgress': {}
      },
      actNameOption: [],
      showDialogName: '',
      currentRow: {},
      messageForm: {
        messageText: ''
      },
      dialogVisible: false,
      saveAsRow: {}
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    },
    btnDisabled: function () {
      let currentRow = this.currentRow;
      if (currentRow && currentRow.schemeId) {
        return false;
      } else {
        return true;
      }
    }
  },
  async beforeCreate () {
    //读取数据字典
    this.natures = await kindo.dictionary.get('depositBoothType'); //展位性质
    this.regionOfExhibition = await kindo.dictionary.get('exhibitionArea'); //展区
    this.exhibitionPeriodNum = await kindo.dictionary.get('exhibitionPeriodNum'); //展期
    this.exhibitionTypeOption = await kindo.dictionary.get('exhibitionType'); //布展类型
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取国际化
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.CheckProgress = kindo.util.getLanguage('CheckProgress');
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
      // this.getActName();
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
    //导入成功后重新刷新表格
    handleLead () {
      this.$refs.searchForm.resetFields();
      this.$refs.table.reloadData();
    },
    // 撤销
    handleRemove (schemeId) {
      let languageSource = this.languageSource;
      kindo.util.confirm(languageSource.AdjustmentApply.programDeleteTips, languageSource.CommonLang.tips, "warning", async () => {
        let cancelData = { "schemeId": schemeId };
        this.$http.postJson(this.config.api.cancelSchema, cancelData)
          .then(res => {
            this.$refs.table.loadData();
            this.currentRow = {};
            kindo.util.alert(languageSource.CommonLang.deleteSuccess, languageSource.CommonLang.tips, 'success');
          });
      });
    },
    //公示或公布成功重新加载表格
    reloadTable () {
      this.$refs.table.loadData();
    },
    //查询审核状态下拉框的值
    getActName () {
      let param = { 'json': { "actName": "positionAssignApply" }};
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
          this.actNameOption = array;
        });
    },
    //需要展示提示框的弹框点击
    showInfo (name) {
      this.showDialogName = name;
      if (name === 'download') {
        this.$refs.gearDialog.dialogVisible = true;
        this.$refs.gearDialog.getSessionNumber();
        this.$refs.gearDialog.getExhibitionAreaRow();
      } else {
        this.$refs.infoDialog.dialogVisible = true;
        this.$refs.infoDialog.getInfo();
      }
    },
    //规则提示确定方法
    infoSureFunc () {
      // if (this.showDialogName === 'onlineArrange') {
      //   this.$refs.gearDialog.dialogVisible = true;
      // } else if (this.showDialogName === 'autoArrange') {
      //   this.$refs.autoDialog.dialogVisible = true;
      // } else if (this.showDialogName === 'importFile') {
      //   this.$refs.importDialog.dialogVisible = true;
      // }
      this.$refs.gearDialog.dialogVisible = true;
      this.$refs.gearDialog.getSessionNumber();
      // this.$refs.gearDialog.getExhibitionAreaRow();
    },
    //检查安排进度点击方法
    checkProgressFunc () {
      this.$refs.checkProgress.dialogVisible = true;
      this.$refs.checkProgress.getSessionNumber();
      // this.$refs.checkProgress.onResetQuery();
      // this.$refs.checkProgress.getDetail();
    },
    //方案对比点击方法
    contrastFunc () {
      this.$refs.contrast.dialogVisible = true;
      this.$refs.contrast.onResetQuery();
    },
    //当前行点击方法
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //方案提交方法
    startSubmit (row) {

    },
    //方案另存为按钮点击方法
    saveAsFunc (row) {
      this.dialogVisible = true;
      this.saveAsRow = row;
      this.messageForm.messageText = row.schemeName + ' + 副本';
    },
    //另存为保存方法
    submitFunc () {
      this.dialogVisible = false;
    },
    //关闭提示框清除方法
    clear () {
      this.messageForm = {
        messageText: ''
      };
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
  padding: 0px;
  margin-left: 0px;
}
.f-b-m {
  margin-left: 29px;
}
.text-over-style {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.common-style {
  width: 180px;
}
</style>
