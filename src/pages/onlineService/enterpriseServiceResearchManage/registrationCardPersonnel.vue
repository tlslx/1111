/**
 * @file 登记办证人员资料
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
  .el-date-editor--daterange.el-input__inner {
    width: 280px;
  }
  .register-apply-ruleForm {
    position: relative;
    left: 30%;
  }
  .register-apply-user-ruleForm {
    position: relative;
    left: 0;
  }
  .register-card-btn-bar {
    width: 100%;
    text-align: center;
  }
  .upload-info-container >>> .el-form-item__content {
    width: 280px;
  }
</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="登记办证人员资料" name="first">
        <div style="padding: 20px 0;" v-loading="addLoading">
          <el-form
            :label-position="labelPosition"
            :model="ruleForm"
            ref="ruleForm"
            label-width="150px"
            class="register-apply-ruleForm">
            <el-form-item label="期数：" prop="exhibitionPeriod" :rules="[{ required: true, message: '请选择期数', trigger: 'change' }]">
              <el-select v-model="ruleForm.exhibitionPeriod" placeholder="请选择" clearable>
                <el-option v-for="item in exhibitionPeriods" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件大类：" prop="badgeTypeParentCode" :rules="[{ required: true, message: '请选择证件大类', trigger: 'change' }]">
              <el-select v-model="ruleForm.badgeTypeParentCode" @change="changeBadgeTypeParent" placeholder="请选择" clearable>
                <el-option v-for="item in badgeTypes" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件子类：" prop="badgeTypeCode" :rules="[{ required: true, message: '请选择证件子类', trigger: 'change' }]">
              <el-select v-model="ruleForm.badgeTypeCode" placeholder="请选择" clearable>
                <el-option v-for="item in badgeTypeCodes" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="领证地点：" prop="takeBadgeAddr" :rules="[{ required: true, message: '请选择领证地点', trigger: 'change' }]">
              <el-select v-model="ruleForm.takeBadgeAddr" placeholder="请选择" clearable>
                <el-option v-for="item in takeBadgeAddrs" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="换证号码：" prop="referBadgeNo" >
              <!-- :rules="[{ validator: this.referValidater, trigger: 'blur' }]" -->
              <el-input v-model="ruleForm.referBadgeNo" placeholder="换证号码" maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label="进馆日期：" prop="date" :rules="[{ required: true, message: '请选择进馆日期', trigger: 'blur' }]">
              <el-date-picker v-model="ruleForm.date" type="daterange" range-separator="-" start-placeholder="进馆日期" end-placeholder="出馆日期" value-format='yyyy-MM-dd'>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="企业名称：" prop="enterpriceName" :rules="[{ required: true, message: '企业名称不可为空' }]">
              <el-input v-model="ruleForm.enterpriceName" placeholder="企业名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="applyUserName" :rules="[{ required: true, message: '请选择姓名', trigger: 'change' }]">
              <el-select v-model="ruleForm.applyUserName" placeholder="请选择" clearable @change="selectApplyUserName">
                <el-option v-for="item in userResourceList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
              </el-select>
              <!-- <el-input v-model="ruleForm.applyUserName" placeholder="姓名" maxlength="64"></el-input> -->
            </el-form-item>
            <div v-if="userInfo.userId !== ''">
              <el-form
                :label-position="labelPosition"
                :model="userInfo"
                ref="userRuleForm"
                label-width="150px"
                class="register-apply-user-ruleForm">
                <el-form-item label="性别：" prop="sex" :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]">
                  <el-radio-group v-model="userInfo.sex">
                    <el-radio v-for="item in osSex" :key="item.key" :label="item.label" :value="item.value">{{ item.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="身份证件类型：" prop="idcardTypeCode" :rules="[{ required: true, message: '请选择身份证件类型', trigger: 'change' }]">
                  <el-select v-model="userInfo.idcardTypeCode" placeholder="请选择">
                    <el-option v-for="item in idcardTypeCodes" :key="item.id" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码：" prop="idcardNo" :rules="[{ required: true, message: '请输入证件号码', trigger: 'blur' }, { pattern: kindo.validate.pattern.idCard, message: '请输入合法的证件号码', trigger: 'blur' }]">
                  <el-input v-model="userInfo.idcardNo" placeholder="证件号码" maxlength="64"></el-input>
                </el-form-item>
                <el-form-item label="手机：" prop="applyUserMobile" :rules="[{ pattern: this.$store.state.common.CHECK_CONST_DATA.telephone, message: '请输入正确的手机号码', trigger: 'change' }]">
                  <el-input v-model="userInfo.applyUserMobile" placeholder="手机" maxlength="11"></el-input>
                </el-form-item>
                <!-- <el-form-item label="E-Mail：" prop="email" :rules="[{ type: 'email', message: '请输入正确的邮箱', trigger: 'change' }]">
                  <el-input v-model="ruleForm.email" placeholder="E-Mail"></el-input>
                </el-form-item> -->
                <el-form-item class="upload-info-container" label="头像照片：" prop="badgePhotoUrl" ref="badgePhotoUrl" :rules="[{ required: true, message: '请上传头像照片', trigger: 'change' }]">
                  <el-upload
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
                  <el-upload
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
                  <el-upload
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
                  <el-upload
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
                  <el-input type="textarea" placeholder="备注" :autosize="{ minRows: 10 }" v-model="userInfo.remark" maxlength="255"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-form>
          <div class="register-card-btn-bar">
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button type="info" @click="cancel()">取消</el-button>
          </div>
          <el-dialog title="图片预览" :visible.sync="dialogVisible">
            <img :src="imgSrcBig" width="100%">
          </el-dialog>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import moment from 'moment';
export default {
  data() {
    return {
      activeName: 'first',
      labelPosition: 'left',
      api: {
        uploadUrl: process.env.API_OS_URL + '/efOS/file/addFile', // 上传文件地址
        getChildDicItemList: kindo.config.api.comsUrl + "/api/sysDataDictItem/getChildDicItemList",
        //校验换证号码是否存在
        getBadgeInfoByBadgeNo: process.env.API_OS_URL + '/api/transactBmApplyInfo/getBadgeInfoByBadgeNo'
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
      // 姓名列表
      userNames: [],
      // 当前用户信息
      userInfo: {
        userId: "",
        sex: "",
        idcardTypeCode: "",
        idcardNo: "",
        applyUserMobile: "",
        badgePhotoUrl: "",
        idcardFrontPhotoUrl: "",
        idcardBackPhotoUrl: "",
        busiCardFileId: "",
        remark: ""
      },
      timeArrange: [],
      // 期数字典
      exhibitionPeriods: [],
      // 证件大类字典
      badgeTypes: [],
      // 获取选择证件大类后所在对象
      badgeTypeObj: {},
      // 证件子类字典
      badgeTypeCodes: [],
      // 身份证件类型
      idcardTypeCodes: [],
      // 领证地点字典
      takeBadgeAddrs: [],
      // 性别字典
      osSex: [],
      ruleForm: {
        handleMode: 'NEW',
        exhibitionPeriod: "",
        badgeTypeParentCode: "",
        badgeTypeParentName: "",
        badgeTypeCode: "",
        badgeTypeName: "",
        takeBadgeAddr: "",
        referBadgeNo: "",
        date: "",
        enterpriceCode: "",
        enterpriceName: "",
        applyUserName: ""
      }
    };
  },
  mounted() {
    this.editAddLoading(false);
    this.getDictionaryData();
    this.getBasicInfo(this.companyId).then(res => {
      this.ruleForm.enterpriceName = res.companyName;
      this.ruleForm.enterpriceCode = res.companyId;
    }).then(response => {
      // 获取人员信息
      this.getPeopleInfo();
      if (this.$route.query.pattern === 'edit' && this.$route.query.data) {
        this.$set(this.ruleForm, 'date', [this.$route.query.data.effectStartDate, this.$route.query.data.effectEndDate]);
        for (let key in this.ruleForm) {
          for (let editKey in this.$route.query.data) {
            if (key === editKey) {
              this.$set(this.ruleForm, key, this.$route.query.data[editKey]);
            }
          }
        }
        // 编辑模式下根据前一个页面传过来的姓名查询录入的用户信息
        if (this.ruleForm.applyUserName !== '') {
          this.userResourceList.forEach((value, index) => {
            if (this.ruleForm.applyUserName === value.userName) {
              this.selectApplyUserName(value.userId);
            }
          });
        }
        // this.dealWithFileList();
        // this.badgePhotoUrlFileList = this.ruleForm.badgePhotoUrl !== '' ? [url: ];
        // this.idcardFrontPhotoUrlFileList = [];
        // this.idcardBackPhotoUrlFileList = [];
        // this.busiCardFileIdFileList = [];
        // 编辑模式下获取相应的子类数据
        if (this.ruleForm.badgeTypeParentCode && this.ruleForm.badgeTypeParentCode !== '') {
          this.badgeTypeObj = this.badgeTypes.find(item => item.value === this.ruleForm.badgeTypeParentCode);
          if (this.badgeTypeObj && this.badgeTypeObj !== {}) {
            this.$http.get(this.api.getChildDicItemList, { dataDictItemId: this.badgeTypeObj.id })
              .then(res => {
                if (res.records && res.records.length > 0) {
                  res.records.forEach(item => {
                    this.badgeTypeCodes.push({ id: item.dataDictItemId, label: item.itemText, value: item.itemCode });
                  });
                }
              });
          }
        }
      }
    });
  },
  computed: {
    ...mapGetters('corpDataManagement', ['getbasic']),
    ...mapGetters('enterApplyExhibitCertiInfo', ['addLoading', 'userResourceList'])
  },
  methods: {
    ...mapActions('file', ['delFileInfo']),
    ...mapActions('corpDataManagement', ['getBasicInfo']),
    ...mapActions('enterApplyExhibitCertiInfo', ['addExhibitCardInfo', 'editAddLoading', 'editExhibitCardInfo', 'getUserResourceInfo']),
    // 获取字典信息
    async getDictionaryData() {
      let [exhibitionPeriod, badgeTypes, takeBadgeAddrs, idcardTypeCodes, osSex] = await Promise.all([
        // 获取期数字典
        kindo.dictionary.get('exhibitionPeriodNum'),
        // 获取证件大类字典
        kindo.dictionary.get('bigBadgeType'),
        // 获取领证地点字典
        kindo.dictionary.get('takeBadgeAddr'),
        // 身份证件类型
        kindo.dictionary.get('identityType'),
        // 获取性别字典
        kindo.dictionary.get('gender')
      ]);
      // 获取期数字典
      this.exhibitionPeriods = exhibitionPeriod;
      // 获取证件大类字典
      this.badgeTypes = badgeTypes;
      // 获取领证地点字典
      this.takeBadgeAddrs = takeBadgeAddrs;
      // 获取身份证件类型字典
      this.idcardTypeCodes = idcardTypeCodes;
      // 获取性别字典
      this.osSex = osSex;
    },
    // 获取人员信息
    async getPeopleInfo() {
      let params = {
        "isPage": true,
        "pageIndex": 1,
        "pageSize": 1000000,
        "orderModelField": [{
          "orderByField": "createDate",
          "asc": false
        }],
        "customQueryParams": [
          {
            "name": "enterpriceCode",
            "joinType": "And",
            "findType": "EQ",
            "dataType": "Default",
            "values": []
          }
        ]
      };
      params.customQueryParams[0].values.push(this.companyId);
      await this.getUserResourceInfo(params);
    },
    // 校验换证号码
    referValidater(rule, value, callback) {
      if (value) {
        const req = {
          json: {
            customQueryParams: {
              badgeNo: value
            }
          }
        };
        this.$http.get(this.api.getBadgeInfoByBadgeNo, req)
          .then(res => {
            if (res && res.length === 0) {
              return callback(new Error('该换证号码在系统不存在，请检查后重新输入'));
            } else {
              return callback();
            }
          });
      } else {
        return callback();
      }
    },
    // 选择姓名后显示该用户所对应的用户信息
    selectApplyUserName(value) {
      if (this.userResourceList.length > 0) {
        this.userResourceList.forEach((userValue, userIndex) => {
          if (userValue.userId === value) {
            for (let userKey in this.userInfo) {
              for (let valueKey in userValue) {
                if (userKey === valueKey) {
                  this.userInfo[userKey] = userValue[valueKey];
                  this.userInfo.sex = userValue.sexTypeCode;
                  this.userInfo.applyUserMobile = userValue.cellPhone;
                }
              }
            }
          }
        });
        this.dealWithFileList();
      }
      // 处理性别
      if (this.userInfo.sex === '男' || this.userInfo.sex === '1') {
        this.userInfo.sex = '男';
      } else {
        this.userInfo.sex = '女';
      }
    },
    // 处理文件fileList数组
    dealWithFileList() {
      if (this.userInfo.badgePhotoUrl && this.userInfo.badgePhotoUrl !== '') {
        this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.userInfo.badgePhotoUrl).then(res => {
          this.badgePhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.userInfo.badgePhotoUrl, fileId: this.userInfo.badgePhotoUrl }];
        });
      }
      if (this.userInfo.idcardFrontPhotoUrl && this.userInfo.idcardFrontPhotoUrl !== '') {
        this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.userInfo.idcardFrontPhotoUrl).then(res => {
          this.idcardFrontPhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.userInfo.idcardFrontPhotoUrl, fileId: this.userInfo.idcardFrontPhotoUrl }];
        });
      }
      if (this.userInfo.idcardBackPhotoUrl && this.userInfo.idcardBackPhotoUrl !== '') {
        this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.userInfo.idcardBackPhotoUrl).then(res => {
          this.idcardBackPhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.userInfo.idcardBackPhotoUrl, fileId: this.userInfo.badgePhotoUrl }];
          this.idcardBackPhotoUrlFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.userInfo.idcardBackPhotoUrl, fileId: this.userInfo.badgePhotoUrl }];
        });
      }
      if (this.userInfo.busiCardFileId && this.userInfo.busiCardFileId !== '') {
        this.$http.get(process.env.API_OS_URL + '/efOS/file/queryFile?fileId=' + this.userInfo.busiCardFileId).then(res => {
          this.busiCardFileIdFileList = [{ name: res.fileName, url: process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + this.userInfo.busiCardFileId, fileId: this.userInfo.busiCardFileId }];
        });
      }
    },
    // 编辑模式下预览大图
    toBoost(url) {
      this.imgSrcBig = process.env.API_OS_URL + "/efOS/file/getImg?fileId=" + url;
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
      if (file.fileId) {
        this.delFile(file.fileId, prop);
      } else {
        this.delFile(file.response.data.fileId, prop);
      }
    },
    // 删除文件方法
    delFile(fileId, prop) {
      if (fileId && fileId !== '') {
        this.delFileInfo(fileId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          this.ruleForm[prop] = '';
        }).catch(e => {
        });
      }
    },
    // 删除文件前的回调
    beforeRemove(file, fileList) {
      return this.$confirm('确定移除？');
    },
    // 选择证件大类
    changeBadgeTypeParent(value) {
      this.ruleForm.badgeTypeCode = '';
      this.badgeTypeCodes = [];
      this.badgeTypeObj = this.badgeTypes.find(item => item.value === value);
      if (this.badgeTypeObj && this.badgeTypeObj !== {}) {
        this.$http.get(this.api.getChildDicItemList, { dataDictItemId: this.badgeTypeObj.id })
          .then(res => {
            if (res.records && res.records.length > 0) {
              res.records.forEach(item => {
                this.badgeTypeCodes.push({ id: item.dataDictItemId, label: item.itemText, value: item.itemCode });
              });
            }
          });
      }
    },
    // 提交表单
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.userInfo.userId !== '') {
            this.$refs['userRuleForm'].validate((userValid) => {
              if (userValid) {
                let params = JSON.parse(JSON.stringify(Object.assign(this.ruleForm, this.userInfo)));
                // 处理进管日期
                params.effectStartDate = moment(params.date[0]).valueOf();
                params.effectEndDate = moment(params.date[1]).valueOf();
                delete params.date;
                // 处理证件大类中文名称
                if (this.badgeTypes.length > 0) {
                  this.badgeTypes.forEach((value, index) => {
                    if (params.badgeTypeParentCode === value.value) {
                      params.badgeTypeParentName = value.label;
                    }
                  });
                }
                // 处理办证类型
                if (this.badgeTypeCodes.length > 0) {
                  this.badgeTypeCodes.forEach((value, index) => {
                    if (value.value === params.badgeTypeCode) {
                      params.badgeTypeName = value.label;
                    }
                  });
                }
                // 处理姓名问题
                if (params.userId !== '' && this.userResourceList.length > 0) {
                  this.userResourceList.forEach((value, index) => {
                    if (params.userId === value.userId) {
                      params.applyUserName = value.userName;
                    }
                  });
                }
                // 处理性别
                if (params.sex === '男' || params.sex === '1') {
                  params.sex = '1';
                } else {
                  params.sex = '2';
                }
                if (this.$route.query.pattern === 'edit') {
                  this.editExhibitCardInfo(params).then(res => {
                    this.$message({
                      type: 'success',
                      message: '修改成功'
                    });
                    this.$router.push({
                      path: '/enterpriseSubmitApplyCertificate'
                    });
                  });
                } else {
                  this.addExhibitCardInfo(params).then(res => {
                    this.$message({
                      type: 'success',
                      message: '申请成功'
                    });
                    this.$router.push({
                      path: '/enterpriseSubmitApplyCertificate'
                    });
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
                  message: '人员信息验证未通过',
                  type: 'error'
                });
              }
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
            message: '办证信息验证未通过',
            type: 'error'
          });
        }
      });
    },
    // 取消提交
    cancel() {
      this.$router.push({
        path: '/enterpriseSubmitApplyCertificate'
      });
    }
  }
};
</script>



