<style scoped>
  .dialog-form {
    width: 90%;
  }
</style>
<template>
  <el-dialog :visible.sync="subDialogFormVisible" @close="closeDialog" title="修改">
    <el-form :model="form" class="dialog-form" :rules="subRules" ref="subEditImporInfo">
      <el-form-item label="企业名称（中文）" label-width="200px" prop="company_name">
        <el-input v-model="form['company_name']" maxlength="80"></el-input>
      </el-form-item>
      <el-form-item label="上传附件：" label-width="200px" prop="proofUrl" ref="proofUrl"
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
        <div style="font-size: 12px;">请上传当地工商部门开具的变更证明，以及企业法人营业执照</div>
      </el-form-item>
      <template v-if="showEnterAbbr">
        <el-form-item label="企业简称：" label-width="200px" prop="enterprise_abbreviation">
          <span>{{ subFormInfo.prevInfo }}</span>
          <el-input style="width: calc(100% - 35px)" v-model="form['enterprise_abbreviation']" :maxlength="enterAbbrLength"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上传附件：" label-width="200px">
          <el-upload
            class="upload-dialog"
            :action="uploadUrl"
            :on-remove="subHandleRemove"
            :on-success="subUploadSuccessfully"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="subFileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item> -->
        <el-form-item label-width="100px">
          <div style="font-size: 12px;">填写格式为：所属交易团简称+企业名称关键字。提示：假如同时修改了企业中文名称，因尚未生效，系统还以旧名称来判断简称规则。请等待中文名称审核通过生效后，再修改简称</div>
        </el-form-item>
    </template>
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
      // subFileList: [],
      form: {

      },
      enterAbbrLength: '8',
      uploded: false,
      // 文件是否是格式正确的
      isRightFile: true,
      // 文件大小是否符合规范
      fileIsLt500Kb: true
    };
  },
  props: {
    subDialogFormVisible: {
      type: Boolean,
      default: false
    },
    subFormInfo: {
      type: Object,
      default: () => {}
    },
    subRules: {
      type: Object,
      default: () => {}
    },
    showEnterAbbr: {
      type: Boolean,
      default: () => {}
    }
  },
  created() {
    this.form = JSON.parse(JSON.stringify(this.subFormInfo));
  },
  methods: {
    ...mapActions('corpDataManagement', ['modifyImportCompanyInfos']),
    ...mapActions('file', ['delFileInfo']),
    // 上传图片的校验
    validateImg(rule, value, callback) {
      if (!this.uploded) {
        return callback(new Error(this.subFormInfo.tips));
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
      this.form.proofUrl = response.data.fileId;
      this.uploded = true;
      this.$refs['proofUrl'].clearValidate();
    },
    // 上传企业简称文件成功的回调
    // subUploadSuccessfully(response, file, fileList) {
    //   this.form.subProofUrl = response.data.fileId;
    // },
    // 移除附件
    handleRemove(file, fileList) {
      this.uploded = false;
      this.form.proofUrl = '';
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
    // 移除企业简称的附件
    // subHandleRemove(file, fileList) {
    //   this.form.subProofUrl = '';
    //   if (file.response) {
    //     this.delFileInfo(file.response.data.fileId).then(res => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功'
    //       });
    //     }).catch(e => {
    //       this.$message({
    //         showClose: true,
    //         message: e,
    //         type: 'error'
    //       });
    //     });
    //   }
    // },
    handleExceed() {
      this.$message.error('只能上传一个文件!');
    },
    // 编辑取消
    cancel() {
      this.uploded = false;
      this.$emit('sub-close-dialog-info', false);
      this.form['company_name'] = '';
      this.form['enterprise_abbreviation'] = '';
      this.fileList = [];
      if (this.subFormInfo && this.subFormInfo.proofUrl !== '') {
        this.subFormInfo.proofUrl = '';
      }
      if (this.subFormInfo.proofUrlName && this.subFormInfo.proofUrlName !== '') {
        this.subFormInfo.proofUrlName = '';
      }
      this.$refs['subEditImporInfo'].resetFields();
      this.$refs['subEditImporInfo'].clearValidate();
      // this.subFileList = [];
    },
    // 编辑确认
    confirm() {
      let enterNameParams = {
        "prop": "company_name",
        "value": this.form['company_name'],
        "proofUrl": this.form.proofUrl,
        "proofUrlName": this.form.proofUrlName ? this.form.proofUrlName : '',
        "auditResults": this.subFormInfo.auditResults,
        "oldContent": this.subFormInfo.oldContent
      };
      let enterAbbrName = {
        "prop": "enterprise_abbreviation",
        "value": this.form['enterprise_abbreviation'],
        "proofUrl": this.form.subProofUrl,
        "auditResults": this.subFormInfo.auditResults,
        "oldContent": this.subFormInfo.oldContent
      };
      this.$refs['subEditImporInfo'].validate((valid) => {
        if (valid) {
          if (!this.form['enterprise_abbreviation']) {
            this.$emit('sub-confirm-dialog-info', enterNameParams);
          } else {
            // 企业简称和企业简介同时修改的情况
            enterAbbrName['oldContent'] = this.subFormInfo['enterprise_abbreviation'];
            this.$emit('sub-confirm-dialog-info', enterNameParams, enterAbbrName);
          }
          this.fileList = [];
          // this.subFileList = [];
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
      this.$refs['subEditImporInfo'].clearValidate();
      this.$emit('sub-close-dialog-info', false);
    }
  },
  watch: {
    "subFormInfo": {
      handler(newVal) {
        // this.form = JSON.parse(JSON.stringify(newVal));
      },
      deep: true
    }
  }
};
</script>
