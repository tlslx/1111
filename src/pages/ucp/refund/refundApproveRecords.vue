<template>
  <el-page ref="refundRecords">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="languageSource.CommonLang.view + languageSource.CommonPayLang.refundRecords" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" ref="child" label-position="right" label-width="100px" :disabled="true" inline>
            <el-form-item :label="languageSource.CommonPayLang.refundFlowNo" prop="refundFlowNum">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.refundFlowNum" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.examineState" prop="approveState">
              <el-select v-model="child.approveState" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.companyName" prop="companyName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.companyName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceState" prop="invoiceState">
              <el-select v-model="child.invoiceState" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.invoiceStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.refundAmount" prop="refundAmount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.refundAmount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.refundDate" prop="refundDate">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.refundDate" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.refundMethod" prop="refundMethod">
              <el-select v-model="child.refundMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.refundMethods" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.refundType" prop="refundType">
              <el-select v-model="child.refundType" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.refundTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonLang.collector" prop="creatorName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.creatorId" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item v-if="child.approveState === '3'" :label="languageSource.CommonPayLang.rejectComment" prop="comment">
              <el-input type="textarea" v-model="child.comment" style="width: 300px"></el-input>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonLang.cancel }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.refundRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
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
            <el-button icon="el-icon-search" type="primary" v-if="right('refundApprovalQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('refundApprovalReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonLang.collector" prop="creatorName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.creatorName" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.companyName" prop="companyName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.companyName" class="inputclass" :clearable="true"></el-input>
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
          <kindo-table ref="table" :url="api.get" :queryParam="form" @selection-change="handleSelectionChange" :pageIndex="pageIndex">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="refundFlowNum" :label="languageSource.CommonPayLang.refundFlowNo" width="150" align="center" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0)" target="_blank" @click="onClick(scope.row)">{{scope.row.refundFlowNum}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="approveState" :label="languageSource.CommonPayLang.examineState" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.approveStates,row.approveState)}" width="120" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyName" :label="languageSource.CommonPayLang.companyName" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceState" :label="languageSource.CommonPayLang.invoiceState" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.invoiceStates,row.invoiceState)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" :label="languageSource.CommonPayLang.refundAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundDate" :label="languageSource.CommonPayLang.refundDate" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundMethod" :label="languageSource.CommonPayLang.refundMethod" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.refundMethods,row.refundMethod)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundType" :label="languageSource.CommonPayLang.refundType" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.refundTypes,row.refundType)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="creatorName" :label="languageSource.CommonLang.collector" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('refundApprovalView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.view }}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" v-if="right('refundApprovalBatchAgree')" @click="batchAgree">{{ languageSource.CommonPayLang.batchPass }}</el-button>
              <el-button icon="el-icon-plus" v-if="right('refundApprovalBatchDisagree')" @click="batchDisagree">{{ languageSource.CommonPayLang.batchReject }}</el-button>
            </div>
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
  name: "refundApproval",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "refundApproval",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getRefundListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getRefundSingleById",
        batchRefund: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/batchRefund"
      },
      forms: {
        refundFlowNum: "",
        refundType: "",
        refundMethod: "",
        approveState: "",
        creatorName: "",
        companyName: "",
        refundDate: ""
      },
      // 弹出框
      child: {
        id: "",
        refundFlowNum: "",
        approveState: "",
        companyName: "",
        invoiceState: "",
        orderCount: "",
        orderNum: "",
        refundAmount: "",
        refundDate: "",
        refundMethod: "",
        refundType: "",
        createDate: "",
        creatorId: "",
        creatorName: "",
        taskId: "",
        actId: ""
      },
      formsRules: {},
      source: {
        invoiceStates: [],
        approveStates: [],
        refundTypes: [],
        refundMethods: []
      },
      childVisible: false,
      multipleSelection: [],
      pageIndex: false
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
      ],
      creatorName: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ],
      companyName: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ]
    };

    this.source.invoiceStates = [{ value: "1", label: this.languageSource.CommonPayLang.invoiceMaked }, { value: "0", label: this.languageSource.CommonPayLang.invoiceUnmaked }];
    this.source.approveStates = [{ value: '1', label: this.languageSource.CommonPayLang.approving }, { value: '2', label: this.languageSource.CommonPayLang.approved }, { value: '3', label: this.languageSource.CommonPayLang.rejected }];
    this.source.refundTypes = [{ value: "1", label: this.languageSource.CommonPayLang.onlineRefund }, { value: "2", label: this.languageSource.CommonPayLang.offlineRefund }];
    this.source.refundMethods = [{ value: "1", label: this.languageSource.CommonPayLang.cashRefund }, { value: "2", label: this.languageSource.CommonPayLang.onlineBanking }];
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
    onClick(row) {
      this.$router.push({
        path: "/refundAudit",
        query: row
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    batchAgree() {
      this.commonRequest(true);
    },
    batchDisagree() {
      this.commonRequest(false);
    },
    commonRequest(agree) {
      if (!this.multipleSelection.length) {
        this.$message.error(this.languageSource.CommonPayLang.atLeastSelectOne);
        return;
      }

      let businessKeys = [];
      let taskIds = [];
      let actIds = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let tmp = this.multipleSelection[i];
        businessKeys.push(tmp.id);
        taskIds.push(tmp.taskId);
        actIds.push(tmp.actId);
      }
      let param = {
        id: taskIds.join(","),
        businessKey: businessKeys.join(","),
        actId: actIds.join(","),
        variables: {
          passFlag: agree ? "1" : "0",
          reviewComment: agree ? this.languageSource.CommonPayLang.approvalPass : this.languageSource.CommonPayLang.approvalUnpass
        }
      };
      let _this = this;
      _this
        .$confirm(this.languageSource.CommonPayLang.confirmSubmit, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(() => {
          _this.$http.postJson(_this.api.batchRefund, param).then(res => {
            kindo.util.alert(this.languageSource.CommonPayLang.approvalSubmitSuccess, "success");
            _this.$refs.table.reloadData();
          }).catch(error => {
            this.$message.error(error);
          });
        });
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