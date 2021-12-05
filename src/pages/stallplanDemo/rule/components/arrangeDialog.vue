<template>
  <el-dialog
    :title="languageSource.RuleSettingLang.thirdAddTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="90%"
    @close="clear">
    <kindo-box>
      <el-form :inline="true" :model="searchForm" ref="searchForm" label-position="left" label-width="68px"
        @submit.native.prevent @keyup.enter.native="onQuery">
        <el-form-item prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable">
          <!-- :placeholder="languageSource.RuleSettingLang.enterpriseNameTips" -->
          <el-input v-model="searchForm.enterpriseName" clearable :maxlength="255" class="common-style"></el-input>
        </el-form-item>
        <el-form-item prop="exhibitionType" :label="languageSource.LocationLang.exhibitionPropertyTable">
          <!-- :placeholder="languageSource.LocationLang.exhibitionPositionTypeTip" -->
          <el-select v-model="searchForm.exhibitionType" clearable class="common-style" placeholder="" >
            <el-option
              v-for="nature in natures"
              :key="nature.value"
              :label="nature.label"
              :value="nature.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable" >
          <!-- :placeholder="languageSource.LocationLang.exhibitionAreaTip" -->
          <el-select v-model="searchForm.exhibitionArea" clearable class="common-style" placeholder="" >
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
          <el-button type="info" @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
      </el-form>

      <el-form :inline="true" ref="formData" :model="formData" :rules="rules" label-width="78px" label-position="left">
        <el-form-item prop="positionNumber" :label="languageSource.RuleSettingLang.exhibitionPositionNumber">
          <el-input v-model="formData.positionNumber" clearable :placeholder="languageSource.RuleSettingLang.positionNumberTips" :maxlength="255"  class="common-style"></el-input>
        </el-form-item>
      </el-form>
    </kindo-box>

    <kindo-box>
      <kindo-table
        ref="singleTable"
        :url="config.api.getUnPreArrangedEnterprise"
        :queryParam="form"
        @current-change="handleChange"
      >
        <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseNameTable" header-align="center" align="center" min-width="304"></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.LocationLang.exhibitionPropertyTable" header-align="center" align="center" min-width="302"></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionAreaTable"  header-align="center" align="center" min-width="302"></el-table-column>
      </kindo-table>
      <!-- <kindo-table
        ref="singleTable"
        :url="config.api.getEnterpriseList"
        :queryParam="form"
        @current-change="handleChange"
      >
        <el-table-column prop="companyName" :label="languageSource.RuleSettingLang.enterpriseNameTable" header-align="center" align="center" min-width="304"></el-table-column>
        <el-table-column prop="boothType" :label="languageSource.LocationLang.exhibitionPropertyTable" header-align="center" align="center" min-width="302"></el-table-column>
        <el-table-column prop="exhibitionAreaName" :label="languageSource.LocationLang.exhibitionAreaTable"  header-align="center" align="center" min-width="302"></el-table-column>
      </kindo-table> -->
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
  name: 'arrange-dialog',
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
      'formData': {},
      'currentRow': null,
      'rules': {},
      '_forms': {}
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.searchForm
      };
    }
  },
  created () {
    this._forms = Object.assign({}, this.searchForm);
    //设置校验国际化
    let languageSource = this.languageSource;
    this.rules = {
      'positionNumber': [
        { 'required': true, 'message': languageSource.RuleSettingLang.positionNumberTips, 'trigger': 'change' }
      ]
    };
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.singleTable.reloadData();
    },
    // 重置条件为空查询
    onResetQuery () {
      this.searchForm = Object.assign({}, this._forms);
      this.$nextTick(function() {
        this.$refs.singleTable.reloadData();
      });
    },
    cancel () {
      this.dialogVisible = false;
    },
    confirm () {
      this.$refs.formData.validate((valid) => {
        if (valid && this.currentRow == null) {
          this.$message.error(this.languageSource.RuleSettingLang.selectOneTips);
        }
        if (valid && this.currentRow != null) {
          let data = {
            'enterpriseName': this.currentRow.companyName,
            'exhibitionType': this.currentRow.boothType,
            'exhibitionArea': this.currentRow.exhibitionAreaName,
            'companyId': this.currentRow.companyId,
            'positionNumber': this.formData.positionNumber
          };
          this.$http.postJson(this.config.api.addArrangeEnterprise, [data])
            .then(res => {
              this.dialogVisible = false;
              this.$emit('ok');
            });
        }
      });
    },
    handleChange (row) {
      this.currentRow = row;
    },
    clear () {
      this.$refs.singleTable.setCurrentRow();
      this.$refs.formData.resetFields();
      this.$refs.searchForm.resetFields();
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
.common-style {
  width: 180px;
}
</style>
