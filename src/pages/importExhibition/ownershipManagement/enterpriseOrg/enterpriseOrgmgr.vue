<template>
  <el-page ref="enterpriseOrgmgr">
    <template slot="header">
      <kindo-box :title="source.language.enterpriseOwnershipAgency" icon="fa-search">
        <el-form :model="forms" :rules="formsRules" label-position="right" label-width="110px" inline @submit.native.prevent @keyup.enter.native="onQuery" v-show="isShowSerachBox">
          <el-form-item :label="source.language.cooperationAgency" prop="cooperationAgencyName">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.cooperationAgencyName" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.cooperationAgencyCode" prop="cooperationAgencyCode">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.cooperationAgencyCode" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.cooperationAgencyType" prop="agencyTypeId">
            <el-select v-model="forms.agencyTypeId" clearable :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.agencyTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onSearch">{{source.language.query}}</el-button>
            <el-button type="info" @click="onResetQuery">{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="source.language.sendRequest" name="sendQuery">
            <sendQuery ref="sendQuery" :language="source.language" :isSerach="isSearchNow"></sendQuery>
          </el-tab-pane>
          <el-tab-pane :label="source.language.receiveQuery" name="receiveQuery">
            <receiveQuery ref="receiveQuery" :language="source.language"></receiveQuery>
          </el-tab-pane>
          <el-tab-pane :label="source.language.applyRecord" name="applyRecord">
            <applyRecord ref="applyRecord" :language="source.language"></applyRecord>
          </el-tab-pane>
        </el-tabs>
      </kindo-box>
    </template>
  </el-page>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'enterpriseOrgmgr',
  mixins: [listPageBase],
  data() {
    return {
      pageId: "enterpriseOrgmgr",
      forms: {
        enterpriseId: "",
        cooperationAgencyName: "",
        cooperationAgencyCode: "",
        agencyTypeId: ""
      },
      activeName: "sendQuery",
      isShowSerachBox: true,
      source: {
        language: {},
        agencyTypeOptions: []
      },
      formsRules: {},
      isSearchNow: false
    };
  },
  async created() {
    var validateSpecialChars = (rule, value, callback) => {
      if (kindo.validate.containSpecialChars(value)) {
        return callback(new Error(this.source.language.validateSpecialChars));
      } else {
        return callback();
      }
    };
    var validateAgencyCode = (rule, value, callback) => {
      if (kindo.validate.agencyCode(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateCreditCode));
      }
    };
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    this.source.language = kindo.util.getLanguage('ownershipManagementLang');
    this.formsRules = {
      cooperationAgencyName: [
        { max: 100, message: this.source.language.sessionRules, trigger: "blur" },
        { validator: validateSpecialChars, trigger: 'blur' }
      ],
      cooperationAgencyCode: [
        { max: 32, message: this.source.language.cooperationAgencyCodeRules, trigger: "blur" },
        { validator: validateAgencyCode, trigger: 'blur' }
      ]
    };
    // 读取数据字典 合作机构类型，主办方不显示
    this.source.agencyTypeOptions = await kindo.dictionary.get('typeOfCooInstitutions');
    this.source.agencyTypeOptions.forEach((item, index) => {
      if (item.label === "主办方") {
        this.source.agencyTypeOptions.splice(index, 1);
      }
    });
  },
  methods: {
    handleClick(tab) {
      this.isShowSerachBox = tab.name === "sendQuery";
      switch (tab.name) {
        case "sendQuery":
          this.$refs.sendQuery.onQuery();
          break;
        case "receiveQuery":
          this.$refs.receiveQuery.onQuery();
          break;
        case "applyRecord":
          this.$refs.applyRecord.onQuery();
          break;
        default:
      }
    },
    onSearch() {
      let params = {
        isSearch: true,
        queryParams: this.forms
      };
      this.$root.$emit("onSearch", params);
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.onSearch();
    }
  },
  components: {
    'sendQuery': () => import('./components/sendQuery'),
    'receiveQuery': () => import('./components/receiveQuery'),
    'applyRecord': () => import('./components/applyRecord')
  }
};
</script>

<style>
</style>
