<template>
  <el-page class="seat">
    <template slot="body">
      <el-header>
        <headline :label="languageSource.AdjustmentApply.businessReview"></headline>
      </el-header>
      <kindo-box>
        <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="85px"
          @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item prop="positionNature" :label="languageSource.LocationLang.exhibitionProperty">
            <el-select v-model="searchForm.positionNature" clearable placeholder="请选择展位性质">
              <el-option
                v-for="nature in natures"
                :key="nature.value"
                :label="nature.label"
                :value="nature.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionType">
            <el-select v-model="searchForm.exhibitionType" clearable placeholder="请选择布展类型">
              <el-option
                v-for="nature in exhibitionType"
                :key="nature.value"
                :label="nature.label"
                :value="nature.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea">
            <el-select v-model="searchForm.exhibitionArea" clearable placeholder="请选择展区">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName">
            <el-input v-model="searchForm.enterpriseName" clearable placeholder="请输入企业名称"></el-input>
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
          <el-form-item class="f-b-m">
            <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
            <el-button type="primary" v-if='showCheck' :disabled="arrangeState" @click="sendArrange">{{languageSource.AdjustmentApply.postionArrange}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>

      <kindo-box>
        <kindo-table
          ref="table"
          :url="config.api.businessGetList"
          :queryParam="form"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="46" header-align="center" align="center"></el-table-column>
          <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaName" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="positionNature" :label="languageSource.LocationLang.exhibitionProperty" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="exhibitionType" :label="languageSource.AdjustmentApply.exhibitionType" min-width="200" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentNumber" :label="languageSource.AdjustmentApply.adjustmentNumber" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentContent" :label="languageSource.AdjustmentApply.adjustmentContent" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="adjustmentReason" :label="languageSource.AdjustmentApply.adjuestReson" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column prop="fileId" :label="languageSource.AdjustmentApply.annex" min-width="160" header-align="center" align="center">
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
                  <label class="download-style" @click="downloadFunc(item.fileId)">{{item.fileName}}</label>
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
          <el-table-column prop="description" :label="languageSource.AdjustmentApply.subtype" min-width="160" header-align="center" align="center"></el-table-column>
          <el-table-column fixed="right" :label="languageSource.CommonLang.operation" min-width="130" header-align="center" align="center">
            <template slot-scope="scope" >
              <router-link :to="{ path: '/stallplan/businessCheck?primarycolor=2b579a', query: { scopeRow: scope.row , tag: 'businessAssociation' }}"><el-button type="text" size="mini">{{languageSource.CommonLang.view}}</el-button></router-link>
              <el-button type="text" @click="refuseFunc(scope.row)" :style="styleObject(scope.row.status)">{{languageSource.AdjustmentApply.refuse}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

      <el-dialog
        :title="languageSource.AdjustmentApply.refuseReson"
        :visible.sync="dialogFormVisible"
        @close="clear"
        width="60%">
        <el-form ref="refuseForm" :model="refuseForm" :rules="refuseRule" style="margin-bottom: 20px;">
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
import config from '../components';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "BusinessAssociation",
  mixins: [listPageBase],
  components: {
    'headline': () => import('../../components/headline.vue')
  },
  data() {
    return {
      //接口地址
      config,
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
      //多选保存的值
      'multipleSelection': [],
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
      refuseRule: {
        refuseReson: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]
      },
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
    },
    //安排位置按钮显示判断
    showCheck () {
      let roles = this.$store.getters.userInfo.roleIds;
      if (roles.indexOf("a811a1b92f704c1c8b47a699af1ad54e") >= 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  async created () {
    this._forms = Object.assign({}, this.searchForm);
    //读取数据字典
    this.natures = await kindo.dictionary.get('exhibitionPositionType'); //展位类型
    this.regionOfExhibition = await kindo.dictionary.get('areaOfExhibits'); //展区
    this.exhibitionType = await kindo.dictionary.get('typeOfExhibitsArrangement'); //布展类型
    //读取国际化
    this.languageSource.LocationLang = await kindo.util.getLanguage('LocationLang');
    this.languageSource.CommonLang = await kindo.util.getLanguage('CommonLang');
    this.languageSource.RuleSettingLang = await kindo.util.getLanguage('RuleSettingLang');
    this.languageSource.AdjustmentApply = await kindo.util.getLanguage('AdjustmentApply');
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
      this.multipleSelection = val;
      let valLength = val.length;
      for (let i = 0; i < valLength; i++) {
        //只有状态为1的时候可以生成方案
        let pass = val.filter(v => v.status === 1);
        if (pass.length !== valLength) {
          this.arrangeState = true;
          this.$message.error('申请已绑定方案，不可以再次生成方案');
          return false;
        }
        let exhibitionAreaResult = val.filter(v => v.exhibitionArea === val[i].exhibitionArea);
        let positionNatureResult = val.filter(v => v.positionNature === val[i].positionNature);
        let exhibitionTypeResult = val.filter(v => v.exhibitionType === val[i].exhibitionType);
        if (exhibitionAreaResult.length !== valLength) {
          this.$message.error('展区名称不一致，请重新选择');
          this.arrangeState = true;
          return false;
        }
        if (positionNatureResult.length !== valLength) {
          this.$message.error('展位性质不一致，请重新选择');
          this.arrangeState = true;
          return false;
        }
        if (exhibitionTypeResult.length !== valLength) {
          this.$message.error('布展类型不一致，请重新选择');
          this.arrangeState = true;
          return false;
        }
      }
      this.arrangeState = valLength <= 0;
    },
    //拒绝点击
    refuseFunc (row) {
      if (row.status !== 1) {
        this.$message.error('申请已绑定方案，不可以拒绝');
        return false;
      }
      this.dialogFormVisible = true;
      this.refuseObj = row;
    },
    //拒绝确定提交
    refuseSure () {
      let row = this.refuseObj;
      this.$refs.refuseForm.validate(valid => {
        if (valid) {
          this.refuseLoading = true;
          let submitData = {
            "applicationId": row.applicationId,
            "oldSchemeId": row.oldSchemeId,
            "oldSchemeDetailId": row.oldSchemeDetailId,
            "enterpriseName": row.enterpriseName,
            "exhibitionArea": row.exhibitionArea,
            "exhibitionType": row.exhibitionType,
            "adjustmentReason": row.adjustmentReason,
            "adjustmentContent": row.adjustmentContent,
            "adjustmentNumber": row.adjustmentNumber,
            "boothCode": row.boothCode,
            "workFlowParam": {
              "businessKey": row.applicationId,
              "id": row.taskId,
              "variables": {
                "passFlag": "0", // 驳回申请默认为0,
                "reviewComment": this.refuseForm.refuseReson // 审核意见。
              }
            }
          };
          this.$http.postJson(this.config.api.businessRefuse, submitData)
            .then(res => {
              this.refuseLoading = false;
              this.$refs.table.reloadData();
              this.dialogFormVisible = false;
            });
        }
      });
    },
    //清除方法
    clear () {
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
    //生成位置安排方案
    sendArrange () {
      if (this.arrangeState) {
        return false;
      }
      this.arrangeState = true;
      this.$http.postJson(this.config.api.businessSendApply, this.multipleSelection)
        .then(res => {
          this.arrangeState = false;
          this.$message.success('安排成功');
          this.multipleSelection = [];
          this.$refs.table.reloadData();
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
          color: '#409EFF',
          'font-size': '12px'
        };
      }
    },
    downloadFunc (id) {
      window.open(this.config.api.dowloadURL + '?fileIds=' + id);
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
.f-b-m {
  margin-left: 19px;
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
