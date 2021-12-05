<template>
  <el-page ref="TaxInvoiceRecords">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="languageSource.CommonPayLang.invoiceView" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" ref="child" label-position="right" label-width="100px" :disabled="true" inline>
            <el-form-item :label="languageSource.CommonPayLang.orderNo" prop="orderNum">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.orderNum" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceNo" prop="invoiceNo">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.invoiceNo" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceDate" prop="createDate">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.createDate" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceAmount" prop="invoiceAmount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.invoiceAmount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.buyerNo" prop="buyerTaxNum">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.buyerTaxNum" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.buyerCompany" prop="buyerCompanyName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.buyerCompanyName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.buyerCompanyPhone" prop="buyerCompanyTel">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.buyerCompanyTel" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.buyerBankNo" prop="buyerBankAccount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.buyerBankAccount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.customNo" prop="buyerMobilephone">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.buyerMobilephone" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.email" prop="buyerEmail">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.buyerEmail" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceSendType" prop="invoiceSendMode">
              <el-select v-model="child.invoiceSendMode" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.invoiceReceiveMethods" :key="Number(item.value)" :label="item.label" :value="Number(item.value)">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceCompany" prop="companyName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.companyName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.eleInvoiceAddr" prop="invoiceUrl">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.invoiceUrl" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.orderType" prop="orderType">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.orderType" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceType" prop="invoiceType">
              <el-select v-model="child.invoiceType" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.invoiceTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.orderNum" prop="orderCount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.orderCount" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.taxRate" prop="taxRate">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.taxRate" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.tax" prop="taxAmount">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.taxAmount" class="inputclass"></el-input>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{languageSource.CommonLang.cancel}}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.invoiceManage" icon="fa-search">
        <el-form :model="forms" class="query_form" :rules="formsRules" ref="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.invoiceNo" prop="invoiceNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.invoiceNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.invoiceType" prop="invoiceType">
            <el-select v-model="forms.invoiceType" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
              <el-option v-for="item in source.invoiceTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.invoiceCompany" prop="companyName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.companyName" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.orderNo" prop="orderNum">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.orderNum" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.invoiceDate" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonLang.startDate" :end-placeholder="languageSource.CommonLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <kindo-box>
        <el-page-data>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="orderNum" :label="languageSource.CommonPayLang.orderNo" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceNo" :label="languageSource.CommonPayLang.invoiceNo" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="languageSource.CommonPayLang.invoiceDate" width="120" show-overflow-tooltip header-align="center" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''"></el-table-column>
            <el-table-column prop="invoiceAmount" :label="languageSource.CommonPayLang.invoiceAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="buyerTaxNum" :label="languageSource.CommonPayLang.buyerNo" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="buyerCompanyName" :label="languageSource.CommonPayLang.buyerCompany" width="130" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="buyerCompanyTel" :label="languageSource.CommonPayLang.buyerCompanyPhone" width="130" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="buyerBankAccount" :label="languageSource.CommonPayLang.buyerBankNo" width="160" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="buyerMobilephone" :label="languageSource.CommonPayLang.customNo" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="buyerEmail" :label="languageSource.CommonPayLang.email" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceSendMode" :label="languageSource.CommonPayLang.invoiceSendType" width="130" :formatter="formatInvoiceReceiveMode" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyName" :label="languageSource.CommonPayLang.invoiceCompany" width="130" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceUrl" :label="languageSource.CommonPayLang.eleInvoiceAddr" width="130" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <a href="javascript:void(0)" target="_blank" @click="onClick(scope.row)">查看</a>
              </template>
            </el-table-column>
            <el-table-column prop="orderType" :label="languageSource.CommonPayLang.orderType" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceType" :label="languageSource.CommonPayLang.invoiceType" width="120" :formatter="formatInvoiceType" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="taxRate" :label="languageSource.CommonPayLang.taxRate" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="taxAmount" :label="languageSource.CommonPayLang.tax" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180  " align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('elecInvoiceView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{languageSource.CommonLang.view}}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </el-page-data>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "TaxInvoiceRecords",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "elecInvoiceManage",
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/invoice/invoiceRecords/getListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/invoice/invoiceRecords/getSingleById",
        getInvoiceUrl: kindo.config.api.unifiedCollectUrl + "/api/invoice/invoiceRecords/getInvoiceUrl"
      },
      forms: {
        invoiceNo: "",
        invoiceType: "",
        companyName: "",
        orderNum: "",
        createDate: ""
      },
      // 弹出框
      child: {
        id: "",
        orderNum: "",
        invoiceNo: "",
        createDate: "",
        invoiceAmount: "",
        buyerTaxNum: "",
        buyerCompanyName: "",
        buyerCompanyTel: "",
        buyerBankAccount: "",
        buyerMobilephone: "",
        buyerEmail: "",
        invoiceSendMode: "",
        companyName: "",
        invoiceUrl: "",
        orderType: "",
        invoiceType: "",
        orderCount: "",
        taxRate: "",
        taxAmount: ""
      },
      formsRules: {
      },
      source: {
        invoiceReceiveMethods: [],
        invoiceTypes: []
      },
      childVisible: false
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
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    this._forms = Object.assign({}, this.forms);
    this._child = Object.assign({}, this.child);
    this.formsRules = {
      invoiceNo: [
        { max: 50, message: this.languageSource.CommonPayLang.max50, trigger: "blur" }
      ],
      orderNum: [
        { max: 50, message: this.languageSource.CommonPayLang.max50, trigger: "blur" }
      ],
      companyName: [
        { max: 50, message: this.languageSource.CommonPayLang.max50, trigger: "blur" }
      ]
    };
    // 读取数据字典
    this.source.invoiceReceiveMethods = await kindo.dictionary.get('invoiceReceivingMode');
    this.source.invoiceTypes = await kindo.dictionary.get('invoiceType');

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
      if (row.invoiceUrl.length) {
        window.open(row.invoiceUrl, "_blank");
      } else {
        this.$store.commit('pageLoading', true);
        this.$http.get(this.api.getInvoiceUrl, { id: row.id }).then(res => {
          this.$store.commit('pageLoading', false);
          if (res.invoiceUrl.length) {
            row.invoiceUrl = res.invoiceUrl;
            window.open(row.invoiceUrl, "_blank");
          } else {
            this.$message.error(this.languageSource.CommonPayLang.addressExpire);
          }
        }).catch(error => {
          this.$store.commit('pageLoading', false);
          this.$message.error(this.languageSource.CommonPayLang.linkInvalid);
        });
      }
    },
    formatInvoiceReceiveMode: function (row, column) {
      let mode = row[column.property];
      for (let i = 0; i < this.source.invoiceReceiveMethods.length; i++) {
        let tmp = this.source.invoiceReceiveMethods[i];
        if (Number(tmp.value) === mode) {
          return tmp.label;
        }
      }
    },
    formatInvoiceType: function (row, column) {
      let invoiceType = row[column.property];
      for (let i = 0; i < this.source.invoiceTypes.length; i++) {
        let tmp = this.source.invoiceTypes[i];
        if (tmp.value === invoiceType) {
          return tmp.label;
        }
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
  width: 200px !important;
}
.query_form .el-form-item {
  margin-bottom: 20px;
}
</style>
