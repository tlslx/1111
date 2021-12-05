<template>
  <el-dialog :title="languageSource.RuleSettingLang.thirdAddTitle" :visible.sync="dialogVisible" width="90%" @close="clear">
    <kindo-box>
      <el-form :inline="true" size="small" :model="searchForm" ref="searchForm"
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
        <el-form-item prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea" >
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
          <el-button @click="onResetQuery">{{languageSource.CommonLang.reset}}</el-button>
        </el-form-item>
      </el-form>

      <el-form :inline="true" size="small" ref="formData" :model="formData" :rules="rules">
        <el-form-item prop="positionNumber" :label="languageSource.RuleSettingLang.exhibitionPositionNumber">
          <el-input v-model="formData.positionNumber" clearable placeholder="请输入展位编号"></el-input>
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
        <el-table-column prop="enterpriseName" :label="languageSource.RuleSettingLang.enterpriseName" header-align="center" align="center" min-width="304"></el-table-column>
        <el-table-column prop="exhibitionType" :label="languageSource.RuleSettingLang.exhibitionPositionType" header-align="center" align="center" min-width="302"></el-table-column>
        <el-table-column prop="exhibitionArea" :label="languageSource.LocationLang.exhibitionArea"  header-align="center" align="center" min-width="302"></el-table-column>
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
      'rules': {
        'positionNumber': [
          { 'required': true, 'message': '请输入展位编号', 'trigger': 'change' }
        ]
      },
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
  async created () {
    this._forms = Object.assign({}, this.searchForm);
  },
  methods: {
    // 查询
    onQuery() {
      this.$refs.singleTable.loadData();
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
          this.$message.error('请选择一家企业');
        }
        if (valid && this.currentRow != null) {
          let data = {
            'enterpriseName': this.currentRow.enterpriseName,
            'exhibitionType': this.currentRow.exhibitionType,
            'exhibitionArea': this.currentRow.exhibitionArea,
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
</style>
