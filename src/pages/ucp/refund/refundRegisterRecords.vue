<template>
  <el-page ref="refundRegisterRecords">
    <template slot="header">
      <!--按钮栏-->
      <kindo-box :title="source.language.refundRegisterRecords" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" ref="forms" label-position="right" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.refundRegisterBillNo" prop="orderNum">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.orderNum" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.purchaserName" prop="purchaserName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.purchaserName" class="inputclass" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="right('refundRegisterRecordsQuery')" icon="el-icon-search" type="primary" @click="onQuery">{{source.comLanguage.query}}</el-button>
            <el-button v-if="right('refundRegisterRecordsReset')" type="info" @click="onResetQuery">{{source.comLanguage.reset}}</el-button>
          </el-form-item>
        </el-form>
        <el-form slot="more" :model="forms" :rules="formsRules" label-width="80px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.registerDate" prop="createDate">
            <el-date-picker v-model="forms.createDate" type="daterange" :range-separator="source.language.to" :start-placeholder="source.language.startDate" :end-placeholder="source.language.endDate">
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
            <el-table-column prop="orderNum" :label="source.language.refundRegisterBillNo" width="150" sortable="custom" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="purchaserBankAccount" :label="source.language.purchaserBankAccount" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="purchaserBankName" :label="source.language.purchaserBankName" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="purchaserName" :label="source.language.purchaserName" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="refundAmount" :label="source.language.refundAmount" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="purchaserTel" :label="source.language.purchaserTel" width="150" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="creatorName" :label="source.comLanguage.creatorName" width="100" show-overflow-tooltip header-align="center"></el-table-column>
            <el-table-column prop="createDate" :label="source.comLanguage.creatorDate" width="200" show-overflow-tooltip header-align="center"></el-table-column>
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
      pageId: "refundRegisterRecords",
      api: {
        get: kindo.config.api.unifiedCollectUrl + "/api/refundRegisterRecords/getListPage"
      },
      source: {
        language: [],
        comLanguage: []
      },
      forms: {
        orderNum: "",
        purchaserName: "",
        createDate: ""
      },
      formsRules: {},
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
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.source.language.invalidChar));
      } else {
        return callback();
      }
    };

    this._forms = Object.assign({}, this.forms);
    this._child = Object.assign({}, this.child);

    this.source.comLanguage = kindo.util.getLanguage('CommonLang');
    this.source.language = kindo.util.getLanguage('CommonPayLang');

    this.formsRules = {
      orderNum: [
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      purchaserName: [
        { max: 50, message: this.source.comLanguage.max50, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ]
    };
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