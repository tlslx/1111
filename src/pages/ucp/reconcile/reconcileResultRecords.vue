<template>
  <el-page ref="reconcileRecords">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.reconcileResultRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="90px" inline @submit.native.prevent @keyup.enter.native="onQuery">

          <el-form-item :label="languageSource.CommonPayLang.bankOrderNo" prop="bankOrderNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.bankOrderNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>

          <el-form-item :label="languageSource.CommonPayLang.transType" prop="transType">
            <el-select v-model="forms.transType" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.transTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="languageSource.CommonPayLang.transState" prop="localTransState">
            <el-select v-model="forms.localTransState" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.transStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-search" type="primary" v-if="right('reconcileRecordsQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('reconcileRecordsReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="languageSource.CommonPayLang.transDate" prop="transDate">
            <el-date-picker v-model="forms.transDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonPayLang.startDate" :end-placeholder="languageSource.CommonPayLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="bankOrderNo" :label="languageSource.CommonPayLang.bankOrderNo" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="transType" :label="languageSource.CommonPayLang.transType" width="150" align="center" show-overflow-tooltip header-align="center" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.transTypes,value)}"></el-table-column>
            <el-table-column prop="transDate" :label="languageSource.CommonPayLang.transDate" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="localTransAmount" :label="languageSource.CommonPayLang.localTransAmount" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankTransAmount" :label="languageSource.CommonPayLang.bankTransAmount" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="localTransState" :label="languageSource.CommonPayLang.localTransState" width="150" align="center" show-overflow-tooltip header-align="center" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.transStates,value)}"></el-table-column>
            <el-table-column prop="bankTransState" :label="languageSource.CommonPayLang.bankTransState" width="150" align="center" show-overflow-tooltip header-align="center" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.transStates,value)}"></el-table-column>
            <el-table-column prop="diffAmount" :label="languageSource.CommonPayLang.diffAmount" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="diffComment" :label="languageSource.CommonPayLang.diffComment" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="isBalanced" :label="languageSource.CommonPayLang.isBalanced" width="150" align="center" show-overflow-tooltip header-align="center" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.isBalanced,value)}"></el-table-column>
            <el-table-column prop="isPrepay" :label="languageSource.CommonPayLang.isPrepay" width="150" align="center" show-overflow-tooltip header-align="center" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.isPrepay,value)}"></el-table-column>
            <el-table-column prop="merchantNo" :label="languageSource.CommonPayLang.merchantId" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyName" :label="languageSource.CommonPayLang.companyName" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="importBankName" :label="languageSource.CommonPayLang.importBank" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="importBankAccount" :label="languageSource.CommonPayLang.importAccount" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="exportBankName" :label="languageSource.CommonPayLang.exportBank" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="exportBankAccount" :label="languageSource.CommonPayLang.exportAccount" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
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
  name: "reconcileRecords",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "reconcileRecords",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/reconcileRecords/getListPage"
      },
      forms: {
        bankOrderNo: "",
        transType: "",
        localTransState: "",
        transDate: ""
      },
      formsRules: {},
      // 弹出框
      child: {
        id: "",
        bankOrderNo: "",
        transType: "",
        transDate: "",
        localTransAmount: "",
        bankTransAmount: "",
        localTransState: "",
        bankTransState: "",
        diffAmount: "",
        diffComment: "",
        isBalanced: "",
        isPrepay: "",
        merchantNo: "",
        companyName: "",
        importBankName: "",
        importBankAccount: "",
        exportBankName: "",
        exportBankAccount: "",
        creatorId: "",
        creatorName: "",
        createDate: "",
        modifierId: "",
        modifierName: "",
        modifyDate: ""
      },
      source: {
        transTypes: [],
        transStates: [],
        isBalanced: [],
        isPrepay: []
      },
      visible: false
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
      bankOrderNo: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ]
    };

    this.source.transTypes = [{ value: '1', label: this.languageSource.CommonPayLang.payment }, { value: '2', label: this.languageSource.CommonPayLang.refund }];
    this.source.isBalanced = [{ value: '0', label: this.languageSource.CommonPayLang.unbalanced }, { value: '1', label: this.languageSource.CommonPayLang.balanced }];
    this.source.isPrepay = [{ value: '0', label: this.languageSource.CommonPayLang.normalOrder }, { value: '1', label: this.languageSource.CommonPayLang.prepayOrder }];
    this.source.transStates = [{ value: '1', label: this.languageSource.CommonPayLang.awaitPay }, { value: '2', label: this.languageSource.CommonPayLang.failPay }, { value: '3', label: this.languageSource.CommonPayLang.hasPay }, { value: '4', label: this.languageSource.CommonPayLang.awaitRefund }, { value: '5', label: this.languageSource.CommonPayLang.refundFail }, { value: '6', label: this.languageSource.CommonPayLang.refunded }];
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