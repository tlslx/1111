<template>
  <el-page ref="refundRecords">
    <template slot="header">
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <span>{{ languageSource.CommonPayLang.rejectComment + ": " + refuseContent}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">{{ languageSource.CommonLang.confirm }}</el-button>
        </span>
      </el-dialog>

      <!--页面对话框-->
      <el-dialog :title="languageSource.CommonLang.view + languageSource.CommonPayLang.refundDetail" :close-on-click-modal="false" top="15px" :visible.sync="visible" width="90%">
        <!--数据区域-->
        <el-page-data>
          <kindo-box>
            <kindo-table ref="child" width="90%" :pagination="false">
              <el-table-column prop="payBillNo" :label="languageSource.CommonPayLang.refundOrderNo" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="refundBillNo" :label="languageSource.CommonPayLang.refundFlowNo" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="refundMethod" :label="languageSource.CommonPayLang.refundMethod" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="refundState" :label="languageSource.CommonPayLang.refundState" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.transStates,row.refundState)}" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="refundAmount" :label="languageSource.CommonPayLang.refundAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="merchantId" :label="languageSource.CommonPayLang.merchantId" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="createDate" :label="languageSource.CommonPayLang.refundDate" align="center" width="220" show-overflow-tooltip header-align="center"></el-table-column>
            </kindo-table>
          </kindo-box>
        </el-page-data>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonPayLang.back }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.refundRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.refundFlowNo" prop="refundFlowNum">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.refundFlowNum" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundType" prop="refundType">
            <el-select v-model="forms.refundType" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.refundTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundMethod" prop="refundMethod">
            <el-select v-model="forms.refundMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.refundMethods" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" v-if="right('outerRefundRecordsQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('outerRefundRecordsReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.examineState" prop="approveState">
            <el-select v-model="forms.approveState" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.refundDate" prop="refundDate">
            <el-date-picker v-model="forms.refundDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonPayLang.startDate" :end-placeholder="languageSource.CommonPayLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form" @row-click="handleRowClick">
            <el-table-column prop="refundFlowNum" :label="languageSource.CommonPayLang.refundFlowNo" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="approveState" :label="languageSource.CommonPayLang.examineState" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.approveStates,row.approveState)}" width="120" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyName" :label="languageSource.CommonPayLang.companyName" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceState" :label="languageSource.CommonPayLang.invoiceState" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.invoiceStates,row.invoiceState)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" :label="languageSource.CommonPayLang.refundAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundDate" :label="languageSource.CommonPayLang.refundDate" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundMethod" :label="languageSource.CommonPayLang.refundMethod" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.refundMethods,row.refundMethod)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundType" :label="languageSource.CommonPayLang.refundType" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.refundTypes,row.refundType)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('outerRefundRecordsView')" @click="viewRefundDetail(scope.row)">{{ languageSource.CommonLang.view }}</el-button>
                <el-button v-if="scope.row.approveState === '3' && right('outerRefundRecordsResubmit')" type="text" @click="submit(scope.row)">{{ languageSource.CommonLang.resubmit }}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "outerRefundRecordsManage",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "outerRefundRecordsManage",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/openapi/refundRecords/getListPage",
        auditOpUrl: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/batchRefund",
        getById: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getRefundById",
        getAuditRefuseLog: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getAuditRefuseLog"
      },
      forms: {
        refundFlowNum: "",
        refundType: "",
        refundMethod: "",
        approveState: "",
        refundDate: ""
      },
      formsRules: {},
      // 弹出框
      child: {
        id: "",
        payBillNo: "",
        refundBillNo: "",
        refundRecordId: "",
        refundMethod: "",
        refundState: "",
        refundAmount: "",
        merchantId: "",
        createDate: "",
        creatorId: "",
        creatorName: ""
      },
      source: {
        invoiceStates: [],
        approveStates: [],
        refundTypes: [],
        refundMethods: [],
        transStates: []
      },
      visible: false,
      dialogVisible: false,
      refuseContent: ""
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
    this._child = Object.assign({}, this.child);

    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    this.formsRules = {
      refundFlowNum: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ]
    };

    this.source.invoiceStates = [{ value: "1", label: this.languageSource.CommonPayLang.invoiceMaked }, { value: "0", label: this.languageSource.CommonPayLang.invoiceUnmaked }];
    this.source.approveStates = [{ value: '1', label: this.languageSource.CommonPayLang.approving }, { value: '2', label: this.languageSource.CommonPayLang.approved }, { value: '3', label: this.languageSource.CommonPayLang.rejected }];
    this.source.refundTypes = [{ value: "1", label: this.languageSource.CommonPayLang.onlineRefund }, { value: "2", label: this.languageSource.CommonPayLang.offlineRefund }];
    this.source.refundMethods = [{ value: "1", label: this.languageSource.CommonPayLang.cashRefund }, { value: "2", label: this.languageSource.CommonPayLang.onlineBanking }];
    this.source.transStates = [{ value: '4', label: this.languageSource.CommonPayLang.awaitRefund }, { value: '5', label: this.languageSource.CommonPayLang.refundFail }, { value: '6', label: this.languageSource.CommonPayLang.refunded }];
  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$refs.table.loadData();
        }
      });
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    viewRefundDetail(row) {
      this.visible = true;
      this.$nextTick(function () {
        this.getList(this.api.getById, { id: row.id });
      });
    },
    getList(url, id) {
      this.$store.commit('pageLoading', true);
      this.$refs.child.internalData = [];
      this.$http.get(url, id).then(res => {
        this.$refs.child.internalData = res;
        this.$store.commit('pageLoading', false);
      }).catch(error => {
        this.$store.commit('pageLoading', false);
        this.$message({
          type: 'warning',
          message: error
        });
      });
    },
    submit(row) {
      let _this = this;
      let param = { id: row.taskId, actId: 'refundApplyRefuse', businessKey: row.id };
      kindo.util.confirm(this.languageSource.CommonPayLang.confirmResubmit, undefined, undefined, () => {
        _this.$http.postJson(_this.api.auditOpUrl, param).then((res) => {
          kindo.util.alert(this.languageSource.CommonPayLang.submitSuccess, this.languageSource.CommonLang.tips, 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    handleRowClick(row, event, column) {
      if (row.approveState === "3" && column.property) {
        this.$http.get(this.api.getAuditRefuseLog, { id: row.id }).then(res => {
          this.refuseContent = res.comment;
          this.dialogVisible = true;
        }).catch(error => {
          this.$message({
            type: 'warning',
            message: error
          });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.shortclass {
  width: 140px !important;
  margin-right: 5px;
}
.inputclass {
  width: 160px !important;
}
.button_class {
  display: inline-block;
  margin-left: 20px;
}
</style>