<template>
  <el-page class="seat">
    <template slot="header">
      <kindo-box :title="languageSource.AdjustmentApply.adjustReviewTitle" icon="fa-search">
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
                v-for="nature in exhibitionType"
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
          <!-- <el-form-item prop="applyStatus" label="记录状态：">
            <el-select v-model="searchForm.applyStatus" clearable placeholder="请选择记录状态">
              <el-option
                v-for="area in auditStatusOption"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.applyReviewGetList"
          :queryParam="form"
        >
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
              <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentReview', others: 'business', right: 'review' }}"><el-button type="text" size="mini" v-if="right('view')" >{{languageSource.CommonLang.view}}</el-button></router-link>
              <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentReview', right: 'review' }}"><el-button type="text" size="mini" v-if="right('review')" >{{languageSource.AdjustmentApply.checkTitle}}</el-button></router-link>
              <el-button type="text" v-if="right('refuse')" @click="refuseFunc(scope.row)" :style="styleObject(scope.row.status)">{{languageSource.AdjustmentApply.refuse}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <!-- <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.applyReviewGetList"
          :queryParam="form"
        >
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaNameTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionPropertyTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionTypeTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumberTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContentTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentReason" :label="languageSource.AdjustmentApply.adjuestResonTable" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annexTable" min-width="160" header-align="center" align="center">
            <template slot-scope="scope" >
              <el-popover
                placement="right"
                trigger="hover"
                width="220"
                @hide='clearFileName' >
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
              <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentReview', others: 'business', right: 'review' }}"><el-button type="text" size="mini" v-if="right('view')" >{{languageSource.CommonLang.view}}</el-button></router-link>
              <router-link :to="{ path: '/stallplanDemo/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'adjustmentReview', right: 'review' }}"><el-button type="text" size="mini" v-if="right('review')" >{{languageSource.AdjustmentApply.checkTitle}}</el-button></router-link>
              <el-button type="text" v-if="right('refuse')" @click="refuseFunc(scope.row)" :style="styleObject(scope.row.status)">{{languageSource.AdjustmentApply.refuse}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box> -->

      <el-dialog
        :title="languageSource.AdjustmentApply.refuseReson"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        @close="clear"
        width="60%">
        <el-form ref="refuseForm" :model="refuseForm" :rules="refuseRule" style="margin-bottom: 20px;" label-position="left">
          <el-form-item :label="languageSource.AdjustmentApply.refuseReson" prop="refuseReson">
            <el-input type="textarea" v-model="refuseForm.refuseReson" rows="6" style="width: 90%;" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" >
          <el-button @click="dialogFormVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
          <el-button type="primary" @click="refuseSure" :loading="refuseLoading">{{languageSource.CommonLang.confirm}}</el-button>
        </div>
      </el-dialog>

    </template>
  </el-page>
</template>

<script>
import config from './components';
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../scripts/framework/store';
export default {
  name: "BusinessAssociation",
  mixins: [listPageBase],
  components: {
    'headline': () => import('../components/headline.vue')
  },
  data() {
    return {
      'pageId': 'adjustmentReview',
      //接口地址
      config,
      store,
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
      //国际化内容值
      'languageSource': {
        'LocationLang': {},
        'CommonLang': {},
        'RuleSettingLang': {},
        'AdjustmentApply': {}
      },
      //安排位置按钮状态
      arrangeState: true,
      //审核拒绝弹框状态
      dialogFormVisible: false,
      //拒绝表单
      refuseForm: {
        refuseReson: ''
      },
      refuseRule: {},
      //拒绝参数
      refuseObj: {},
      //审核状态
      auditStatusOption: [],
      //拒绝确定按钮加载状态
      refuseLoading: false,
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
    this.exhibitionType = await kindo.dictionary.get('exhibitionType'); //布展类型
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取国际化
    this.languageSource.LocationLang = kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = kindo.util.getLanguage('AdjustmentApply');

    //设置校验信息国际化
    let languageSource = this.languageSource;
    this.refuseRule = {
      refuseReson: [
        { required: true, message: languageSource.AdjustmentApply.refuseResonTips, trigger: 'change' },
        { max: 255, message: languageSource.LocationLang.toLongMsg, trigger: 'change' }
      ]
    };
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
    //拒绝点击
    refuseFunc (row) {
      if (row.status !== 1) {
        this.$message.error(this.languageSource.AdjustmentApply.refuseFuncTips);
        return false;
      }
      this.dialogFormVisible = true;
      this.refuseObj = row;
    },
    //拒绝确定提交
    refuseSure () {
      let languageSource = this.languageSource;
      let row = this.refuseObj;
      this.$refs.refuseForm.validate(valid => {
        if (valid) {
          this.refuseLoading = true;
          let submitData = {
            "applicationId": row.applicationId,
            "taskEntities": [{ "curActId": row.curActId }],
            "variables": {
              "passFlag": "0",
              "reviewComment": this.refuseForm.refuseReson
            }
          };

          this.$http.postJson(this.config.api.businessRefuse, submitData)
            .then(res => {
              this.refuseLoading = false;
              this.$refs.table.reloadData();
              this.dialogFormVisible = false;
              kindo.util.alert(languageSource.AdjustmentApply.refuseSuccess, languageSource.CommonLang.tips, 'success');
            });
        }
      });
    },
    //清除方法
    clear () {
      this.refuseLoading = false;
      this.$refs.refuseForm.resetFields();
    },
    //拒绝显示状态
    refuseShow (status) {
      //只有状态为1 的时候才能驳回
      if (status === 1) {
        return true;
      } else {
        this.refuseClass = {
          color: 'red'
        };
        return true;
      }
    },
    //查询审核状态下拉框的值
    getActName () {
      let param = { 'json': { "actName": "businessConsultation" }};
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
    },
    //判断字体颜色
    styleObject (status) {
      if (status !== 1) {
        return {
          color: '#909399',
          'font-size': '12px'
        };
      } else {
        return {
          // color: '#409EFF',
          'font-size': '12px'
        };
      }
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
.common-style {
  width: 180px;
}
</style>
