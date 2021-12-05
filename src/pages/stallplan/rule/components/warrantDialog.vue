<template>
  <el-dialog :title="languageSource.RuleSettingLang.addAuthorized" :visible.sync="dialogVisible" width="90%" @close="clear">
    <kindo-box>
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm" label-width="85px"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName">
          <el-input v-model="searchForm.enterpriseName" clearable placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item prop="exhibitionType" :label="languageSource.RuleSettingLang.exhibitionPositionType">
          <el-select v-model="searchForm.exhibitionType" clearable placeholder="请选择展位类型">
            <el-option
              v-for="nature in natures"
              :key="nature.value"
              :label="nature.label"
              :value="nature.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea"  label-width="60px">
          <el-select v-model="searchForm.exhibitionArea" clearable placeholder="请选择展区">
            <el-option
              v-for="area in areas"
              :key="area.value"
              :label="area.label"
              :value="area.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">{{languageSource.CommonLang.query}}</el-button>
          <el-button @click="clearForm">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
      </el-form>
    </kindo-box>

  <kindo-box>
    <kindo-table
      ref="multipleTable"
      :url="config.api.getUnauthorizedEnterprise"
      :queryParam="form"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="54" header-align="center" align="center"></el-table-column>
      <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" header-align="center" align="center" min-width="230"></el-table-column>
      <el-table-column prop="exhibitionType" :label="languageSource.RuleSettingLang.exhibitionPositionType" header-align="center" align="center" min-width="228"></el-table-column>
      <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea"  header-align="center" align="center" min-width="228"></el-table-column>
      <el-table-column prop="authorizedContent" :label="languageSource.RuleSettingLang.authorizedContent" header-align="center" align="center" min-width="228"></el-table-column>
    </kindo-table>
  </kindo-box>

    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">{{languageSource.CommonLang.cancel}}</el-button>
        <el-button type="primary" @click="confirm">{{languageSource.CommonLang.confirm}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'warrant-dialog',
  mixins: [listPageBase],
  props: {
    'natures': {
      'type': Array,
      'required': true
    },
    'areas': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      //接口地址
      config,
      'dialogVisible': false,
      'searchForm': {
        enterpriseName: '',
        exhibitionType: '',
        exhibitionArea: ''
      },
      'chooses': [],
      '_forms': {}
    };
  },
  computed: {
    postData () {
      return this.chooses.map(({ enterpriseName, exhibitionType, exhibitionArea, authorizedContent, companyId }) => {
        return { enterpriseName, exhibitionType, exhibitionArea, authorizedContent, companyId };
      });
    },
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  async created () {
    this._forms = Object.assign({}, this.searchForm);
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.multipleTable.loadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.multipleTable.reloadData();
      });
    },
    //取消
    cancel () {
      this.dialogVisible = false;
    },
    confirm () {
      if (this.chooses.length) {
        this.$http.postJson(this.config.api.warrantEnterprise, this.postData)
          .then(res => {
            this.dialogVisible = false;
            this.$emit('ok');
          })
          .catch(() => {

          });
      } else {
        this.$message.error('至少选择一家企业');
      }
    },
    handleSelectionChange (chooses) {
      this.chooses = chooses;
    },
    //关闭弹出框清除方法
    clear () {
      this.$refs.searchForm.resetFields();
      this.$refs.multipleTable.clearSelection();
    },
    clearForm () {
      this.$refs.searchForm.resetFields();
      this.onResetQuery();
    }
  }
};
</script>

<style scoped>
.m-b {
  margin-bottom: 18px;
}
</style>
