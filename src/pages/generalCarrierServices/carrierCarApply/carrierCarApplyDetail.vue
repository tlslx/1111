/**
* @file  承运商-车证信息
* @author:zhangwenjian
* @date:2019/3/18
*/
<template>
    <div class="container">
      <p class="top_line"><span class="title">承运商车证申请信息</span></p>
      <el-form :model="ruleForm" label-width="100px" ref="ruleForm" style="width: 650px" :rules="rules">
        <el-form-item label="车证类型:" size="small" prop="cardType">
          <el-select v-model="ruleForm.cardType" placeholder="请选择" class="item" @change="cardTypeChange">
            <el-option label="筹展车证" value="0"></el-option>
            <el-option label="撤展车证" value="1"></el-option>
            <el-option label="叉车证" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数:" size="small" prop="exhibitionPeriod">
          <el-select v-model="ruleForm.exhibitionPeriod" placeholder="请选择" class="item">
            <el-option label="第一期" value="0"></el-option>
            <el-option label="第二期" value="1"></el-option>
            <el-option label="第三期" value="2"></el-option>
          </el-select>
        </el-form-item>
        <div style="display: flex;padding: 5px 0" v-for="(certificate, index) in ruleForm.cardbtnList">
          <el-row v-if="index === 0">
            <el-form-item label="车证信息:" size="small" :prop="`cardbtnList.${index}.plateNumber`" :rules="rules.cardType">
              <el-input :disabled="true" v-model.trim="certificate.plateNumber" placeholder="请输入车证信息" class="item" ></el-input>
              <el-button type="primary" style="margin-left: 25px" @click="openCarCertificateDialog(index)">车证信息</el-button>
              <el-button type="warning"  v-if="index === 0" @click="addCarCertificate()">+添加</el-button>
              <el-button type="warning" v-else @click="deleteCarCertificate(index)">- 删除</el-button>
            </el-form-item>
          </el-row>
          <el-row v-else>
            <div style="margin-left: 100px">
              <el-form-item  label-width="0" size="small" :prop="`cardbtnList.${index}.plateNumber`"  :rules="rules.cardType">
                <el-input :disabled="true" v-model.trim="certificate.plateNumber" placeholder="请输入车证信息" class="item" ></el-input>
                <el-button type="primary" style="margin-left: 25px" @click="openCarCertificateDialog(index)">车证信息</el-button>
                <el-button type="warning"  v-if="index === 0" @click="addCarCertificate()">+添加</el-button>
                <el-button type="warning" v-else @click="deleteCarCertificate(index)">- 删除</el-button>
              </el-form-item>
            </div>
          </el-row>
        </div>
        <el-form-item size="mini">
          <el-button type="primary" @click="submitApplyInfo()">提交</el-button>
          <el-button type="primary" @click="toApplyList()">取消</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="车证信息" width="880px" :visible.sync="carCertificateApplyDialog" :close-on-click-modal="false">
        <el-form :model="addCarCertificateForm" ref="addCarCertificateForm" :rules="rules" class="demo-form-inline" style="margin-right: 15px" label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="驾驶员姓名:" size="small" prop="driverName">
                <el-input type="text" maxlength="32" v-model.trim="addCarCertificateForm.driverName" placeholder="请输入驾驶员姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶员电话:" size="small" prop="driverPhone">
                <el-input type="text" maxlength="11" v-model.trim="addCarCertificateForm.driverPhone" placeholder="请输入驾驶员电话"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号码:" size="small" prop="driverIdCard">
                <el-input type="text" maxlength="18" v-model.trim="addCarCertificateForm.driverIdCard" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车牌号码:" size="small" prop="plateNumber">
                <el-input type="text" maxlength="32" v-model.trim="addCarCertificateForm.plateNumber" placeholder="请输入车牌号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="货车(车长):" size="small" prop="carLeader">
                <el-input maxlength="13" v-model.trim="addCarCertificateForm.carLeader" placeholder="请输入货车(车长)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车证时间:" size="small" prop="cardDate">
                <el-date-picker
                  v-model="addCarCertificateForm.cardDate"
                  type="date"
                  placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="行驶证照片:" prop="runLicenseImage">
                <el-upload
                  v-model="addCarCertificateForm.runLicenseImage"
                  class="avatar-uploader"
                  :headers="{
                    Token: this.$store.state.token
                  }"
                  :action="imgUploadApi"
                  accept=".jpg,.jpeg,.png"
                  :data="uploadImgData"
                  :show-file-list="false"
                  :on-error="uploadError"
                  :on-success="runLicenseImageSuccess"
                  :before-upload="beforeUpload">
                  <el-popover
                    v-if="runLicenseImageUrl"
                    placement="right"
                    width="370"
                    trigger="hover">
                    <img alt='' :src="runLicenseImageUrl" style="width: 360px;height: 260px"/>
                    <img alt='' slot="reference" :src="runLicenseImageUrl" class="avatar"/>
                  </el-popover>
                  <i v-if="!runLicenseImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶证照片:"  prop="driverLicenseImage">
                <el-upload
                  v-model="addCarCertificateForm.driverLicenseImage"
                  class="avatar-uploader"
                  :headers="{
                      Token: this.$store.state.token
                    }"
                  :action="imgUploadApi"
                  accept=".jpg,.jpeg,.png"
                  :data="uploadImgData"
                  :show-file-list="false"
                  :on-preview="handlePreview"
                  :on-success="driverLicenseImageSuccess"
                  :before-upload="beforeUpload">
                  <el-popover
                    v-if="driverLicenseImageUrl"
                    placement="left"
                    width="370"
                    trigger="hover">
                    <img alt='' :src="driverLicenseImageUrl" style="width: 360px;height: 260px"/>
                    <img alt='' slot="reference" :src="driverLicenseImageUrl" class="avatar"/>
                  </el-popover>
                  <i v-if="!driverLicenseImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="司机头像照片:"  prop="driverImage">
                <el-upload
                  v-model="addCarCertificateForm.driverImage"
                  class="avatar-uploader"
                  :headers="{
                      Token: this.$store.state.token
                    }"
                  :action="imgUploadApi"
                  accept=".jpg,.jpeg,.png"
                  :data="uploadImgData"
                  :show-file-list="false"
                  :on-preview="handlePreview"
                  :on-success="driverImageSuccess"
                  :before-upload="beforeUpload">
                  <el-popover
                    v-if="driverImageUrl"
                    placement="right"
                    width="370"
                    trigger="hover">
                    <img alt='' :src="driverImageUrl" style="width: 360px;height: 260px"/>
                    <img alt='' slot="reference" :src="driverImageUrl" class="avatar"/>
                  </el-popover>
                  <i v-if="!driverImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证照片:" prop="idCardImage">
                <el-upload
                  v-model="addCarCertificateForm.idCardImage"
                  class="avatar-uploader"
                  :headers="{
                      Token: this.$store.state.token
                    }"
                  :action="imgUploadApi"
                  accept=".jpg,.jpeg,.png"
                  :data="uploadImgData"
                  :show-file-list="false"
                  :on-preview="handlePreview"
                  :on-success="idCardImageSuccess"
                  :before-upload="beforeUpload">
                  <el-popover
                    v-if="idCardImageUrl"
                    placement="left"
                    width="370"
                    trigger="hover">
                    <img alt='' :src="idCardImageUrl" style="width: 360px;height: 260px"/>
                    <img alt='' slot="reference" :src="idCardImageUrl" class="avatar"/>
                  </el-popover>
                  <i v-if="!idCardImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                  <!--<img v-if="idCardImageUrl" :src="idCardImageUrl" class="avatar">-->
                  <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="车险照片:" prop="carInsuranceImage">
                <el-upload
                  v-model="addCarCertificateForm.carInsuranceImage"
                  class="avatar-uploader"
                  :headers="{
                      Token: this.$store.state.token
                    }"
                  :action="imgUploadApi"
                  accept=".jpg,.jpeg,.png"
                  :data="uploadImgData"
                  :show-file-list="false"
                  :on-preview="handlePreview"
                  :on-success="carInsuranceImageSuccess"
                  :before-upload="beforeUpload">
                  <el-popover
                    v-if="carInsuranceImageUrl"
                    placement="right"
                    width="370"
                    trigger="hover">
                    <img alt='' :src="carInsuranceImageUrl" style="width: 360px;height: 260px"/>
                    <img alt='' slot="reference" :src="carInsuranceImageUrl" class="avatar"/>
                  </el-popover>
                  <i v-if="!carInsuranceImageUrl" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="叉车:" size="small">
                <el-checkbox v-model="addCarCertificateForm.checked">备选项</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <div v-if="addCarCertificateForm.checked">
            <el-row>
              <el-col :span="12">
                <el-form-item label="出厂合格证:" ref="passCertificate" prop="passCertificate">
                  <el-upload
                    v-model="addCarCertificateForm.passCertificate"
                    class="avatar-uploader"
                    :headers="{
                      Token: this.$store.state.token
                    }"
                    :action="imgUploadApi"
                    accept=".jpg,.jpeg,.png"
                    :data="uploadImgData"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :on-success="passCertificateSuccess"
                    :before-upload="beforeUpload">
                    <el-popover
                      v-if="passCertificateUrl"
                      placement="right"
                      width="370"
                      trigger="hover">
                      <img alt='' :src="passCertificateUrl" style="width: 360px;height: 260px"/>
                      <img alt='' slot="reference" :src="passCertificateUrl" class="avatar"/>
                    </el-popover>
                    <i v-if="!passCertificateUrl" class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="特种使用登记证:" ref="registrationCertificate"  prop="registrationCertificate">
                  <el-upload
                    v-model="addCarCertificateForm.registrationCertificate"
                    class="avatar-uploader"
                    :headers="{
                      Token: this.$store.state.token
                    }"
                    :action="imgUploadApi"
                    accept=".jpg,.jpeg,.png"
                    :data="uploadImgData"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :on-success="registrationCertificateSuccess"
                    :before-upload="beforeUpload">
                    <el-popover
                      v-if="registrationCertificateUrl"
                      placement="left"
                      width="370"
                      trigger="hover">
                      <img alt='' :src="registrationCertificateUrl" style="width: 360px;height: 260px"/>
                      <img alt='' slot="reference" :src="registrationCertificateUrl" class="avatar"/>
                    </el-popover>
                    <i v-if="!registrationCertificateUrl" class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="检验报告和检验合格标记:" ref="testReport"  prop="testReport">
                  <el-upload
                    v-model="addCarCertificateForm.testReport"
                    class="avatar-uploader"
                    :headers="{
                      Token: this.$store.state.token
                    }"
                    :action="imgUploadApi"
                    accept=".jpg,.jpeg,.png"
                    :data="uploadImgData"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :on-success="testReportSuccess"
                    :before-upload="beforeUpload">
                    <el-popover
                      v-if="testReportUrl"
                      placement="right"
                      width="370"
                      trigger="hover">
                      <img alt='' :src="testReportUrl" style="width: 360px;height: 260px"/>
                      <img alt='' slot="reference" :src="testReportUrl" class="avatar"/>
                    </el-popover>
                    <i v-if="!testReportUrl" class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="特种作业人员证:" ref="operationCard" prop="operationCard">
                  <el-upload
                    v-model="addCarCertificateForm.operationCard"
                    class="avatar-uploader"
                    :headers="{
                      Token: this.$store.state.token
                    }"
                    :action="imgUploadApi"
                    accept=".jpg,.jpeg,.png"
                    :data="uploadImgData"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :on-success="operationCardSuccess"
                    :before-upload="beforeUpload">
                    <el-popover
                      v-if="operationCardUrl"
                      placement="left"
                      width="370"
                      trigger="hover">
                      <img alt='' :src="operationCardUrl" style="width: 360px;height: 260px"/>
                      <img alt='' slot="reference" :src="operationCardUrl" class="avatar"/>
                    </el-popover>
                    <i v-if="!operationCardUrl" class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="保险:" ref="insurance" prop="insurance">
                  <el-upload
                    v-model="addCarCertificateForm.insurance"
                    class="avatar-uploader"
                    :headers="{
                      Token: this.$store.state.token
                    }"
                    :action="imgUploadApi"
                    accept=".jpg,.jpeg,.png"
                    :data="uploadImgData"
                    :show-file-list="false"
                    :on-preview="handlePreview"
                    :on-success="insuranceSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeUpload">
                    <el-popover
                      v-if="insuranceUrl"
                      placement="right"
                      width="370"
                      trigger="hover">
                      <img alt='' :src="insuranceUrl" style="width: 360px;height: 260px"/>
                      <img alt='' slot="reference" :src="insuranceUrl" class="avatar"/>
                    </el-popover>
                    <i v-if="!insuranceUrl" class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
              </el-col>
            </el-row>
          </div>
          <div style="margin: 0 35px">
            <span style="color: red">*提示：</span>行驶证、驾驶证（正、副本）复印在同一张A4纸上并加盖公章，司机照片提供两寸蓝底或底白40mm*50mm电子版照片
          </div>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" @click="confirmCarCtfPush()">确认</el-button>
          <el-button type="primary" @click="carCertificateApplyDialog = false">取消</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "carrierCarApplyDetail",
      data() {
        const validateIdCard = (rule, value, callback) => {
          let IDCARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (!IDCARD.test(value)) {
            return callback(new Error("请输入正确的身份证号码"));
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
        const validateMobile = (rule, value, callback) => {
          let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
          if (!MOBILE.test(value)) {
            return callback(new Error("请输入正确的手机号码"));
          } else {
            return callback();
          }
        };
        const validateNumber = (rule, value, callback) => {
          let MOBILE = /^[0-9]\d*$/;
          if (!MOBILE.test(value)) {
            return callback(new Error("请输入大于0的整数"));
          } else {
            return callback();
          }
        };
        // // 车牌校验  粤A.1234
        // const validatePlateNumber = (rule, value, callback) => {
        //   let xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
        //   let creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
        //   if (vehicleNumber.length === 7) {
        //     return creg.test(vehicleNumber);
        //   } else if (vehicleNumber.length === 8) {
        //     return xreg.test(vehicleNumber);
        //   } else {
        //     return false;
        //   }
        // };
        return {
          carCertificateApplyDialog: false,
          dialogVisible: false,
          dialogImageUrl: '',
          imgUploadApi: '',

          driverLicenseImageUrl: '',
          runLicenseImageUrl: '',
          driverImageUrl: '',
          idCardImageUrl: '',
          carInsuranceImageUrl: '',
          vehicleCardId: '',
          isAdd: true,

          passCertificateUrl: '',
          registrationCertificateUrl: '',
          testReportUrl: '',
          operationCardUrl: '',
          insuranceUrl: '',
          uploadImgData: {
            code: 1
          },

          currentEditIndex: 0,
          cardDetailList: [

          ],
          ruleForm: {
            vehicleCardId: '',
            exhibitionSession: '125',
            exhibitionPeriod: '',
            cardType: '',
            cardDetailList: [],
            cardbtnList: [
              {
                plateNumber: ''
              }
            ]
          },
          addCarCertificateForm: {
            driverName: '',
            driverPhone: '',
            driverIdCard: '',
            plateNumber: '',
            carLeader: '',
            driverLicenseImage: '',
            runLicenseImage: '',
            idCardImage: '',
            driverImage: '',
            cardDate: '',
            carInsuranceImage: '',
            passCertificate: '',
            registrationCertificate: '',
            testReport: '',
            operationCard: '',
            insurance: '',
            checked: false
          },
          fileList: [],
          rules: {
            cardType: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            cardDate: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            exhibitionPeriod: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            driverName: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateSpecial, trigger: 'change' }
            ],
            driverPhone: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateMobile, trigger: 'blur' }
            ],
            driverIdCard: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateIdCard, trigger: 'blur' }
            ],
            plateNumber: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            carLeader: [
              { required: true, message: '不能为空', trigger: 'blur' },
              { validator: validateNumber, trigger: 'blur' }
            ],
            idCardImage: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            runLicenseImage: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            driverLicenseImage: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            driverImage: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            carInsuranceImage: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ]
          },
          dynamicRules: {
            passCertificate: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            registrationCertificate: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            testReport: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            operationCard: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            insurance: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ]
          },
          baseApi: process.env.API_MB_URL
        };
      },
      mounted() {
        this.imgUploadApi = this.baseApi + '/api/customservice/multiBusi/uploadFile';
        this.vehicleCardId = this.$route.query.vehicleCardId;
        if (this.vehicleCardId) {
          this.isAdd = false;
          this.getDetailById(this.vehicleCardId);
        } else {
          this.isAdd = true;
        }
      },
      methods: {
        /*
          车证申请信息提交
        */
        submitApplyInfo() {
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
              if (this.isAdd) {
                this.addRequest();
              } else {
                this.updateRequest();
              }
            }
          });
        },
        addRequest() {
          this.$http.postJson(this.baseApi + '/api/customservice/carrier/saveVehicleCard', this.ruleForm).then(res => {
            this.$message.success("新增成功!");
            this.$router.push({ path: '/carrierCarApplyList' });
          }).catch(error => {
            this.$message.error(error);
          });
        },
        updateRequest() {
          this.$http.postJson(this.baseApi + '/api/customservice/carrier/updateVehicleCard', this.ruleForm).then(res => {
            this.$message.success("更新成功!");
            this.$router.push({ path: '/carrierCarApplyList' });
          }).catch(error => {
            this.$message.error(error);
          });
        },
        getDetailById(vehicleCardId) {
          this.$http.get(this.baseApi + '/api/customservice/carrier/adminGetVehicleCard', { vehicleCardId: vehicleCardId }).then(res => {
            this.ruleForm.cardDetailList = res.cardDetailList;
            this.ruleForm.cardType = res.cardType;
            this.ruleForm.exhibitionPeriod = res.exhibitionPeriod;
            this.ruleForm.exhibitionSession = res.exhibitionSession;
            this.ruleForm.vehicleCardId = res.vehicleCardId;

            this.ruleForm.cardbtnList = [];
            for (let i = 0, length = res.cardDetailList.length; i < length; i++) {
              let current = i + 1;
              let params = { plateNumber: "车证" + current + ' ' + res.cardDetailList[i].plateNumber };
              this.ruleForm.cardbtnList.push(params);
            }
          }).catch(error => {
            this.$message.error(error);
          });
        },
        showImg(path) {
          if (path !== '' && path != null) {
            let url = this.baseApi + "/api/customservice/multiBusi/viewImage/" + path;
            return url;
          } else {
            return '';
          }
        },
        // 返回车证申请列表
        toApplyList() {
          this.$router.push({ path: '/carrierCarApplyList' });
        },
        // 打开车证申请详情弹框
        openCarCertificateDialog(index) {
          if (this.$refs.addCarCertificateForm !== undefined) {
            this.$refs.addCarCertificateForm.resetFields();
          }
          this.resetCarCtfForm();
          this.currentEditIndex = index;
          if (this.ruleForm.cardDetailList.length >= index + 1) {
            this.initCtfFormData(this.ruleForm.cardDetailList[index]);
          }
          this.carCertificateApplyDialog = true;
        },
        // 添加车证申请详情信息
        addCarCertificate() {
          let param = { plateNumber: '' };
          this.ruleForm.cardbtnList.push(param);
        },
        deleteCarCertificate(index) {
          this.ruleForm.cardbtnList.splice(index, 1);
          this.ruleForm.cardDetailList.splice(index, 1);
        },
        confirmCarCtfPush() {
          this.$refs["addCarCertificateForm"].validate((valid) => {
            if (valid) {
              let current = this.currentEditIndex + 1;
              let params = {};
              for (let item in this.addCarCertificateForm) {
                params[item] = this.addCarCertificateForm[item];
              }
              if (this.currentEditIndex <= this.ruleForm.cardDetailList.length - 1) {
                this.ruleForm.cardDetailList.splice(this.currentEditIndex, 1, params);
                this.ruleForm.cardbtnList[this.currentEditIndex].plateNumber = "车证" + current + ' ' + this.addCarCertificateForm.plateNumber;
              } else {
                this.ruleForm.cardDetailList.push(params);
                this.ruleForm.cardbtnList[this.currentEditIndex].plateNumber = "车证" + current + ' ' + this.addCarCertificateForm.plateNumber;
              }
              this.carCertificateApplyDialog = false;
            }
          });
        },
        resetCarCtfForm() {
          for (let item in this.addCarCertificateForm) {
            if (item !== 'checked') {
              this.addCarCertificateForm[item] = '';
            }
          }
          if (this.ruleForm.cardType === '2' || this.ruleForm.cardType === 2) {
            this.addCarCertificateForm.checked = true;
          }
          this.runLicenseImageUrl = '';
          this.driverLicenseImageUrl = '';
          this.driverImageUrl = '';
          this.idCardImageUrl = '';
          this.carInsuranceImageUrl = '';
          this.passCertificateUrl = '';
          this.registrationCertificateUrl = '';
          this.testReportUrl = '';
          this.operationCardUrl = '';
          this.insuranceUrl = '';
        },
        initCtfFormData(data) {
          for (let item in this.addCarCertificateForm) {
            if (item !== 'checked') {
              this.addCarCertificateForm[item] = data[item];
            }
          }
          if (this.ruleForm.cardType === '2' || this.ruleForm.cardType === 2) {
            this.addCarCertificateForm.checked = true;
          }
          this.runLicenseImageUrl = this.showImg(this.addCarCertificateForm.runLicenseImage);
          this.driverLicenseImageUrl = this.showImg(this.addCarCertificateForm.driverLicenseImage);
          this.driverImageUrl = this.showImg(this.addCarCertificateForm.driverImage);
          this.idCardImageUrl = this.showImg(this.addCarCertificateForm.idCardImage);
          this.carInsuranceImageUrl = this.showImg(this.addCarCertificateForm.carInsuranceImage);
          this.passCertificateUrl = this.showImg(this.addCarCertificateForm.passCertificate);
          this.registrationCertificateUrl = this.showImg(this.addCarCertificateForm.registrationCertificate);
          this.testReportUrl = this.showImg(this.addCarCertificateForm.testReport);
          this.operationCardUrl = this.showImg(this.addCarCertificateForm.operationCard);
          this.insuranceUrl = this.showImg(this.addCarCertificateForm.insurance);
        },
        /*
          文件上传
        */
        beforeUpload(file) {
          return this.imageUploadFileType(file);
        },
        uploadError() {
          this.$message.error("图片上传错误!");
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
        // 行驶证照片
        runLicenseImageSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.runLicenseImage = res.data;
            this.runLicenseImageUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 驾驶证照片
        driverLicenseImageSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.driverLicenseImage = res.data;
            this.driverLicenseImageUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        //  司机头像照片
        driverImageSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.driverImage = res.data;
            this.driverImageUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 身份证照片
        idCardImageSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.idCardImage = res.data;
            this.idCardImageUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 车险照片
        carInsuranceImageSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.carInsuranceImage = res.data;
            this.carInsuranceImageUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        /*
          叉车部分证件
         */
        // 出厂合格证
        passCertificateSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.passCertificate = res.data;
            this.passCertificateUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 特种使用登记证
        registrationCertificateSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.registrationCertificate = res.data;
            this.registrationCertificateUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 检验报告和检验合格标记
        testReportSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.testReport = res.data;
            this.testReportUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 特种作业人员证
        operationCardSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.operationCard = res.data;
            this.operationCardUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        // 保险
        insuranceSuccess(res, file) {
          if (res.flag === '1') {
            this.addCarCertificateForm.insurance = res.data;
            this.insuranceUrl = this.showImg(res.data);
          } else {
            this.$message.error(res.message);
          }
        },
        handlePreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        cardTypeChange(val) {
          if (val === '2' || val === 2) {
            this.addCarCertificateForm.checked = true;
          } else {
            this.addCarCertificateForm.checked = false;
          }
        }
      },
      // 监听属性变化
      watch: {
        "addCarCertificateForm.checked": function(val, oldVal) {
          if (val === true) {
            for (let item in this.dynamicRules) {
              this.rules[item] = this.dynamicRules[item];
            }
          } else {
            for (let item in this.dynamicRules) {
              this.rules[item] = [];
            }
            if (this.$refs.passCertificate !== undefined) {
              this.$refs.passCertificate.clearValidate();
            }
            if (this.$refs.registrationCertificate !== undefined) {
              this.$refs.registrationCertificate.clearValidate();
            }
            if (this.$refs.testReport !== undefined) {
              this.$refs.testReport.clearValidate();
            }
            if (this.$refs.operationCard !== undefined) {
              this.$refs.operationCard.clearValidate();
            }
            if (this.$refs.insurance !== undefined) {
              this.$refs.insurance.clearValidate();
            }
          }
        }
      }
    };
</script>

<style scoped>
  .container {
    padding: 10px 10px 10px 20px;
  }

  .top_line {
    border-bottom: 1px solid #cdcdcd;
  }

  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 90px;
    height: 90px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }

  .item{
    width: 260px;
  }
  .dialog-footer {
    text-align: center;
    padding: 20px 0;
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
