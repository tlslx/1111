<template>
  <el-page ref="collectRecords">
    <template slot="header">

      <el-dialog :title="languageSource.CommonPayLang.viewCollectDetails" top="15px" :visible.sync="visible" width="90%" :close-on-click-modal="false" :close-on-press-escape="false">
        <!--数据区域-->
        <el-page-data>
          <kindo-box>
            <kindo-table ref="child" width="90%" :pagination="false">
              <el-table-column prop="billNo" :label="languageSource.CommonPayLang.bankBillNo" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="collectMethod" :label="languageSource.CommonPayLang.payMethod" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="payBankName" :label="languageSource.CommonPayLang.payBankName" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="payBankAccount" :label="languageSource.CommonPayLang.payBankAccount" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="payState" :label="languageSource.CommonPayLang.payState" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.payStates,row.payState)}" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
              <el-table-column prop="collectAmount" :label="languageSource.CommonPayLang.collectionAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            </kindo-table>
          </kindo-box>
        </el-page-data>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false"><i class="glyphicon glyphicon-remove"></i>{{ languageSource.CommonPayLang.back }}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.collectRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <!-- <el-form-item :label="languageSource.CommonPayLang.orderType" prop="orderType">
            <el-select v-model="forms.orderType" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.orderTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="languageSource.CommonPayLang.collectMethod" prop="collectMethod">
            <el-select v-model="forms.collectMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.collectMethods" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item :label="languageSource.CommonPayLang.payCompanyName" prop="payCompanyName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.payCompanyName" class="inputclass" :clearable="true"></el-input>
          </el-form-item> -->
          <el-form-item :label="languageSource.CommonPayLang.collectionDate" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" :range-separator="languageSource.CommonPayLang.to" :start-placeholder="languageSource.CommonPayLang.startDate" :end-placeholder="languageSource.CommonPayLang.endDate" unlink-panels></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" v-if="right('collectRecordsQuery')" @click="onQuery">{{ languageSource.CommonLang.query }}</el-button>
            <el-button type="info" v-if="right('collectRecordsReset')" @click="onResetQuery">{{ languageSource.CommonLang.reset }}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="collectFlowNo" :label="languageSource.CommonPayLang.collectionFlowNo" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="languageSource.CommonPayLang.collectionDate" width="200" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <!-- <el-table-column prop="orderType" :label="languageSource.CommonPayLang.orderType" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.orderTypes,row.orderType)}" align="center" width="100" show-overflow-tooltip header-align="center"></el-table-column> -->
            <!-- <el-table-column prop="payCompanyName" :label="languageSource.CommonPayLang.payCompanyName" align="center" width="150" show-overflow-tooltip header-align="center"></el-table-column> -->
            <el-table-column prop="collectBankName" :label="languageSource.CommonPayLang.collectBankName" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="collectBankAccount" :label="languageSource.CommonPayLang.collectBankAccount" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="currency" :label="languageSource.CommonPayLang.currency" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.currencyOptions,value)}" align="center" width="80" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="collectAmount" :label="languageSource.CommonPayLang.collectionAmount" :formatter="(row,colums,value)=>{return kindo.ucpUtil.formatMoney(value)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="collectMethod" :label="languageSource.CommonPayLang.collectMethod" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.collectMethods,row.collectMethod)}" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('collectRecordsView')" @click="viewCollectDetail(scope.row)">{{ languageSource.CommonLang.view }}</el-button>
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
  name: "collectRecords",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "collectRecords",
      languageSource: {
        CommonPayLang: {},
        CommonLang: {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/collectRecords/collectRecords/getListPage",
        getById: kindo.config.api.unifiedCollectUrl + "/api/collectRecords/collectRecords/getById"
      },
      forms: {
        orderType: "",
        collectMethod: "",
        createDate: "",
        payCompanyName: ""
      },
      // 弹出框
      child: {
        id: "",
        billNo: "",
        bankBillNo: "",
        collectRecordId: "",
        collectMethod: "",
        payBankName: "",
        payBankAccount: "",
        payState: "",
        collectAmount: "",
        currency: "",
        clearDate: "",
        merchantId: "",
        terminalId: "",
        createDate: ""
      },
      formsRules: {},
      source: {
        orderTypes: [],
        collectMethods: [],
        payStates: [],
        currencyOptions: []
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
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');

    this.formsRules = {
      payCompanyName: [
        { max: 50, message: this.languageSource.CommonLang.max50, trigger: "blur" }
      ]
    };

    this.source.collectMethods = [{ value: '1', label: this.languageSource.CommonPayLang.onlineCollect }, { value: '2', label: this.languageSource.CommonPayLang.offlineCollect }];
    this.source.payStates = [{ value: '1', label: this.languageSource.CommonPayLang.awaitPay }, { value: '2', label: this.languageSource.CommonPayLang.failPay }, { value: '3', label: this.languageSource.CommonPayLang.hasPay }];
    this.source.currencyOptions = [{ value: '1', label: this.languageSource.CommonPayLang.renminbi }];
    this.source.orderTypes = await kindo.dictionary.get('exhibitType');
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
    viewCollectDetail(row) {
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