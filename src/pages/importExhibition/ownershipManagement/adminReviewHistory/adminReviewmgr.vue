<template>
  <el-page ref="adminReviewmgr">
    <template slot="header">
      <kindo-box :title="source.language.adminViewHistoryOwnershipInfo" icon="fa-search">
        <el-form :model="forms" label-position="right" inline @submit.native.prevent @keyup.enter.native="onQuery" :rules="formsRules">
          <el-form-item :label="source.language.sessionNumber" label-width="55px" prop="session">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.session" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.personalName" label-width="90px" prop="name">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.name" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.enterpriseName" label-width="90px" prop="enterpriseName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.enterpriseName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.ownershipType" label-width="90px">
            <el-select v-model="forms.affiliationType" clearable :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.affiliationTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <!--历史归属企业记录 -->
        <kindo-table ref="historyAffilationTable" :url="api.get" :queryParam="form">
          <el-table-column prop="session" :label="source.language.sessionNumber" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="name" :label="source.language.name" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="enterpriseName" :label="source.language.enterpriseName" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="affiliationType" :label="source.language.ownershipType" show-overflow-tooltip :formatter="verifyStatus" min-width="150"></el-table-column>
          <el-table-column prop="ascriptionApplyDate" :label="source.language.ownershipTime" show-overflow-tooltip min-width="150"></el-table-column>
          <el-table-column prop="rescissionDate" :label="source.language.releaseTime" show-overflow-tooltip min-width="150"></el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "adminReviewmgr",
  mixins: [listPageBase],
  data() {
    return {
      pageId: "adminReviewmgr",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiIndividualEnterpriseOwnership/getHistoricalInformation"
      },
      forms: {
        session: "",
        name: "",
        enterpriseName: "",
        affiliationType: ""
      },
      loading: false,
      source: {
        language: {},
        affiliationTypeOptions: []
      },
      formsRules: {}
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
        return callback(new Error(this.source.language.validateSpecialChars));
      } else {
        return callback();
      }
    };
    var validateInterger = (rule, value, callback) => {
      if (kindo.validate.pInterger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateInterger));
      }
    };
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('ownershipManagementLang');
    this.source.affiliationTypeOptions = [{
      value: 0,
      label: this.source.language.personalJoinEnterprise
    }, {
      value: 1,
      label: this.source.language.enterpriseInvitePersonal
    }, {
      value: 2,
      label: this.source.language.personalCreateEnterprise
    }, {
      value: 3,
      label: this.source.language.enterpriseCreatePersonal
    }];
    this.formsRules = {
      name: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      enterpriseName: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      session: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateInterger, trigger: 'blur' }
      ]
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
    });
  },
  methods: {
    onQuery() {
      this.$refs.historyAffilationTable.loadData();
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        this.$refs.historyAffilationTable.reloadData();
      });
    },
    verifyStatus(row, column, cellValue, index) {
      if (row.ascriptionType === 0) {
        return this.source.language.personalJoinEnterprise;
      } else if (row.ascriptionType === 1) {
        return this.source.language.enterpriseInvitePersonal;
      }
    }
  }
};
</script>

<style>
</style>
