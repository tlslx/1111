<template>
  <el-page ref="rechargeRefundRecords">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="languageSource.CommonLang.view + languageSource.CommonPayLang.prepayRefundRecords" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" ref="child" label-position="right" label-width="80px" :disabled="true" inline>
            <el-form-item :label="languageSource.CommonPayLang.billNo" prop="billNo">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.billNo" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.prepayAccount" prop="rechargeAccount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.rechargeAccount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.applyDate" prop="createDate">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.createDate" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.currency" prop="currency">
              <el-select v-model="child.currency" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.currencyOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.refundAmount" prop="refundAmount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.refundAmount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.receiveBankName" prop="receiveBankName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.receiveBankName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.receiveBankAccount" prop="receiveBankAccount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.receiveBankAccount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.examineState" prop="approveState">
              <el-select v-model="child.approveState" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonLang.cancel }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.prepayRefundRecords" icon="fa-search">
        <el-form :model="forms" class="query_form" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.billNo" prop="billNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.billNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.applyDate" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonPayLang.startDate" :end-placeholder="languageSource.CommonPayLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" v-if="right('rechargeRefundApprovalQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('rechargeRefundApprovalReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
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
            <el-table-column prop="billNo" :label="languageSource.CommonPayLang.billNo" width="150" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0)" target="_blank" @click="onClick(scope.row)">{{scope.row.billNo}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="rechargeAccount" :label="languageSource.CommonPayLang.prepayAccount" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="languageSource.CommonPayLang.applyDate" width="100" show-overflow-tooltip header-align="center" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''"></el-table-column>
            <el-table-column prop="currency" :label="languageSource.CommonPayLang.currency" width="80" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.currencyOptions,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" :label="languageSource.CommonPayLang.refundAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="receiveBankName" :label="languageSource.CommonPayLang.receiveBankName" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="receiveBankAccount" :label="languageSource.CommonPayLang.receiveBankAccount" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="approveState" :label="languageSource.CommonPayLang.examineState" width="110" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.approveStates,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('rechargeRefundApprovalView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.view }}</el-button>
              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" v-if="right('rechargeRefundApprovalBatchAgree')" @click="batchAgree">{{ languageSource.CommonPayLang.batchPass }}</el-button>
              <el-button icon="el-icon-plus" v-if="right('rechargeApprovalBatchDisagree')" @click="batchDisagree">{{ languageSource.CommonPayLang.batchReject }}</el-button>
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
  name: "rechargeRefundApproval",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "rechargeRefundApproval",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getRechargeRefundListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/getRechargeRefundSingleById",
        batchRefund: kindo.config.api.unifiedCollectUrl + "/api/refund/refundAudit/batchRefund"
      },
      forms: {
        billNo: "",
        createDate: ""
      },
      // 弹出框
      child: {
        id: "",
        billNo: "",
        rechargeAccount: "",
        createDate: "",
        currency: "",
        refundAmount: "",
        receiveBankName: "",
        receiveBankAccount: "",
        approveState: "",
        taskId: "",
        actId: ""
      },
      formsRules: {},
      source: {
        approveStates: [],
        currencyOptions: []
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
      billNo: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ]
    };

    this.source.approveStates = [{ value: '1', label: this.languageSource.CommonPayLang.approving }, { value: '2', label: this.languageSource.CommonPayLang.approved }, { value: '3', label: this.languageSource.CommonPayLang.rejected }];
    this.source.currencyOptions = [{ value: '1', label: this.languageSource.CommonPayLang.renminbi }];
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
      let data = row;
      data.isRecharge = true;
      this.$router.push({
        path: "refundAudit",
        query: data
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
        prePayFlag: true,
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
</style>