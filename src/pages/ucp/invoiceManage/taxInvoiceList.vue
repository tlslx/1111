<template>
  <el-page ref="extension">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box :title="languageSource.CommonPayLang.invoiceCheckIn" icon="fa-search">

        <el-form :model="forms" :rules="formsRules" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery">

          <el-form-item :label="languageSource.CommonPayLang.addedTaxinvoiceNo" label-width="150px" prop="addedTaxinvoiceNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.addedTaxinvoiceNo" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="languageSource.CommonPayLang.elecInvoiceNo" label-width="150px" prop="eInvoiceNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="shortclass" v-model="forms.eInvoiceNo"></el-input>
          </el-form-item>
          <!--<el-form-item label="开票时间：" label-width="100px" prop="prepareStartTime">
            <el-date-picker v-model="forms.prepareStartTime" placeholder="" class="inputclass" :picker-options="{disabledDate:val=>val.getTime() > Date.parse(forms.prepareEndTime)}" :clearable="false" :editable="false" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="-" label-width="30px" prop="prepareEndTime">
            <el-date-picker v-model="forms.prepareEndTime" placeholder="" class="inputclass" :picker-options="{disabledDate:val=>val.getTime() < Date.parse(forms.prepareStartTime) - 3600 * 1000 * 24}" :clearable="false" :editable="false" type="date" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>-->
          <el-form-item :label="languageSource.CommonPayLang.invoiceTime" prop="createDate">
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
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column :label="languageSource.CommonPayLang.addedTaxinvoiceNo" prop="addedTaxinvoiceNo" width="300px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.elecInvoiceNo" prop="eInvoiceNo" min-width="300px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <!--<el-table-column label="订单号" prop="exhibitionName" min-width="100px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column label="发票日期" prop="createDate" width="150px" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center">
            </el-table-column>-->
            <el-table-column :label="languageSource.CommonPayLang.invoiceMan" prop="creatorName" min-width="150px" show-overflow-tooltip header-align="center">
            </el-table-column>
            <el-table-column :label="languageSource.CommonPayLang.invoiceTime" prop="createDate" width="150px" :formatter="(row) => row.createDate?kindo.util.formatDate(row.createDate):''" show-overflow-tooltip header-align="center">
            </el-table-column>
            <!--<el-table-column label="状态" prop="exhibitionName" min-width="100px" show-overflow-tooltip header-align="center">
            </el-table-column>-->
            <el-table-column :label="languageSource.CommonLang.operation" width="150px" align="center" fixed='right'>
              <template slot-scope="scope">
                <!--<el-button type="text" icon="el-icon-edit" title="修改" @click="editList(scope.row,'exhibitionId', 'child', api.getbyid)"></el-button>
                <el-button type="text" icon="el-icon-view" title="查看" @click="viewList(scope.row,'exhibitionId', 'child', api.getbyid)"></el-button>
                <el-button type="text" icon="el-icon-document" title="复制" @click="cloneList(scope.row,'exhibitionId', 'child', api.clone)"></el-button>-->
                <el-button type="text" v-if="right('invoiceDelete')" @click="deleteData(scope.row)">{{languageSource.CommonLang.delete}}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
          <!--<div slot="control">
            <el-button icon="el-icon-plus" @click="onAdd">新增</el-button>
          </div>-->
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "taxInvoiceList",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: 'taxInvoiceList',
      'languageSource': {
        'CommonPayLang': {},
        'CommonLang': {}
      },
      api: {
        // get: "http://localhost:8051/UnifiedCollectionMS" + "/api/invoice/taxInvoice/getListPage", //kindo.config.api.baseUrl + 
        // delete: "http://localhost:8051/UnifiedCollectionMS" + "/api/invoice/taxInvoice/deleteById"  //kindo.config.api.baseUrl + 
        get: kindo.config.api.unifiedCollectUrl + "/api/invoice/taxInvoice/getListPage", //kindo.config.api.baseUrl + 
        delete: kindo.config.api.unifiedCollectUrl + "/api/invoice/taxInvoice/deleteById"  //kindo.config.api.baseUrl + 
      },
      forms: {
        addedTaxinvoiceNo: "",
        eInvoiceNo: "",
        createDate: "",
        prepareStartTime: kindo.util.formatDate(new Date(), "yyyy-MM-dd"),
        prepareEndTime: kindo.util.formatDate(new Date().proDate("{%d+7}"), "yyyy-MM-dd")
      },

      formsRules: {
        
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
    // form: function () {
    //   return {
    //     queryParams: this.params
    //   };
    // }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    // 读取数据字典
    // this.source.quarter = await kindo.dictionary.get('languageType');
    this.languageSource.CommonPayLang = kindo.util.getLanguage('CommonPayLang');
    this.languageSource.CommonLang = kindo.util.getLanguage('CommonLang');
    let validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.languageSource.CommonPayLang.invalidChar));
      } else {
        return callback();
      }
    };
    this.formsRules.addedTaxinvoiceNo = [
      { required: false, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.addedTaxinvoiceNo, trigger: "blur" },
      { min: 0, max: 50, message: this.languageSource.CommonPayLang.addedTaxinvoiceNo + this.languageSource.CommonPayLang.max50, trigger: "blur" },
      { validator: validateSpecialChars, trigger: 'blur' }
    ];
    this.formsRules.eInvoiceNo = [
      { required: false, message: this.languageSource.CommonLang.input + this.languageSource.CommonPayLang.elecInvoiceNo, trigger: "blur" },
      { min: 0, max: 50, message: this.languageSource.CommonPayLang.elecInvoiceNo + this.languageSource.CommonPayLang.max50, trigger: "blur" },
      { validator: validateSpecialChars, trigger: 'blur' }
    ];
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    deleteData(row) {
      // this.child.action = 'delete';
      kindo.util.confirm(this.languageSource.CommonPayLang.deleteConfirm + "?", undefined, undefined, () => {
        this.$http.postJson(this.api.delete, { id: row.id }).then((res) => {
          kindo.util.alert(this.languageSource.CommonLang.deleteSuccess, this.languageSource.CommonLang.tips, 'success');
          this.$refs['table'].reloadData();
        });
      });
    },
    onQuery() {
      this.$refs.table.loadData();
      // var params = [];
      // if (!this.$utility.isEmpty(this.forms.addedTaxinvoiceNo)) {
      //   params.push({
      //     Name: "addedTaxinvoiceNo",
      //     FindType: "LIKE",
      //     Values: [this.forms.addedTaxinvoiceNo]
      //   });
      // }
      // if (!this.$utility.isEmpty(this.forms.eInvoiceNo)) {
      //   params.push({
      //     Name: "eInvoiceNo",
      //     FindType: "EQ",
      //     Values: [this.forms.eInvoiceNo]
      //   });
      // }
      // if (!this.$utility.isEmpty(this.forms.prepareStartTime)) {
      //   // let endDate = this.$utility.DateFormat(
      //   //   this.forms.prepareStartTime,
      //   //   "yyyy-MM-dd"
      //   // );
      //   params.push({
      //     Name: "createDate",
      //     FindType: "GTE",
      //     Values: [this.forms.prepareStartTime]
      //   });
      // }
      // if (!this.$utility.isEmpty(this.forms.prepareEndTime)) {
      //   // let endDate = this.$utility.DateFormat(
      //   //   this.forms.prepareEndTime,
      //   //   "yyyy-MM-dd"
      //   // );
      //   params.push({
      //     Name: "createDate",
      //     FindType: "LTE",
      //     Values: [this.forms.prepareEndTime]
      //   });
      // }
      // this.queryParams = {
      //   queryParams: params
      // };
      // // 操作都放在下一次，第一次不会刷新
      // this.$nextTick(function() {
      //   this.$refs.table.loadData();
      // });
    },

    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
      // this.forms = Object.assign({}, this._forms);
      // this.queryParams = { queryParams: [] };
      // this.$nextTick(function() {
      //   this.$refs.table.reloadData();
      // });
    }
  },
  watch: {
    "forms.prepareStartTime"(v) {
      this.forms.prepareStartTime = kindo.util.formatDate(v);
    },
    "forms.prepareEndTime"(v) {
      this.forms.prepareEndTime = kindo.util.formatDate(v);
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
.el-table__body {
  .el-table__row {
    .el-button {
      padding: 0 2px;
    }
  }
}
</style>