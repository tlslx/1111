<template>
  <el-dialog
    title="导入"
    :visible.sync="dialogVisible"
    @close="clear"
    width="50%">
    <el-form ref="leadForm" :model="leadForm" :rules="rules" :inline="false" size="small">
      <el-row class="m-b-sm" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.programName" prop="schemeName">
            <el-input v-model="leadForm.schemeName" clearable style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionNumber" prop="sessionNumber">
            <el-select v-model="leadForm.sessionNumber" clearable placeholder="请选择展会界数">
              <el-option
                v-for="session in sessionNumber"
                :key="session.value"
                :label="session.label"
                :value="session.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-b-sm" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionPeriod" prop="exhibitionPeriod">
            <el-select v-model="leadForm.exhibitionPeriod" clearable placeholder="请选择展期">
              <el-option
                v-for="exhibition in exhibitionPeriodNum"
                :key="exhibition.value"
                :label="exhibition.label"
                :value="exhibition.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionArea" prop="exhibitionAreaName">
            <el-select v-model="leadForm.exhibitionAreaName" clearable placeholder="请选择展区">
              <el-option
                v-for="area in regionOfExhibition"
                :key="area.value"
                :label="area.label"
                :value="area.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-b-sm" :gutter="20">
        <el-col :span="12">
          <el-form-item :label="languageSource.LocationLang.exhibitionProperty" prop="exhibitionProperty">
            <el-select v-model="leadForm.exhibitionProperty" clearable placeholder="请选择展位性质">
              <el-option
                v-for="area in natures"
                :key="area.value"
                :label="area.label"
                :value="area.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="m-b-sm" :gutter="20">
        <el-col :span="24">
          <el-form-item prop="file" ref="uploadElement">
            <el-upload
              ref="upload"
              accept=".xls, .xlsx"
              :limit="1"
              :action="upUrl"
              :headers="{ 'Token': store.getters.token }"
              :data="leadForm"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="file"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">{{languageSource.LocationLang.selectFile}}</el-button>
              <span slot="tip"><span class="tip">{{languageSource.RuleSettingLang.tips}}</span></span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">{{languageSource.CommonLang.cancel}}</el-button>
      <el-button type="primary" @click="submitUpload">{{languageSource.CommonLang.confirm}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import config from './index';
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../../scripts/framework/store';
export default {
  name: 'importDialog',
  mixins: [listPageBase],
  props: {
    'natures': {
      'type': Array,
      'required': true
    },
    'regionOfExhibition': {
      'type': Array,
      'required': true
    },
    'exhibitionPeriodNum': {
      'type': Array,
      'required': true
    },
    'sessionNumber': {
      'type': Array,
      'required': true
    },
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      store,
      'dialogVisible': false,
      'leadForm': {},
      'file': [],
      'rules': {
        'schemeName': [{ required: true, message: '请输入方案名称', trigger: 'change' }],
        'sessionNumber': [{ required: true, message: '请选择展会界数', trigger: 'change' }],
        'exhibitionPeriod': [{ required: true, message: '请选择展期', trigger: 'change' }],
        'exhibitionAreaName': [{ required: true, message: '请选择展区', trigger: 'change' }],
        'exhibitionProperty': [{ required: true, message: '请选择展位性质', trigger: 'change' }],
        'file': [{ required: true, message: '请选择文件', trigger: 'change' }]
      }
    };
  },
  computed: {
    upUrl () {
      return this.config.api.leadUrl;
    }
  },
  methods: {
    // 上传服务器
    submitUpload () {
      this.$refs.leadForm.validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    handleRemove () {
      this.rules.file = [{ required: true, message: '请选择文件', trigger: 'change' }];
    },
    handleChange (file, fileList) {
      if (fileList.length) {
        this.rules.file = [];
        this.$refs.uploadElement.clearValidate();
      }
    },
    handleSuccess (res) {
      this.dialogVisible = false;
      this.file = [];
      this.$refs.leadForm.resetFields();
      if (res.errormsg !== 'success') {
        this.$message.error(res.errormsg);
      } else {
        this.$message.success('导入成功');
        this.$emit('lead');
      }
    },
    clear () {
      this.file = [];
      this.$refs.leadForm.resetFields();
    }
  }
};
</script>

<style scoped>
.tip {
  margin-left: 10px;
}
</style>
