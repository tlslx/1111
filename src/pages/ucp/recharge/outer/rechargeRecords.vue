<template>
  <el-page ref="rechargeRecords">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="languageSource.CommonLang.view + languageSource.CommonPayLang.prepayChargeRecords" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" ref="child" label-position="right" label-width="80px" :disabled="true" inline>
            <el-form-item :label="languageSource.CommonPayLang.billNo" prop="billNo">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.billNo" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.chargeMethod" prop="rechargeMethod">
              <el-select v-model="child.rechargeMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.rechargeMethods" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.chargeDate" prop="createDate">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.createDate" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.currency" prop="currency">
              <el-select v-model="child.currency" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.currencyOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.chargeAmount" prop="rechargeAmount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.rechargeAmount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.payBankName" prop="payBankName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.payBankName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.payBankAccount" prop="payBankAccount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.payBankAccount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.state" prop="state">
              <el-select v-model="child.state" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
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

      <el-dialog :title="languageSource.CommonLang.view + languageSource.CommonPayLang.bankReceipt" :close-on-click-modal="false" top="15px" :visible.sync="bankReceiptVisible" width="90%">
        <kindo-box>
          <el-form :model="bankReceipt" ref="bankReceipt" label-position="right" label-width="80px" :disabled="true" inline>
            <el-form-item :label="languageSource.CommonPayLang.billNo" prop="orderId">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.orderId" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.orderDate" prop="orderTime">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.orderTime" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.payDate" prop="payedTime">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.payedTime" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.orderAmount" prop="amount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.amount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.fee" prop="fee">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.fee" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.orderState" prop="status">
              <el-select v-model="bankReceipt.status" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.orderStates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.bankAccountType" prop="accountType">
              <el-select v-model="bankReceipt.accountType" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.accountTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.bankNote" prop="payBankNo">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.payBankNo" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.payComment" prop="comment">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.comment" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.refundableAmount" prop="refundAmount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="bankReceipt.refundAmount" class="inputclass"></el-input>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="bankReceiptVisible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonLang.cancel }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.prepayChargeRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.billNo" prop="billNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.billNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.chargeMethod" prop="rechargeMethod">
            <el-select v-model="forms.rechargeMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.rechargeMethods" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" v-if="right('outerRechargeRecordsQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('outerRechargeRecordsReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.chargeDate" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonPayLang.startDate" :end-placeholder="languageSource.CommonPayLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>

    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="billNo" :label="languageSource.CommonPayLang.billNo" width="150" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <a v-if="scope.row.state === '1' && right('outerRechargeRecordsRepay')" href="javascript:void(0)" target="_blank" @click="onClick(scope.row)">{{scope.row.billNo}}</a>
                <span v-else>{{scope.row.billNo}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rechargeMethod" :label="languageSource.CommonPayLang.chargeMethod" width="100" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.rechargeMethods,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="languageSource.CommonPayLang.chargeDate" width="100" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="currency" :label="languageSource.CommonPayLang.currency" width="80" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.currencyOptions,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="rechargeAmount" :label="languageSource.CommonPayLang.chargeAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="payBankName" :label="languageSource.CommonPayLang.payBankName" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="payBankAccount" :label="languageSource.CommonPayLang.payBankAccount" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="state" :label="languageSource.CommonPayLang.payState" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.approveStates,value)}" width="110" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('outerRechargeRecordsView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{ languageSource.CommonLang.view }}</el-button>
                <el-button type="text" v-if="right('outerRechargeRecordsViewReceipt')" @click="viewList(scope.row,'billNo', 'bankReceipt', api.getBankReceiptByBillNo)">{{ languageSource.CommonPayLang.bankReceipt }}</el-button>
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
import request from "@/scripts/framework/http";
export default {
  name: "outerRechargeRecords",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "outerRechargeRecords",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        submitUrl: kindo.config.api.unifiedCollectUrl + "/api/recharge/rechargeRecords/submitAdvanceChargeInfo",
        get: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/rechargeRecords/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/rechargeRecords/getSingleById",
        getBankReceiptByBillNo: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/rechargeRecords/getBankReceiptByBillNo"
      },
      forms: {
        billNo: "",
        rechargeMethod: "",
        createDate: ""
      },
      // 弹出框
      child: {
        id: "",
        billNo: "",
        rechargeAccountNum: "",
        companyName: "",
        rechargeMethod: "",
        createDate: "",
        currency: "",
        rechargeAmount: "",
        payBankName: "",
        payBankAccount: "",
        state: ""
      },
      bankReceipt: {
        orderId: "",
        orderTime: "",
        payedTime: "",
        amount: "",
        fee: "",
        status: "",
        accountType: "",
        payBankNo: "",
        comment: "",
        clearDate: "",
        refundAmount: ""
      },
      formsRules: {},
      source: {
        rechargeMethods: [],
        currencyOptions: [],
        approveStates: [],
        orderStates: [],
        accountTypes: []
      },
      childVisible: false,
      bankReceiptVisible: false
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

    this.source.rechargeMethods = [{ value: '1', label: this.languageSource.CommonPayLang.onlinePay }, { value: '2', label: this.languageSource.CommonPayLang.offlinePay }];
    this.source.currencyOptions = [{ value: '1', label: this.languageSource.CommonPayLang.renminbi }];
    this.source.approveStates = [{ value: '1', label: this.languageSource.CommonPayLang.awaitPay }, { value: '2', label: this.languageSource.CommonPayLang.failPay }, { value: '3', label: this.languageSource.CommonPayLang.hasPay }];
    this.source.orderStates = [{ value: '10', label: this.languageSource.CommonPayLang.orderFail }, { value: '20', label: this.languageSource.CommonPayLang.orderSuccess }];
    this.source.accountTypes = [{ value: '11', label: this.languageSource.CommonPayLang.personalAccount }, { value: '12', label: this.languageSource.CommonPayLang.firmAccount }];
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
      this
        .$confirm(this.languageSource.CommonPayLang.confirmCharge, this.languageSource.CommonLang.tips, { type: "warning" })
        .then(() => {
          this.loading = true;
          let _this = this;
          request
            .postJson(this.api.submitUrl, row)
            .then(data => {
              // 获取订单信息成功后，跳转到支付页面
              this.$router.push({
                path: data.retUrl,
                query: data
              });
            })
            .catch(error => {
              _this.$message.error(error);
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