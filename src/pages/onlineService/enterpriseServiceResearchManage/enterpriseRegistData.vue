/**
 * @file 企业登记办证人员资料
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
  .enterprise-register-ruleForm {
    position: relative;
    left: 30%;
  }
  .enterprise-regist-data {
    width: 100%;
    text-align: center;
  }
  .upload-info-container >>> .el-form-item__content {
    width: 280px;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="登记办证人员资料" name="first">
      <div style="padding: 20px 0;" v-loading="loading">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="200px"
          class="enterprise-register-ruleForm">
          <el-form-item label="企业名称：" prop="enterpriceName" :rules="[{ required: true, message: '企业名称不可为空' }]">
            <el-input v-model="ruleForm.enterpriceName" placeholder="企业名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名：" prop="userName" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
            <el-input v-model="ruleForm.userName" placeholder="姓名" maxlength="64" :disabled="this.$route.query.pattern === 'select'"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sexTypeCode" :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]">
            <el-radio-group v-model="ruleForm.sexTypeCode" :disabled="this.$route.query.pattern === 'select'">
              <el-radio v-for="item in osSex" :key="item.key" :label="item.label" :value="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证件类型：" prop="idcardTypeCode" :rules="[{ required: true, message: '请选择身份证件类型', trigger: 'change' }]">
            <el-select v-model="ruleForm.idcardTypeCode" :disabled="this.$route.query.pattern === 'select'" placeholder="请选择">
              <el-option v-for="item in idcardTypeCodes" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="idcardNo" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' }, { pattern: kindo.validate.pattern.idCard, message: '请输入合法的证件号码', trigger: 'blur' }]">
            <el-input v-model="ruleForm.idcardNo" :disabled="this.$route.query.pattern === 'select'" placeholder="证件号码" maxlength="64"></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="cellPhone" :rules="[{ pattern: this.$store.state.common.CHECK_CONST_DATA.telephone, message: '请输入正确的手机号码', trigger: 'change' }]">
            <el-input v-model="ruleForm.cellPhone" :disabled="this.$route.query.pattern === 'select'" placeholder="手机" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="E-Mail：" prop="email" :rules="[{ type: 'email', message: '请输入正确的邮箱', trigger: 'change' }]">
            <el-input v-model="ruleForm.email" :disabled="this.$route.query.pattern === 'select'" placeholder="E-Mail"></el-input>
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
          <el-form-item class="upload-info-container" label="身份证照片(反面)：" prop="idcardBackPhotoUrl" ref="idcardBackPhotoUrl" :rules="[{ required: true, message: '请上传身份证照片(反面)', trigger: 'change' }]">
            <img v-if="this.$route.query.pattern === 'select'" :src="ruleForm.idcardBackPhotoUrl" alt="头像照片" @click="toBoost(ruleForm.idcardBackPhotoUrl)">
            <el-upload
              v-else
              class="upload-avator-info"
              :action="api.uploadUrl + ''"
              list-type="picture"
              :on-preview="handlePreview"
              :on-remove="(file, fileList) => handleRemove(file, fileList, 'idcardBackPhotoUrl')"
              :before-remove="beforeRemove"
              :on-success="(response, file, fileList) => uploadSuccessfully(response, file, fileList, 'idcardBackPhotoUrl')"
              :on-exceed="handleExceed"
              :limit="fileLimit"
              :file-list="idcardBackPhotoUrlFileList">
              <el-button type="primary" size="mini">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="upload-info-container" label="工作证照片：" prop="busiCardFileId" ref="busiCardFileId" :rules="[{ required: true, message: '请上传工作证照片', trigger: 'change' }]">
            <img v-if="this.$route.query.pattern === 'select'" :src="ruleForm.busiCardFileId" alt="头像照片" @click="toBoost(ruleForm.busiCardFileId)">
            <el-upload
              v-else
              class="upload-busicard-info"
              :action="api.uploadUrl + ''"
              list-type="picture"
              :on-preview="handlePreview"
              :on-remove="(file, fileList) => handleRemove(file, fileList, 'busiCardFileId')"
              :before-remove="beforeRemove"
              :on-success="(response, file, fileList) => uploadSuccessfully(response, file, fileList, 'busiCardFileId')"
              :on-exceed="handleExceed"
              :limit="fileLimit"
              :file-list="busiCardFileIdFileList">
              <el-button type="primary" size="mini">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input type="textarea" placeholder="备注" :autosize="{ minRows: 10 }" v-model="ruleForm.remark" :disabled="this.$route.query.pattern === 'select'" maxlength="255"></el-input>
          </el-form-item>
        </el-form>
        <div class="enterprise-regist-data">
          <el-button v-if="this.$route.query.pattern !== 'select'" type="primary" @click="submitForm()">提交</el-button>
          <el-button type="info" @click="cancle()">返回</el-button>
        </div>
        <el-dialog title="图片预览" :visible.sync="dialogVisible">
          <img :src="imgSrcBig" width="100%">
        </el-dialog>
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
      loading: false,
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
      // 身份证照片正面
      idcardFrontPhotoUrlFileList: [],
      // 身份证照片反面
      idcardBackPhotoUrlFileList: [],
      // 工作证照片
      busiCardFileIdFileList: [],
      // 性别字典
      osSex: [],
      // 身份证件类型
      idcardTypeCodes: [],
      ruleForm: {
        enterpriceCode: "",
        enterpriceName: "",
        userName: "",
        sexTypeCode: "",
        idcardTypeCode: "",
        idcardNo: "",
        cellPhone: "",
        email: "",
        badgePhotoUrl: "",
        idcardFrontPhotoUrl: "",
        idcardBackPhotoUrl: "",
        busiCardFileId: "",
        remark: ""
      }
    };
  },
  created() {
    this.getDictionaryData();
    this.getBasicInfo(this.companyId).then(res => {
      this.ruleForm.enterpriceName = res.companyName;
      this.ruleForm.enterpriceCode = res.companyId;
    }).then(() => {
      if (this.$route.query.pattern === 'select' || this.$route.query.pattern === 'edit') {
        for (let key in this.ruleForm) {
          for (let editKey in this.$route.query.data) {
            if (key === editKey) {
              this.$set(this.ruleForm, key, this.$route.query.data[editKey]);
            }
          }
        }
      }
      if (this.$route.query.pattern === 'edit' && this.$route.query.data) { // 编辑处理
        this.ruleForm.userId = this.$route.query.data.userId;
        if (this.ruleForm.badgePhotoUrl && this.ruleForm.badgePhotoUrl !== '') {
          this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.ruleForm.badgePhotoUrl).then(res => {
            this.badgePhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.badgePhotoUrl, fileId: this.ruleForm.badgePhotoUrl }];
          });
        }
        if (this.ruleForm.idcardFrontPhotoUrl && this.ruleForm.idcardFrontPhotoUrl !== '') {
          this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.ruleForm.idcardFrontPhotoUrl).then(res => {
            this.idcardFrontPhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.idcardFrontPhotoUrl, fileId: this.ruleForm.idcardFrontPhotoUrl }];
          });
        }
        if (this.ruleForm.idcardBackPhotoUrl && this.ruleForm.idcardBackPhotoUrl !== '') {
          this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.ruleForm.idcardBackPhotoUrl).then(res => {
            this.idcardBackPhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.idcardBackPhotoUrl, fileId: this.ruleForm.idcardBackPhotoUrl }];
          });
        }
        if (this.ruleForm.busiCardFileId && this.ruleForm.busiCardFileId !== '') {
          this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.ruleForm.busiCardFileId).then(res => {
            this.busiCardFileIdFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.busiCardFileId, fileId: this.ruleForm.busiCardFileId }];
          });
        }
      } else if (this.$route.query.pattern === 'select' && this.$route.query.data) { // 查看处理
        if (this.ruleForm.badgePhotoUrl && this.ruleForm.badgePhotoUrl !== '') {
          this.ruleForm.badgePhotoUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.badgePhotoUrl;
        }
        if (this.ruleForm.idcardFrontPhotoUrl && this.ruleForm.idcardFrontPhotoUrl !== '') {
          this.ruleForm.idcardFrontPhotoUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.idcardFrontPhotoUrl;
        }
        if (this.ruleForm.idcardBackPhotoUrl && this.ruleForm.idcardBackPhotoUrl !== '') {
          this.ruleForm.idcardBackPhotoUrl = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.idcardBackPhotoUrl;
        }
        if (this.ruleForm.busiCardFileId && this.ruleForm.busiCardFileId !== '') {
          this.ruleForm.busiCardFileId = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.ruleForm.busiCardFileId;
        }
      }
    });
  },
  methods: {
    ...mapActions('file', ['delFileInfo']),
    ...mapActions('corpDataManagement', ['getBasicInfo']),
    ...mapActions('enterApplyExhibitCertiInfo', ['addUserDocInfo', 'editUserDocInfo']),
    // 获取字典信息
    async getDictionaryData() {
      let [osSex, idcardTypeCodes] = await Promise.all([
        // 获取性别字典
        kindo.dictionary.get('gender'),
        // 身份证件类型
        kindo.dictionary.get('identityType')
      ]);
      // 获取性别字典
      this.osSex = osSex;
      // 获取身份类型字典
      this.idcardTypeCodes = idcardTypeCodes;
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
        this.$message({
          type: 'success',
          message: '删除成功'
        });
        this.ruleForm[prop] = '';
      }).catch(e => {
      });
    },
    // 删除文件前的回调
    beforeRemove(file, fileList) {
      return this.$confirm('确定移除？');
    },
    // 提交表单
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
          // this.loading = true;
          if (this.$route.query.pattern === 'edit') {
            this.editUserDocInfo(params).then(res => {
              this.loading = false;
              this.$message({
                type: 'success',
                message: '修改成功'
              });
              this.$router.push({
                path: '/certificateHandlingInfoList'
              });
            }).catch(e => {
              this.loading = false;
            });
          } else {
            this.addUserDocInfo(params).then(res => {
              this.loading = false;
              this.$message({
                type: 'success',
                message: '录入成功'
              });
              this.$router.push({
                path: '/certificateHandlingInfoList'
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
            message: '申请人员资料信息验证未通过',
            type: 'error'
          });
        }
      });
    },
    // 取消提交
    cancle() {
      this.$router.push({
        path: '/certificateHandlingInfoList'
      });
    }
  }
};
</script>



