<template>
  <el-page ref="unitRechargeAccounts">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog :title="languageSource.CommonPayLang.rechargeAccountView" :close-on-click-modal="false" top="15px" :visible.sync="childVisible" width="90%">
        <kindo-box>
          <el-form :model="child" ref="child" label-position="right" label-width="100px" :disabled="(child.action==='view'?true:false)" inline>
            <el-form-item :label="languageSource.CommonPayLang.rechargeAccountNum" prop="rechargeAccountNum">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.rechargeAccountNum" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.accountType" prop="accountType">
              <el-select v-model="child.accountType" :clearable="true" :placeholder="languageSource.CommonLang.select" class="inputclass">
                <el-option v-for="item in source.accountTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceReceiveMethod" prop="invoiceReceiveMethod">
              <el-select v-model="child.invoiceReceiveMethod" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.invoiceReceiveMethods" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.companyName" prop="companyName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.companyName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.invoiceTitle" prop="invoiceTitle">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.invoiceTitle" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.creditLetterCode" prop="creditLetterCode">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.creditLetterCode" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.taxNumber" prop="taxNumber">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.taxNumber" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.channelNumber" prop="channelNumber">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.channelNumber" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.bankName" prop="bankName">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.bankName" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.bankAccountNum" prop="bankAccountNum">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.bankAccountNum" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.companyTel" prop="companyTel">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.companyTel" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.companyAddr" prop="companyAdd">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.companyAdd" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.accountEmail" prop="email">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.email" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.mobilePhoneNum" prop="mobilePhoneNum">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.mobilePhoneNum" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.accountBalance" prop="accountBalance">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.accountBalance" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.activeDate" prop="createDate">
              <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="child.createDate" class="inputclass"></el-input>
            </el-form-item>
            <el-form-item :label="languageSource.CommonPayLang.activeState" prop="activeState">
              <el-select v-model="child.activeState" :placeholder="languageSource.CommonLang.select" class="inputclass" :editable="false">
                <el-option v-for="item in source.states" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </kindo-box>
        <div slot="footer" class="dialog-footer">
          <el-button @click="childVisible = false"><i class="glyphicon glyphicon-remove"></i>{{languageSource.CommonLang.cancel}}</el-button>
        </div>
      </el-dialog>

      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.rechargeAccountManage" icon="fa-search">
        <el-form :model="forms" class="query_form" :rules="formsRules" ref="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <!--<el-form-item label="公司名称" prop="companyName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.companyName" class="inputclass" :clearable="true"></el-input>
          </el-form-item>-->
          <el-form-item :label="languageSource.CommonPayLang.creditLetterCode" prop="creditLetterCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.creditLetterCode" class="inputclass" :clearable="true"></el-input>
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
            <!--<el-table-column prop="companyName" label="公司名称" width="180" show-overflow-tooltip header-align="center"></el-table-column>-->
            <el-table-column prop="rechargeAccountNum" :label="languageSource.CommonPayLang.rechargeAccountNum" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="accountType" :label="languageSource.CommonPayLang.accountType" width="120" :formatter="formatAccountType" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="creditLetterCode" :label="languageSource.CommonPayLang.creditLetterCode" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankName" :label="languageSource.CommonPayLang.bankName" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="bankAccountNum" :label="languageSource.CommonPayLang.bankAccountNum" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyTel" :label="languageSource.CommonPayLang.companyTel" width="140" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="mobilePhoneNum" :label="languageSource.CommonPayLang.mobilePhoneNum" width="140" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="email" :label="languageSource.CommonPayLang.accountEmail" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyAdd" :label="languageSource.CommonPayLang.companyAddr" width="180" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="invoiceReceiveMethod" :label="languageSource.CommonPayLang.invoiceReceiveMethod" width="120" show-overflow-tooltip header-align="center" :formatter="formatInvoiceReceiveMode"></el-table-column>
            <el-table-column prop="accountBalance" :label="languageSource.CommonPayLang.accountBalance" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="activeState" :label="languageSource.CommonPayLang.activeState" width="100" show-overflow-tooltip header-align="center">
              <!--<el-table-column prop="accountType" label="账号类型" width="120" show-overflow-tooltip header-align="center" :formatter="formatInvoiceReceiveMode"></el-table-column>-->

              <template slot-scope="scope">
                <el-tag :type="scope.row.activeState | statusFilter">{{scope.row.activeState | formatStatus}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createDate" :label="languageSource.CommonLang.creatorDate" width="100" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column :label="languageSource.CommonLang.operation" width="180" align="center" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" v-if="right('accountView')" @click="viewList(scope.row,'id', 'child', api.getbyid)">{{languageSource.CommonLang.view}}</el-button>
                <el-button type="text" v-if="right('accountEdit')" @click="editAccount(scope.row.id)">{{languageSource.CommonLang.edit}}</el-button>

              </template>
            </el-table-column>
            <div slot="control">
              <el-button icon="el-icon-plus" type="primary" v-if="right('accountExport')" @click="onExp">{{languageSource.CommonLang.export}}</el-button>
            </div>
          </kindo-table>
        </el-page-data>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "unitRechargeAccounts",
  mixins: [tableMixIn, listPageBase],
  filters: {
    statusFilter(status) {
      const statusMap = { "1": "success", "-1": "warning" };
      return statusMap[status];
    },
    // 状态显示转换
    formatStatus(status) {
      // "1": "已激活", "-1": "未激活"
      const statusMap = { "1": "已激活", "-1": "未激活" };
      return statusMap[status];
    }
  },
  data() {
    return {
      pageId: "unitrecharge_accounts_manage",
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getUnitListPage",
        // get: "http://localhost:8051/UnifiedCollectionMS" + "/api/recharge/account/getUnitListPage",
        getbyid: kindo.config.api.unifiedCollectUrl + "/api/recharge/account/getSingleById"
        // getbyid: "http://localhost:8051/UnifiedCollectionMS" + "/api/recharge/account/getSingleById"
      },
      forms: {
        // companyName: "",
        creditLetterCode: ""
      },
      // 弹出框
      child: {
        id: "",
        // companyName: "",
        rechargeAccountNum: "",
        accountType: "",
        creditLetterCode: "",
        bankName: "",
        bankAccountNum: "",
        companyTel: "",
        companyAdd: "",
        email: "",
        mobilePhoneNum: "",
        invoiceReceiveMethod: "",
        accountBalance: "",
        createDate: "",
        activeState: ""
      },
      formsRules: {
        creditLetterCode: []
        // ,
        // companyName: [
        //   { max: 50, message: "不能超过 50 个字符", trigger: "blur" } 
        // ]
      },
      source: {
        states: [
          {
            value: "1",
            label: "已激活"
          },
          {
            value: "-1",
            label: "未激活"
          }
        ],
        invoiceReceiveMethods: [],
        accountTypes: []
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
    let validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.invalidChar));
      } else {
        return callback();
      }
    };
    this.formsRules.creditLetterCode = [
      { max: 50, message: this.languageSource.CommonPayLang.max50, trigger: "blur" },
      { validator: validateSpecialChars, trigger: 'blur' }
    ];

    // 读取数据字典
    this.source.invoiceReceiveMethods = await kindo.dictionary.get('invoiceReceivingMode');
    this.source.accountTypes = await kindo.dictionary.get('exhibitType');

  },
  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },
  methods: {
    editAccount(id) {
      this.$router.push({
        path: "/account_apply",
        query: { rechargeAccountId: id }
      });
    },
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
    onExp() {
      var pageData = $($(".kindo-table").html());
      /* generate workbook object from table */
      var tmp = pageData.find(".el-table__fixed")[0];
      let wb = XLSX.utils.table_to_book(tmp);
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") {
          // console.log(e, wbout);
        }
      }
      return wbout;
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
    formatAccountType: function (row, column) {
      return kindo.ucpUtil.commonFormat(row, column, this.source.accountTypes);
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