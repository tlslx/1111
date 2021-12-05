<template>
  <el-container>
    <!--页面对话框-->
    <el-dialog :visible.sync="importVisible" :close-on-press-escape="false" :close-on-click-modal="false">
      <template slot="title">
        <span class="el-dialog__title">{{language.format}}</span>
      </template>
      <kindo-box style="height: 200px">
        <el-form :model="importForm" ref="importForm" label-width="110px" size="small" :rules="rules">
           <el-form-item :label="language.year" prop='year'>
             <el-date-picker v-model="importForm.year" type="year" :placeholder="language.selectPlaceholder + language.year" class="inputclass" :editable="false" value-format = "yyyy" format="yyyy" :picker-options="pickerOptions" :clearable='false'>
             </el-date-picker>
          </el-form-item>
          <el-form-item :label="language.document" prop='fileName'>
            <el-input v-model="importForm.fileName" class="inputclass" readonly clearable></el-input>
            <div class='uploadclass'>
              <el-upload
              class="upload-demo"
              ref="upload"
              :disabled="isUploadSuccess"
              :show-file-list='false'
              :action="api.uploadUrl+'?'+'year'+'='+importForm.year"
              :on-progress="uploadProcess"
              :on-success="handleSuccess"
              :on-error="handleError"
              :headers="{ 'Token': store.getters.token }"
              accept=".xls, .xlsx, .xlt, xlsm"
              :before-upload="onBeforeUpload"
              >
              <el-button slot="trigger" type="primary" :disabled="isUploadSuccess">{{language.import}}</el-button>
            </el-upload>
            </div>
          </el-form-item>
          <el-form-item>
           <el-progress v-if="uploadFlag" :text-inside="true" :stroke-width="16" :percentage="uploadPercent" style="width: 260px"></el-progress>
          </el-form-item>
        </el-form>
      </kindo-box>

      <div slot="footer" class="dialog-footer">
        <el-button @click="importVisible = false">{{language.cancel}}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
  import store from '@/scripts/framework/store';
  import listPageBase from '@/components/framework/mixins/listPageBase';
  export default {
    name: "importDialog",
    mixins: [listPageBase],
    props: {
      api: {
        type: Object,
        default: () => {
          return {};
        }
      },
      language: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        store,
        importVisible: false,
        isUploadSuccess: false,
        uploadFlag: false,  // 没有选择文件时，隐藏进度条
        endFlag: false,    // 文件上传失败，终止请求
        limit: 0,
        action: '',
        uploadPercent: 0,  // 进度条初始值
        importForm: {
          year: null,
          fileName: ''
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          year: [
            { required: true, message: '', trigger: "change" }
          ],
          fileName: [
            { required: true, message: '', trigger: "change" }
          ]
        }
      };
    },
    async created() {
      this._importForm = Object.assign({}, this.importForm);
      this.rules.year = this.rules.fileName = [
        { required: true, message: this.language.selectPlaceholder, trigger: "change" }
      ];
    },
    watch: {
      importVisible(v) {
        if (v === true) {
          this.getImport();
        }
      },
      "importForm.year"(v) {
        this.importForm.year = kindo.util.formatDate(v, "yyyy");
      }
    },
    methods: {
      getImport() {
        this.$nextTick(function () {
          this.uploadFlag = false;
          this.importForm = Object.assign({}, this._importForm);
          this.$refs.importForm.resetFields();
        });
      },
      onBeforeUpload(file) {
        if (!this.importForm.year) {
          this.$message({
            type: 'warning',
            message: this.language.selectYearFirst
          });
          return false;
        }
        this.endFlag = false;
        this.importForm.fileName = '';
      },
      // 导入文件进度显示 
      uploadProcess() {
        this.$http.get(this.api.getSchedule).then(res => {
          this.limit = res;
          if (res !== 1 && !this.endFlag) {
            this.uploadProcess();
            this.uploadFlag = true;
            this.isUploadSuccess = true;
            this.uploadPercent = Number((res * 100).toFixed(0));
          } 
          if ((res === 1 || res === 0) && this.endFlag) {
            this.uploadPercent = 100;
            setTimeout(() => {
              this.uploadFlag = false;
              this.isUploadSuccess = false;
            }, 300);
          }
        });   
      },
      // 导入文件成功
      handleSuccess(res, file) { 
        if (res.flag === "1") {
          this.importForm.fileName = file.name;
          this.uploadPercent = 0;
          this.uploadFlag = false;
          this.isUploadSuccess = false;
          this.endFlag = true;
          this.$emit('reload', this.importForm.year);
          this.$message.success(this.language.importedSuccessfully);
        } else {
          this.$message.error(res.message);
          this.importForm.fileName = '';
          this.uploadPercent = 0;
          this.uploadFlag = false;
          this.isUploadSuccess = false;
          this.endFlag = true;
        }
      },
      // 导入文件失败
      handleError(res, file) {
        if (file.status === '"fail"') {
          this.$message.error(res.message);
          this.importForm.fileName = '';
          this.uploadPercent = 0;
          this.uploadFlag = false;
          this.isUploadSuccess = false;
          this.endFlag = true; 
        }
      }
    }
  };
</script>
<style scoped>
  .uploadclass {
    position: absolute;
    left: 170px;
    top: -2px;
  }
</style>