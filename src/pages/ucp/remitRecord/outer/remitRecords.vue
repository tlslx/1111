<template>
  <el-page ref="remitRecords">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box :title="source.language.remitRegisterRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.billNo" prop="billNo">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.billNo" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.state" prop="approveState">
            <el-select v-model="forms.approveState" :placeholder="source.language.selectState" class="inputclass" :clearable="true" :editable="false">
              <el-option v-for="item in source.approveStates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exhibitType" prop="rechargeType">
            <el-select v-model="forms.rechargeType" class="inputclass" :placeholder="source.language.pleaseSelect" :clearable="true" :editable="false">
              <el-option v-for="item in source.rechargeTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-if="right('remit_recordsQuery')" icon="el-icon-search" type="primary" @click="onQuery">{{source.comLanguage.query}}</el-button>
            <el-button v-if="right('remit_recordsReset')" type="info" @click="onResetQuery">{{source.comLanguage.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.remitDate" prop="remitDate">
            <el-date-picker v-model="forms.remitDate" type="daterange" :range-separator="source.language.to" :start-placeholder="source.language.startDate" :end-placeholder="source.language.endDate">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <kindo-box>
          <kindo-table ref="table" :url="api.get" :queryParam="form">
            <el-table-column prop="billNo" :label="source.language.billNo" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="rechargeAccount" :label="source.language.rechargeAccountNum" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="rechargeType" :label="source.language.exhibitType" width="150" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.rechargeTypes,value)}" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="companyName" :label="source.language.companyName" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="remitDate" :formatter="formatDate" width="150" :label="source.language.remitDate" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="currency" :formatter="formatCurrency" :label="source.language.currency" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="remitAmount" :label="source.language.remitAmount" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="payBankAccountNum" :label="source.language.payBankAccountNum" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="payBankName" :label="source.language.payBankAccountName" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="remitAttachmentName" :label="source.language.remitAttachment" width="200" show-overflow-tooltip header-align="center">
              <template slot-scope="scope">
                <a :href="api.getFile+'/api/fs/view/'+scope.row.remitAttachment" target="_blank">{{scope.row.remitAttachmentName}}</a>
              </template>              
            </el-table-column>
            <el-table-column prop="approveState" :formatter="(row,colums,value)=>{return kindo.dictionary.getLabel(source.approveStates,value)}" :label="source.language.state" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="remitNotes" :label="source.language.remitNotes" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="approveRemark" :label="source.language.approveRemark" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column width="150" align="center" :label="source.comLanguage.operation" fixed="right">
              <template slot-scope='scope'>
                <template v-if="scope.row.approveState==3">
                  <el-tag type="warning">{{source.language.rejected}}</el-tag>
                </template>
                <template v-else-if="scope.row.approveState==2">
                  <el-tag type="info">{{source.language.approving}}</el-tag>
                </template>
                <template v-else-if="scope.row.approveState==1">
                  <el-tag type="success">{{source.language.approved}}</el-tag>
                </template>
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
  name: "remitRecords",
  mixins: [tableMixIn, listPageBase],
  data() {
    return {
      pageId: "remit_records",
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/openapi/recharge/remitRecords/getListPage",
        getFile: kindo.config.api.comsUrl
      },
      forms: {
        billNo: "",
        approveState: "",
        remitDate: "",
        rechargeType: ""
      },
      formsRules: {},
      source: {
        approveStates: [],
        language: [],
        comLanguage: [],
        rechargeTypes: []
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
    this._forms = Object.assign({}, this.forms);
    this._child = Object.assign({}, this.child);

    this.source.comLanguage = kindo.util.getLanguage('CommonLang');
    this.source.language = kindo.util.getLanguage('CommonPayLang');

    this.source.approveStates = [{ value: '', label: this.source.language.all }, { value: '1', label: this.source.language.approved }, { value: '2', label: this.source.language.approving }, { value: '3', label: this.source.language.rejected }];
    this.formsRules = {
      billNo: [
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" }
      ]
    };
    this.source.rechargeTypes = await kindo.dictionary.get('exhibitType');
  
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
    formatApproveState(row, column, cellValue, index) {
      if (cellValue === '1') {
        return "已审核";
      } else if (cellValue === '2') {
        return "未审核";
      } else if (cellValue === '3') {
        return "已驳回";
      } else {
        return "---";
      }
    },
    formatCurrency(row, column, cellValue, index) {
      if (cellValue === '1') {
        return "人民币";
      } else if (cellValue === '2') {
        return "美元";
      } else if (cellValue === '3') {
        return "欧元";
      } else if (cellValue === '4') {
        return "港币";
      } else {
        return "--";
      }
    },
    formatDate(row, column, cellValue, index) {
      let date = new Date(cellValue);
      return this.$utility.DateFormat(date, "yyyy-MM-dd");
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