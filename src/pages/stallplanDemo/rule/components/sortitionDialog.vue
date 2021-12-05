<template>
  <el-dialog
    :title="languageSource.LocationLang.import"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="clear"
    width="50%">
    <el-form ref="sortForm" :model="sortForm" :rules="rules" :inline="false" label-position="left">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="file" ref="uploadElement">
            <el-upload
              ref="upload"
              accept=".xls, .xlsx"
              :limit="1"
              :action="config.api.importDrawResultExcel"
              :headers="{ 'Token': store.getters.token }"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" type="primary">{{languageSource.LocationLang.selectFile}}</el-button>
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
import { Message } from 'element-ui';
import listPageBase from '@/components/framework/mixins/listPageBase';
import store from '../../../../scripts/framework/store';
export default {
  name: 'sortitionDialog',
  mixins: [listPageBase],
  props: {
    'languageSource': {
      'type': Object
    }
  },
  data () {
    return {
      config,
      store,
      'sortForm': {},
      'dialogVisible': false,
      'fileList': [],
      'rules': {
        // file: [{ required: true, message: '请选择文件', trigger: 'change' }]
      }
    };
  },
  created () {
    let languageSource = this.languageSource;
    this.rules = {
      file: [{ required: true, message: languageSource.LocationLang.selectFileMsg, trigger: 'change' }]
    };
  },
  methods: {
    submitUpload () {
      this.$refs.sortForm.validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    handleRemove () {
      // this.rules.file = [{ required: true, message: '请选择文件', trigger: 'change' }];
      this.rules.file = [{ required: true, message: this.languageSource.LocationLang.selectFileMsg, trigger: 'change' }];
    },
    handleChange (file, fileList) {
      if (fileList.length) {
        this.rules.file = [];
        this.$refs.uploadElement.clearValidate();
      }
    },
    handleSuccess (res) {
      let languageSource = this.languageSource;
      this.dialogVisible = false;
      this.fileList = [];
      if (res.errorCode !== '200') {
        Message.error(res.errormsg);
      } else {
        Message.success(languageSource.LocationLang.importMsg);
        this.$emit('uploadReload');
      }
    },
    clear () {
      this.fileList = [];
      this.$refs.sortForm.resetFields();
    }
  }
};
</script>

<style scoped>
.tip {
  margin-left: 10px;
}
</style>

