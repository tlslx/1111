/**
* @file 承运商-完善企业资料
* @author:zhangwenjian
* @date:2019/3/21
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">承运商完善企业资料</span></p>
    <el-form :rules="rules" :model="companyInfoForm" ref="companyInfoForm" label-position="right" label-width="110px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="企业名称:" size="small" class="item" prop="carrierName">
            <el-input :disabled="true"  type="text" maxlength="50" v-model.trim="companyInfoForm.carrierName" placeholder="请输入企业名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item  size="medium" label="公司省市:" style="display:inline-block;width: 250px;" prop="companyProvince">
            <el-select v-model="companyInfoForm.companyProvince" placeholder="请选择" style="width: 130px"  @change="provinceChange">
              <el-option v-for="(item,index) in provinceDatas" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  size="medium" label-width="0" style="display:inline-block;width: 130px;" prop="companyCity">
            <el-select v-model="companyInfoForm.companyCity" placeholder="请选择" style="width: 130px">
              <el-option v-for="(item,index) in cityDatas" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item class="item" label="法人代表:" prop="legalRepresent" size="small">
            <el-input type="text" maxlength="50" v-model.trim="companyInfoForm.legalRepresent" placeholder="请输入法人代表"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item class="item" label="详细地址:" prop="companyAddress" size="small">
            <el-input type="text" maxlength="50" v-model.trim="companyInfoForm.companyAddress" placeholder="请输入公司地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="业务联络人:" size="small" class="item" prop="contactName">
            <el-input type="text" maxlength="50" v-model.trim="companyInfoForm.contactName" placeholder="请输入联络人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="手机号:" size="small" class="item" prop="contactMobile">
            <el-input type="text" maxlength="50" v-model.trim="companyInfoForm.contactMobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="min-height: 120px">
        <el-col :span="10">
          <el-form-item label="营业执照:" size="mini" prop="businessLicense">
            <el-upload
              v-model="companyInfoForm.businessLicense"
              class="avatar-uploader"
              :headers="{
                 Token: this.$store.state.token
              }"
              :action="imgUploadApi"
              accept=".jpg,.jpeg,.png"
              :data="uploadImgData"
              :show-file-list="false"
              :on-success="businessLicenseSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
              <el-popover
                v-if="businessLicenseUrl"
                placement="right"
                width="370"
                trigger="hover">
                <img alt='' :src="businessLicenseUrl" style="width: 360px;height: 260px"/>
                <img alt='' slot="reference" :src="businessLicenseUrl" class="avatar"/>
              </el-popover>
              <i v-if="!businessLicenseUrl" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-form-item class="item" label-width="110px" label="业务范围:" size="small" prop="businessScope">
              <el-input type="text" maxlength="50" v-model.trim="companyInfoForm.businessScope" placeholder="请输入业务范围"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="其他附件:" size="mini">
              <el-upload
                class="upload-demo"
                :action="imgUploadApi"
                :on-success="handleAttachmentSuccess"
                :before-upload="beforeAttachmentUpload"
                :on-remove="handleAttachmentRemove"
                :on-error="uploadError"
                :data="uploadAttachment"
                :headers="{
                 Token: this.$store.state.token
              }"
                multiple
                :limit="5"
                :on-exceed="handleAttachmentExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">浏览</el-button>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>

      <el-row size="small" style="margin-top: 20px">
        <div style="margin-left: 200px">
          <el-button type="primary" @click="submitApplyData()">保存</el-button>
          <el-button type="primary" @click="resetForm()">重置</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "cmApplyLogisticsService",
      data() {
        const validateMobile = (rule, value, callback) => {
          let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
          if (!MOBILE.test(value)) {
            return callback(new Error("请输入正确的手机号码"));
          } else {
            return callback();
          }
        };
        const validateSpecial = (rule, value, callback) => {
          let regEn = /[`@#$%^&]/im;
          let regCn = /[#￥【】]/im;

          if (value == null || value === '') {
            return callback();
          }
          if (regEn.test(value) || regCn.test(value)) {
            return callback(new Error("输入不能包含特殊字符!"));
          } else {
            return callback();
          }
        };
        return {
          fileList: [],
          isUpdate: false,
          provinceDatas: [],
          cityDatas: [],
          companyCategory: [],

          businessLicenseUrl: '',

          uploadImgData: {
            code: 1
          },
          uploadAttachment: {
            code: 2
          },
          imgUploadApi: '',
          companyInfoForm: {
            carrierId: '',
            carrierName: '',
            companyProvince: '',
            companyCity: '',
            companyAddress: '',
            legalRepresent: '',
            contactName: '',
            businessLicense: '',
            contactMobile: '',
            businessScope: '',
            attachmentList: []
          },
          rules: {
            carrierName: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'change' }
            ],
            legalRepresent: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'change' }
            ],
            companyAddress: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'change' }
            ],
            contactName: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'change' }
            ],
            businessScope: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'change' }
            ],
            contactMobile: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateMobile, trigger: 'blur' }
            ],
            companyProvince: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            companyCity: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            businessLicense: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ]
          },
          baseApi: process.env.API_MB_URL,
          baseApi2: process.env.API_DICT_URL
        };
      },
      mounted() {
        this.imgUploadApi = this.baseApi + '/api/customservice/multiBusi/uploadFile';
        this.getCarrierInfo();
        this.getCompanyArea();
      },
      methods: {
        showImg(path) {
          if (path !== '' && path != null) {
            let url = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
            return url;
          } else {
            return '';
          }
        },
        resetForm() {
          this.getCarrierInfo();
        },
        // 企业地区字典信息获取
        getCompanyArea() {
          this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=province').then(data => {
            this.provinceDatas = data.records;
          }).catch(error => {
          });
        },
        // 获取企业类别
        getCompanyCategory() {
          this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=companyAttribute').then(data => {
            this.companyCategory = data.records;
          }).catch(err => {
          });
        },
        // 通过省份获取城市信息
        provinceChange(val) {
          this.companyInfoForm.companyCity = '';
          this.getCityData(val);
        },
        getCityData(dataDictItemId) {
          this.$http.get(this.baseApi2 + '/api/sysDataDictItem/getChildDicItemList?dataDictItemId=' + dataDictItemId).then(data => {
            this.cityDatas = data.records;
          }).catch(error => {
          });
        },
        // 表单数据提交
        submitApplyData() {
          this.$refs["companyInfoForm"].validate((valid) => {
            if (valid) {
              if (this.isUpdate) {
                this.sendAddRequest();
              } else {
                this.sendUpdateRequest();
              }
            }
          });
        },
        getCarrierInfo() {
          this.$http.get(this.baseApi + '/api/customservice/carrier/getCarrierByCurrentUser').then(res => {
            for (let item in this.companyInfoForm) {
              this.companyInfoForm[item] = res[item];
            }

            this.fileList = [];
            this.companyInfoForm.attachmentList = [];

            this.getCityData(res.companyProvince);
            if (res.businessLicense) {
              this.businessLicenseUrl = this.showImg(res.businessLicense);
            }

            for (let i = 0, length = res.attachmentList.length; i < length; i++) {
              let params = {
                name: res.attachmentList[i].fileName,
                url: res.attachmentList[i].filePath
              };
              let paramsMy = {
                fileName: res.attachmentList[i].fileName,
                filePath: res.attachmentList[i].filePath
              };
              this.companyInfoForm.attachmentList.push(paramsMy);
              this.fileList.push(params);
            }
          }).catch(error => {
            this.$message.error(error);
          });
        },
        // 完善企业信息
        sendAddRequest() {
          this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveCarrier', this.companyInfoForm).then(res => {
            this.$message.success("更新成功!");
            this.getCarrierInfo();
          }).catch(error => {
            this.$message.error(error);
          });
        },
        // 更新企业信息
        sendUpdateRequest() {
          this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveCarrier', this.companyInfoForm).then(res => {
            this.$message.success("更新成功!");
            this.getCarrierInfo();
          }).catch(error => {
            this.$message.error(error);
          });
        },
        cancelApply() {

        },
        // 照片上传
        uploadError() {
          this.$message.error("文件上传错误!");
        },
        beforeUpload(file) {
          return this.imageUploadFileType(file);
        },
        businessLicenseSuccess(res, file) {
          if (res.flag === '1') {
            this.businessLicenseUrl = this.showImg(res.data);
            this.companyInfoForm.businessLicense = res.data;
          } else {
            this.$message.error(res.message);
          }
        },
        // 附件材料上传
        handleAttachmentSuccess(res, file) {
          if (res.flag === '1') {
            let successfile = {
              fileName: file.name,
              filePath: res.data
            };
            this.companyInfoForm.attachmentList.push(successfile);
          } else {
            this.$message.error(res.message);
          }
        },
        beforeAttachmentUpload(file) {
          return this.uploadFileSize(file);
        },
        handleAttachmentRemove(file, fileList) {
          this.companyInfoForm.attachmentList = [];
          fileList.forEach((item, index) => {
            if (item.response) {
              // 测试
              let params = {
                fileName: item.name,
                filePath: item.response.data
              };
              this.companyInfoForm.attachmentList.push(params);
            } else {
              // 测试
              let params = {
                fileName: item.name,
                filePath: item.url
              };
              this.companyInfoForm.attachmentList.push(params);
            }
          });
        },
        handleAttachmentExceed() {
          this.$message.error('附件不能超过5个!');
        },
        // 图片大小及格式判断
        imageUploadFileType(file) {
          // 进行图片大小验证
          let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
          if (!testFileType) {
            this.$message.warning("上传的文件格式错误!");
            return false;
          }
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.warning("上传文件大小不能超过 2MB!");
            return false;
          }
          return true;
        },
        // 附件大小判断限制
        uploadFileSize(file) {
          const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isLt2M) {
            this.$message.warning("上传文件大小不能超过 5MB!");
            return false;
          }
          return true;
        }
      }
    };
</script>

<style scoped>
  .item {
    display: inline-block;
    width: 400px;
  }
  .container{
    margin: 10px;
  }
  .top_line{
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }
  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .dialog-footer{
    text-align: center;
    padding: 10px 0;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 110px;
    height: 110px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
  }
  .avatar {
    width: 110px;
    height: 110px;
    display: block;
  }
  .demo-ruleForm{
    margin-left: 40px;
  }
</style>
<style lang="scss" scoped>
  /deep/.el-input--mini .el-input__inner {
    height: 40px;
    line-height: 40px;
    width: 180px;
  }
  /deep/.el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--mini .el-input  .el-input__inner{
    height: 40px;
    line-height: 40px;
    width: 160px;
  }
  /deep/.el-select--small{
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-select--small   .el-input  .el-input__inner{
    height: 36px;
    line-height: 36px;
    width: 280px;
  }
  /deep/.el-pagination .el-select .el-input .el-input__inner{
    height: 28px;
    line-height: 28px;
    width: 100px;
  }
  /deep/.el-form-item--mini .el-form-item__label{
    line-height: 20px;
  }
  /deep/.el-form-item--small .el-form-item__label{
    line-height: 18px;
  }
  /deep/.el-form-item--mini{
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }
  /deep/.el-form-item--small{
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
  }
  /deep/.el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  /deep/.el-table__header tr,
  /deep/.el-table__header th {
    padding: 0;
    height: 42px;
  }
  /deep/.el-table__body tr,
  /deep/.el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
<style>
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
</style>
