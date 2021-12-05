<template>
  <el-page ref="operatorDailyAllInfo">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box :title="source.language.cashierDailySummary" icon="fa-search">
        <el-form :model="forms" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.collectionTime" prop="queryDate">
            <el-date-picker v-model="forms.queryDate" type="daterange" :range-separator="source.language.to" :start-placeholder="source.language.startDate" :end-placeholder="source.language.endDate">
            </el-date-picker>        
          </el-form-item>
          <el-form-item :label="source.language.collector" prop="operatorId">
            <el-dropdown-list class="inputclass" :placeholder="source.language.pleaseSelect" v-model="forms.operatorId" :url="api.getOperator" text-field="operatorName" value-field="id" :params="{OrderModelField: [{OrderByField: 'id',asc: true}]}" :allow-create="false" :filterable="true" :clearable="true"></el-dropdown-list>
          </el-form-item>
          <el-form-item>
            <el-button v-if="right('operatorDailyAllInfoQuery')" icon="el-icon-search" type="primary" @click="onQuery">{{source.comLanguage.query}}</el-button>
            <el-button v-if="right('operatorDailyAllInfoReset')" type="info" @click="onResetQuery">{{source.comLanguage.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <kindo-box>
        <el-page-data>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="operatorName" :label="source.language.collector" width="150" align="center" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumCash" :label="source.language.cash" align="center" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumCheck" :label="source.language.check" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumAlipay" :label="source.language.alipay" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumWeixin" :label="source.language.wechat" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumAccountPay" :label="source.language.advancePayment" align="center" width="120" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumQuickPay" :label="source.language.posQuickPayment" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="sumAllMoney" :label="source.language.subtotal" align="center" width="200" show-overflow-tooltip header-align="center"></el-table-column>
            <div slot="control">  
              <div class="button_class">
                <el-button v-if="right('operatorDailyAllInfoExport')" icon="el-icon-plus" @click="onExp()">{{source.language.export}}</el-button>
              </div>
              <div class="button_class">
                <el-button v-if="right('operatorDailyAllInfoPrint')" icon="el-icon-plus" @click="priteDate()">{{source.language.print}}</el-button>
              </div>
            </div>
          </kindo-table>
        </el-page-data>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import tableMixIn from "@/utils/helper/tableMixIn";
// import request from "@/scripts/framework/http";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "operatorDailyAllInfo",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "operatorDailyAllInfo",
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/daily/record/getOperatorDailyAllInfo",
        getOperator: kindo.config.api.unifiedCollectUrl + "/api/basicData/operator/getAllList"
      },
      // 弹出框
      forms: {
        operatorId: "",
        queryDate: ""
      },
      source: {
        language: [],
        comLanguage: []
      },
      childVisible: false,
      multipleSelection: [],
      pageIndex: false,
      dailyCollectAllAmount: ""
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

    this.source.comLanguage = kindo.util.getLanguage('CommonLang');
    this.source.language = kindo.util.getLanguage('CommonPayLang');
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
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    priteDate() {
      this.$message({
        type: 'info',
        message: "正在开发中..."
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
  margin-left: 10px;
}
</style>