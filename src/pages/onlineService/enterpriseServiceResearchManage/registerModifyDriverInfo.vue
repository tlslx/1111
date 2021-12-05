/**
 * @file 登记或修改司机人员信息
 * @author: llluj
 */
<style scoped>
  .el-input {
    width: 280px;
  }
  .el-textarea {
    width: 280px;
  }
  .el-select {
    width: 280px;
  }
  .driver-info-ruleForm {
    position: relative;
    left: 30%;
  }
  .driver-info-btns {
    width: 100%;
    text-align: center;
  }
  .upload-info-container >>> .el-form-item__content {
    width: 280px;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="填写司机人员资料" name="first">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="200px"
        class="driver-info-ruleForm">
        <el-form-item label="企业名称：" prop="enterpriceName" :rules="[{ required: true, message: '企业名称不可为空' }]">
          <el-input v-model="ruleForm.enterpriceName" placeholder="企业名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="driverName" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
          <el-input v-model="ruleForm.driverName" placeholder="姓名" maxlength="64"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sexTypeCode" :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]">
          <el-radio-group v-model="ruleForm.sexTypeCode">
            <el-radio v-for="item in osSex" :key="item.key" :label="item.label" :value="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="idcardNo" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' }, { pattern: kindo.validate.pattern.idCard, message: '请输入合法的证件号码', trigger: 'blur' }]">
          <el-input v-model="ruleForm.idcardNo" placeholder="证件号码" maxlength="64"></el-input>
        </el-form-item>
        <el-form-item class="upload-info-container" label="头像照片：" prop="badgePhotoUrl" ref="badgePhotoUrl" :rules="[{ required: true, message: '请上传头像照片', trigger: 'change' }]">
          <img v-if="this.$route.query.pattern === 'select'" :src="ruleForm.badgePhotoUrl" alt="头像照片" @click="toBoost(ruleForm.badgePhotoUrl)">
          <el-upload
            v-else
            class="upload-avator-info"
            :action="api.uploadUrl + ''"
            list-type="picture"
            :on-preview="handlePreview"
            :on-remove="(file, fileList) => handleRemove(file, fileList, 'badgePhotoUrl')"
            :before-remove="beforeRemove"
            :on-success="(response, file, fileList) => uploadSuccessfully(response, file, fileList, 'badgePhotoUrl')"
            :on-exceed="handleExceed"
            :limit="fileLimit"
            :file-list="badgePhotoUrlFileList">
            <el-button type="primary" size="mini">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item class="upload-info-container" label="身份证照片(正面)：" prop="idcardFrontPhotoUrl" ref="idcardFrontPhotoUrl" :rules="[{ required: true, message: '请上传身份证照片(正面)', trigger: 'change' }]">
          <img v-if="this.$route.query.pattern === 'select'" :src="ruleForm.idcardFrontPhotoUrl" alt="头像照片" @click="toBoost(ruleForm.idcardFrontPhotoUrl)">
          <el-upload
            v-else
            class="upload-idcard-info"
            :action="api.uploadUrl + ''"
            list-type="picture"
            :on-preview="handlePreview"
            :on-remove="(file, fileList) => handleRemove(file, fileList, 'idcardFrontPhotoUrl')"
            :before-remove="beforeRemove"
            :on-success="(response, file, fileList) => uploadSuccessfully(response, file, fileList, 'idcardFrontPhotoUrl')"
            :on-exceed="handleExceed"
            :limit="fileLimit"
            :file-list="idcardFrontPhotoUrlFileList">
            <el-button type="primary" size="mini">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-dialog title="图片预览" :visible.sync="dialogVisible">
          <img :src="imgSrcBig" width="100%">
        </el-dialog>
      </el-form>
      <div class="driver-info-btns">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button type="info" @click="back('ruleForm')">返回</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      activeName: "first",
      // 性别字典
      osSex: [],
      api: {
        uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile' // 上传文件地址
      },
      companyId: this.$store.state.userInfo.companyId,
      // 文件限制
      fileLimit: 1,
      // 预览窗口隐藏与显示
      dialogVisible: false,
      // 预览图片路径
      imgSrcBig: '',
      // 头像照片图片集合
      badgePhotoUrlFileList: [],
      badgePhotoUrlSub: [],
      // 身份证照片正面
      idcardFrontPhotoUrlFileList: [],
      idcardFrontPhotoUrlSub: [],
      subTables: [],
      fileObj: {
        "attachType": "",
        "attachSize": "",
        "fileId": "",
        "attachName": "",
        "fileType": ""
      },
      ruleForm: {
        enterpriceName: "",
        driverName: "",
        sexTypeCode: "",
        idcardNo: "",
        badgePhotoUrl: "",
        idcardFrontPhotoUrl: ""
      }
    };
  },
  created() {
    this.getBasicInfo(this.companyId).then(res => {
      this.ruleForm.enterpriceName = res.companyName;
      this.ruleForm.enterpriceCode = res.companyId;
    });
    this.getDictionaryData();
  },
  methods: {
    ...mapActions('file', ['delFileInfo']),
    ...mapActions('corpDataManagement', ['getBasicInfo']),
    ...mapActions('enterApplyCardInfo', ['addDriverInfo', 'editDriverInfo']),
    // 获取字典信息
    async getDictionaryData() {
      let [osSex] = await Promise.all([
        // 获取性别字典
        kindo.dictionary.get('gender')
      ]);
      // 获取性别字典
      this.osSex = osSex;
    },
    // 编辑模式下预览大图
    toBoost(url) {
      this.imgSrcBig = url;
      this.dialogVisible = true;
    },
    // 文件预览
    handlePreview(file) {
      this.companyLogoIdInfo.dialogImageUrl = file.url;
      this.companyLogoIdInfo.dialogVisible = true;
    },
    // 文件超出个数限制时的钩子
    handleExceed() {
      this.$message.error('只能上传一张图片!');
    },
    // 上传文件成功的回调
    uploadSuccessfully(response, file, fileList, prop) {
      if (response.data && response.data.fileId) {
        this.ruleForm[prop] = response.data.fileId;
        this[prop + 'Sub'] = [{
          attachType: prop === 'badgePhotoUrl' ? 'HEADER' : 'ID_CARD_FRONT',
          attachSize: file.size,
          fileId: response.data.fileId,
          attachName: response.data.fileName,
          fileType: response.data.fileType
        }];
        this.$refs[prop].clearValidate();
      } else {
        this[prop + 'FileList'] = [];
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        });
      }
    },
    // 删除文件
    handleRemove(file, fileList, prop) {
      if (this.$route.query.pattern === 'edit') {
        if (file.fileId && file.fileId !== '') {
          this.delFile(file.fileId, prop);
        }
      } else if (file.response && file.response.data && file.response.data.fileId) {
        this.delFile(file.response.data.fileId, prop);
      }
    },
    // 删除文件方法
    delFile(fileId, prop) {
      this.delFileInfo(fileId).then(res => {
        this[prop + 'Sub'] = [];
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        this.ruleForm[prop] = '';
        if (this.fileTable.length > 0) {
          this.fileTable.forEach((value, index) => {
            if (value.fileId === fileId) {
              this.fileTable.splice(index, 1);
            }
          });
        }
      }).catch(e => {
      });
    },
    // 删除文件前的回调
    beforeRemove(file, fileList) {
      return this.$confirm('确定移除？');
    },
    // 表单提交
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let params = JSON.parse(JSON.stringify(this.ruleForm));
          // 处理性别
          if (params.sexTypeCode === '男') {
            params.sexTypeCode = '1';
          } else {
            params.sexTypeCode = '2';
          }
          if (this.$route.query.pattern === 'edit') {
            this.editDriverInfo(params).then(res => {
              this.loading = false;
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.$router.push({
                path: '/driverInforList'
              });
            }).catch(e => {
              this.loading = false;
            });
          } else {
            let currentParam = {};
            currentParam.formData = params;
            currentParam.formData.creatorName = this.$store.state.userInfo.data.userName;
            currentParam.subTables = [this.badgePhotoUrlSub[0], this.idcardFrontPhotoUrlSub[0]];
            this.addDriverInfo(currentParam).then(res => {
              this.loading = false;
              this.$message({
                type: 'success',
                message: '录入成功'
              });
              this.$router.push({
                path: '/driverInforList'
              });
            }).catch(e => {
              this.loading = false;
            });
          }
        } else {
          setTimeout(() => {
            let isError = document.getElementsByClassName("is-error");
            if (isError[0] && isError[0] && isError[0].querySelector('input')) {
              isError[0].querySelector('input').focus();
            }
            if (isError[0] && isError[0] && isError[0].querySelector('select')) {
              isError[0].querySelector('select').change();
            }
            if (isError[0] && isError[0] && isError[0].querySelector('radio')) {
              isError[0].querySelector('radio').change();
            }
          }, 1);
          this.$message({
            showClose: true,
            message: '司机人员信息验证未通过',
            type: 'error'
          });
        }
      });
    },
    // 返回
    back() {
      this.$router.push({
        path: '/driverInforList'
      });
    }
  }
};
</script>



