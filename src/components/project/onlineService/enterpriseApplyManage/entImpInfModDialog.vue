<style scoped>
  .dialog-form {
    width: 90%;
  }
</style>
<template>
  <el-dialog :visible.sync="dialogFormVisible" @close="closeDialog" title="修改">
    <el-form :model="form" class="dialog-form" :rules="rules" ref="editImporInfo">
      <el-form-item :label="formInfo.label + '：'" label-width="200px" :prop="formInfo.prop">
        <span v-if="formInfo.hasPrevInfo">{{ formInfo.prevInfo }}</span>
        <el-input v-model="form[formInfo.prop]" :maxlength="formInfo.maxlength"></el-input>
      </el-form-item>
      <el-form-item label="上传附件：" v-if="formInfo.prop !== 'enterprise_abbreviation'" label-width="200px" ref="proofUrl" prop="proofUrl"
        :rules="[{ required: true, validator: validateImg, trigger: 'change' }]">
        <el-upload
          class="upload-dialog"
          :action="uploadUrl"
          :on-remove="handleRemove"
          :on-success="uploadSuccessfully"
          :before-upload="handleBeforeUpload"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label-width="100px">
        <div style="font-size: 12px;">{{ formInfo.tips }}</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class=" dialog-footer">
      <el-button type="primary" @click="confirm">确 定</el-button>
      <el-button type="info" @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // 上传图片地址
      uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile',
      fileList: [],
      form: {},
      // 是否已上传附件
      uploded: false,
      // 文件是否是格式正确的
      isRightFile: true,
      // 文件大小是否符合规范
      fileIsLt500Kb: true
    };
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    formInfo: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.form[this.formInfo.prop] = '';
  },
  methods: {
    ...mapActions('corpDataManagement', ['modifyImportCompanyInfos']),
    ...mapActions('file', ['delFileInfo']),
    // 校验图片
    validateImg(rule, value, callback) {
      if (!this.uploded) {
        return callback(new Error(this.formInfo.tips));
      } else {
        return callback();
      }
    },
    // 限制上传文件
    handleBeforeUpload(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png' && file.type !== 'application/pdf') {
        this.isRightFile = false;
      } else {
        this.isRightFile = true;
      }
      this.fileIsLt500Kb = file.size / 1024 < 500;
      if (!this.isRightFile) {
        this.$message.error('上传的文件只能是 JPG/JPEG/PNG/GIF/PDF 格式!');
      }
      if (!this.fileIsLt500Kb) {
        this.$message.error('上传的文件大小不能超过 500kb!');
      }
      return this.isRightFile && this.fileIsLt500Kb;
    },
    // 移除之前的回调
    beforeRemove(file, fileList) {
      if (this.isRightFile && this.fileIsLt500Kb) {
        return this.$confirm('确定移除？');
      }
    },
    // 上传成功的回调
    uploadSuccessfully(response, file, fileList) {
      if (response && response.data.fileName) {
        this.form.proofUrlName = response.data.fileName;
      }
      this.formInfo.proofUrl = response.data.fileId;
      this.form.proofUrl = response.data.fileId;
      this.uploded = true;
      this.$refs['proofUrl'].clearValidate();
    },
    // 移除附件
    handleRemove(file, fileList) {
      this.uploded = false;
      this.formInfo.proofUrl = '';
      if (this.form.proofUrlName) {
        this.form.proofUrlName = '';
      }
      if (file.response) {
        this.delFileInfo(file.response.data.fileId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: 'error'
          });
        });
      }
    },
    handleExceed() {
      this.$message.error('只能上传一个文件!');
    },
    // 编辑取消
    cancel() {
      this.uploded = false;
      this.$emit('close-dialog-info', false);
      this.fileList = [];
      if (this.formInfo && this.formInfo.proofUrl !== '') {
        this.formInfo.proofUrl = '';
      }
      if (this.formInfo.proofUrlName && this.formInfo.proofUrlName !== '') {
        this.formInfo.proofUrlName = '';
      }
      this.$refs['editImporInfo'].resetFields();
      this.$refs['editImporInfo'].clearValidate();
    },
    // 编辑确认
    confirm() {
      this.formInfo.value = this.form[this.formInfo.prop];
      if (this.form.proofUrlName) {
        this.formInfo.proofUrlName = this.form.proofUrlName;
      }
      this.$refs['editImporInfo'].validate((valid) => {
        if (valid) {
          this.$emit('confirm-dialog-info', this.formInfo);
          this.fileList = [];
        } else {
          this.$message({
            showClose: true,
            message: '信息验证未通过',
            type: 'error'
          });
        }
      });
    },
    // 关闭的回调
    closeDialog() {
      this.$refs['editImporInfo'].clearValidate();
      this.$emit('close-dialog-info', false);
    }
  }
};
</script>
